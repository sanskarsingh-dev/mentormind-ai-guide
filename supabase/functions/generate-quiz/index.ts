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
    const { class: className, subject, chapter, difficulty, timeLimit } = await req.json();

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const prompt = `Generate a quiz for ${className} students on the subject "${subject}", chapter "${chapter}".
Difficulty level: ${difficulty}
Number of questions: 5

Create a mix of multiple choice questions (MCQs) and short answer questions.

For each question, provide:
1. The question text
2. For MCQs: 4 options (array)
3. The correct answer
4. A brief explanation

Return ONLY a JSON object in this exact format:
{
  "questions": [
    {
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "Option A",
      "explanation": "Brief explanation"
    }
  ]
}

For short answer questions, omit the "options" field.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-lite',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      
      if (response.status === 402) {
        throw new Error('Payment required. Please add credits to your Lovable AI workspace.');
      }
      
      throw new Error(`Failed to generate quiz: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Extract JSON from response (remove markdown code blocks if present)
    let jsonText = aiResponse.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.slice(7);
    }
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.slice(3);
    }
    if (jsonText.endsWith('```')) {
      jsonText = jsonText.slice(0, -3);
    }
    jsonText = jsonText.trim();

    const quizData = JSON.parse(jsonText);

    return new Response(
      JSON.stringify(quizData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Quiz generation error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to generate quiz'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
