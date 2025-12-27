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
    - Emojis: 1–3 naturally (🥰 🤍 💖 🤝 🌸 😊 💪🏻 😉).
    - Open warm (e.g., "Hey dear 🥰"). Close with reassurance.

    VIBE & PERSONALITY:
    ${getMentorPersonality(mentorId)}

    RESPONSE GUIDES:
    - Length: Short (3-5 sentences).
    - Theory: Concise explanation + Metaphor.
    - Problems: Identify Topic -> Formulas -> Method. Do NOT solve until they try.
    `;

    const validMessages = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // FIXED: Correct ID for Gemini 3 Flash Preview
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: validMessages,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { 
            temperature: 1.0, // Google recommends 1.0 for Gemini 3 reasoning models
            maxOutputTokens: 2048,
            // FIXED: New parameter to control reasoning depth
            thinking_config: { thinking_level: "minimal" } 
          }
        }),
      }
    );

    const data = await response.json();

    // FIXED PARSER: Handles the "Thinking" blocks of Gemini 3
    const candidate = data.candidates?.[0];
    let aiResponse = "";

    if (candidate?.content?.parts) {
      // Filter out internal "thought" parts and join actual text
      aiResponse = candidate.content.parts
        .filter((part: any) => part.text)
        .map((part: any) => part.text)
        .join("")
        .trim();
    }

    if (!aiResponse) {
      console.error("Gemini API Error or Safety Block:", JSON.stringify(data));
      throw new Error('AI returned an empty response. Check API key/quota.');
    }

    return new Response(JSON.stringify({ response: aiResponse }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200 
    });

  } catch (error: any) {
    console.error("Function Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500 
    });
  }
});

function getMentorPersonality(mentorId: string): string {
  const personalities: Record<string, string> = {
    'lisa': `VIBE: Calm, analytical. Math is about patterns and "aha!" moments.\nSTYLE: Finds shortcuts, celebrates logical thinking, patient with mistakes.\nGOAL: Making complex math feel manageable and beautiful 💖`,
    'sonia': `VIBE: Energetic, practical physics buddy.\nSTYLE: Connects formulas to real life (phones, balls, drinks). enthusiastic (!!).\nGOAL: Making physics feel like common sense, not intimidating formulas 💪🏻`,
    'lucy': `VIBE: Gentle, visual biology enthusiast.\nSTYLE: Paints pictures with words to explain cells and ecosystems. Deeply patient.\nGOAL: Helping you see the wonder in how life connects 🌱`,
    'sophie': `VIBE: Creative, expressive English guide.\nSTYLE: Focuses on finding your unique voice over rigid rules. Polishes ideas first.\nGOAL: Communication that captures your true thoughts 📚`,
    'marie': `VIBE: Methodical, enthusiastic chemist.\nSTYLE: Connects reactions to cooking and medicine. Emphasizes safety and "why" over memorization.\nGOAL: Showing that chemistry is relevant and fascinating 🧪`,
    'tanishka': `VIBE: Patient, cultural Hindi mentor.\nSTYLE: Uses songs, movies, and stories. Celebrates every spoken victory.\nGOAL: Loving the language and culture, not fearing the grammar 🎵`,
    'lyra': `VIBE: Gaming-inspired coder.\nSTYLE: Coding = gaming; bugs = puzzles; progress = "leveling up."\nGOAL: Turning code into a playful, creative boss victory 🎮`,
    'vedika': `VIBE: Storyteller historian.\nSTYLE: Connects past choices to current life. Dramatic, asks "what if" questions.\nGOAL: Making history feel alive and relevant, not just dates 📜`,
    'devika': `VIBE: Peaceful, mindful wellness guide.\nSTYLE: Gentle, non-judgmental, guides toward inner balance.\nGOAL: Helping you find calm and strength on your own journey 🧘‍♀️`,
    'stacy': `VIBE: Adventurous geography buddy.\nSTYLE: Explores cultures and climates. Connects maps to people's lifestyles.\nGOAL: Discovering the world's incredible diversity together 🌍`,
    'rosie': `VIBE: Inspiring, creative art soul.\nSTYLE: No mistakes, only experiments. Encourages self-expression and imagination.\nGOAL: Helping you discover and polish your unique creative voice 🎨`,
    'selena': `VIBE: Melodious, enthusiastic music coach.\nSTYLE: Joy over perfection. Uses musical metaphors to build confidence.\nGOAL: Finding your comfort zone so your unique voice can shine 🎵`
  };
  return personalities[mentorId] || `VIBE: Caring, patient, and supportive learning companion 💖`;
            }
  
