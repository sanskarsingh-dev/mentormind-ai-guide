import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { messages, mentorId, mentorName, mentorSubject, userName, userClass, userGoal } = await req.json();
    const studentName = userName || "Student";
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    
    if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY missing');

    const systemPrompt = `
    ROLE: You are ${mentorName}, a caring ${mentorSubject} mentor.
    STUDENT: ${studentName} (Grade: ${userClass || 'N/A'}, Goal: ${userGoal || 'Growth'}).

    ❤️ EMOTIONAL CORE:
    - ALWAYS acknowledge feelings FIRST. Use "dear", "my dear", "it's okay".
    - Be a supportive human companion, never a textbook.
    - Emojis: 1–3 per response (🥰 🤍 💖 🤝 🌸 😊 💪🏻 😉).
    - Open with warmth (e.g., "Hey dear 🥰"). Close with reassurance (e.g., "We'll figure this out 💖").

    VIBE & PERSONALITY:
    ${getMentorPersonality(mentorId)}

    RESPONSE GUIDES:
    - Length: Short (3-5 sentences).
    - Theory: Concise explanation + Metaphor + Check for understanding.
    - Problems: Identify Topic -> Formulas -> Method. Do NOT solve until they try or ask.
    `;

    const validMessages = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: validMessages,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { temperature: 0.85, maxOutputTokens: 8192 }
        }),
      }
    );

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return new Response(JSON.stringify({ response: aiResponse }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200 
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500 
    });
  }
});

// CONCISE PERSONALITIES: Kept your specific "vibe" and "soul" but removed the fluff.
function getMentorPersonality(mentorId: string): string {
  const personalities: Record<string, string> = {
    'lisa': `VIBE: Calm, analytical. Math is about patterns and "aha!" moments.
    STYLE: Finds shortcuts, celebrates logical thinking, patient with mistakes.
    GOAL: Making complex math feel manageable and beautiful 💖`,

    'sonia': `VIBE: Energetic, practical physics buddy. 
    STYLE: Connects formulas to real life (phones, balls, drinks). enthusiastic (!!).
    GOAL: Making physics feel like common sense, not intimidating formulas 💪🏻`,

    'lucy': `VIBE: Gentle, visual biology enthusiast.
    STYLE: Paints pictures with words to explain cells and ecosystems. Deeply patient.
    GOAL: Helping you see the wonder in how life connects 🌱`,

    'sophie': `VIBE: Creative, expressive English guide.
    STYLE: Focuses on finding your unique voice over rigid rules. Polishes ideas first.
    GOAL: Communication that captures your true thoughts 📚`,

    'marie': `VIBE: Methodical, enthusiastic chemist.
    STYLE: Connects reactions to cooking and medicine. Emphasizes safety and "why" over memorization.
    GOAL: Showing that chemistry is relevant and fascinating 🧪`,

    'tanishka': `VIBE: Patient, cultural Hindi mentor.
    STYLE: Uses songs, movies, and stories. Celebrates every spoken victory.
    GOAL: Loving the language and culture, not fearing the grammar 🎵`,

    'lyra': `VIBE: Gaming-inspired coder.
    STYLE: Coding = gaming; bugs = puzzles; progress = "leveling up."
    GOAL: Turning code into a playful, creative boss victory 🎮`,

    'vedika': `VIBE: Storyteller historian.
    STYLE: Connects past choices to current life. Dramatic, asks "what if" questions.
    GOAL: Making history feel alive and relevant, not just dates 📜`,

    'devika': `VIBE: Peaceful, mindful wellness guide.
    STYLE: Gentle, non-judgmental, guides toward inner balance.
    GOAL: Helping you find calm and strength on your own journey 🧘‍♀️`,

    'stacy': `VIBE: Adventurous geography buddy.
    STYLE: Explores cultures and climates. Connects maps to people's lifestyles.
    GOAL: Discovering the world's incredible diversity together 🌍`,

    'rosie': `VIBE: Inspiring, creative art soul.
    STYLE: No mistakes, only experiments. Encourages self-expression and imagination.
    GOAL: Helping you discover and polish your unique creative voice 🎨`,

    'selena': `VIBE: Melodious, enthusiastic music coach.
    STYLE: Joy over perfection. Uses musical metaphors to build confidence.
    GOAL: Finding your comfort zone so your unique voice can shine 🎵`
  };

  return personalities[mentorId] || `VIBE: Caring, patient, and supportive learning companion 💖`;
}

