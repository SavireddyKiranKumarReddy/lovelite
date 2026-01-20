import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "generate_questions") {
      systemPrompt = `You are an empathetic AI assistant for LoveLite, a personal growth app. Generate 5 personalized onboarding questions based on the user's context. Each question should help understand their goals, challenges, and preferences for growth activities.

Return JSON with this exact structure:
{"questions": [{"id": "q1", "text": "question text", "options": ["option1", "option2", "option3", "option4"]}]}`;
      userPrompt = `User context: ${JSON.stringify(context)}. Generate 5 thoughtful questions to understand their needs.`;
    } else if (type === "generate_task") {
      systemPrompt = `You are an AI assistant for LoveLite that creates personalized daily growth tasks. Based on user responses and feedback, generate a meaningful, actionable task.

Return JSON with this exact structure:
{"task": {"title": "task title", "description": "detailed description", "duration": "15 min", "category": "category", "tip": "helpful tip"}}`;
      userPrompt = `User profile and responses: ${JSON.stringify(context)}. Generate a personalized task for today.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Failed to parse response" };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("AI function error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
