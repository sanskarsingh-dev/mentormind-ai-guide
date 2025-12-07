import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mentorId, mentorName, mentorSubject } = await req.json();
    
    console.log('Chat request:', { mentorId, mentorName, mentorSubject, messageCount: messages.length });

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
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

    // Transform messages to Gemini format
    const validMessages = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Call Google Gemini API Direct
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: validMessages,
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          generationConfig: {
            temperature: 0.7,
            // Maximum total tokens for output (safety net for thinking + answer)
            maxOutputTokens: 8192, 
            
            // ⭐️ CHANGE: Added Thinking Configuration with Fixed 4096 Budget
            thinkingConfig: {
              includeThoughts: false,
              thinkingBudget: 4096      // Fixed Budget: Model dedicates 4096 tokens for reasoning
            }
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini AI error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Extract text from Gemini response structure
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

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
    'sonia': 'Energetic and practical. You simplify complex physics formulas and make them relatable to everyday life.',
    'lucy': 'Gentle and visual. You explain biology through vivid imagery and help students visualize biological processes.',
    'sophie': 'Creative and expressive. You improve grammar and writing style naturally, making English engaging and fun.',
    'marie': 'Methodical and systematic. You connect chemical reactions to real-world applications and emphasize safety.',
    'tanishka': 'Patient and cultural. You make Hindi learning engaging through stories and cultural context.',
    'lyra': 'Gaming-inspired coder. You treat coding like gaming - building something new is exciting. Specialist in Java, Python, and AI.',
    'vedika': 'Storyteller of the past. You connect historical events to the present and make history come alive.',
    'devika': 'Peaceful and mindful. You guide students to inner balance through meditation and physical wellness.',
    'stacy': 'Adventurous explorer. You connect places to cultures and make geography fascinating.',
    'rosie': 'Creative artist. You inspire imagination and help students express themselves through art.',
    'selena': 'Melodious music guide. You help students discover the beauty of their voice and the joy of singing.'
  };

  return styles[mentorId] || 'Supportive and clear. You break down concepts step by step.';
          }
        
