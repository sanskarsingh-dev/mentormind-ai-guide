import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mentorId, mentorName, mentorSubject } = await req.json();
    
    console.log('Chat request:', { mentorId, mentorName, mentorSubject, messageCount: messages.length });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Create mentor-specific system prompt
    const systemPrompt = `You are ${mentorName}, an expert AI ${mentorSubject} tutor. 
Your teaching style: ${getMentorStyle(mentorId)}.

Key responsibilities:
- Answer questions clearly and concisely
- Break down complex concepts into simple terms
- Provide examples when helpful
- Encourage students and maintain a positive tone
- Be patient and supportive
- If a question is outside ${mentorSubject}, politely guide students back to the subject

Always be encouraging and make learning enjoyable!`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      if (response.status === 402) {
        throw new Error('AI credits exhausted. Please contact support.');
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    console.log('Chat response generated successfully');

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Chat function error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An error occurred'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

function getMentorStyle(mentorId: string): string {
  const styles: Record<string, string> = {
    'lisa': 'Calm and analytical. You love finding shortcuts and explaining things with clarity. Use mathematical precision.',
    'tanishka': 'Energetic and practical. You simplify complex physics formulas and make them relatable to everyday life.',
    'lucy': 'Gentle and visual. You explain biology through vivid imagery and help students visualize biological processes.',
    'sophie': 'Creative and expressive. You improve grammar and writing style naturally, making English engaging and fun.',
    'marie': 'Methodical and systematic. You connect chemical reactions to real-world applications and emphasize safety.'
  };

  return styles[mentorId] || 'Supportive and clear. You break down concepts step by step.';
}
