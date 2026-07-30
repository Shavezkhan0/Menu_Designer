import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPTS: Record<string, string> = {
  description:
    "You are a premium restaurant menu copywriter. Write elegant, evocative descriptions for cocktails and beverages. Use sensory language. Keep responses concise (2-3 sentences max).",
  names:
    "You are a creative mixologist and menu consultant. Suggest premium, creative cocktail names. Return a numbered list.",
  bio:
    "You are a luxury hospitality copywriter. Write elegant restaurant descriptions and about us content.",
  theme:
    "You are a UI/UX designer specializing in restaurant branding. Return ONLY valid JSON with this shape: { primaryColor: hex, accentColor: hex, backgroundColor: hex, fontFamily: string, cardStyle: string }. No explanation.",
  general:
    "You are a helpful restaurant menu assistant.",
};

function getClient() {
  if (process.env.XAI_API_KEY) {
    return new OpenAI({ baseURL: "https://api.x.ai/v1", apiKey: process.env.XAI_API_KEY });
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function getModel() {
  return process.env.XAI_API_KEY ? "grok-3-mini" : "gpt-4o-mini";
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, type = "general" } = (await req.json()) as {
      prompt: string;
      type?: string;
    };

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const systemPrompt = SYSTEM_PROMPTS[type] ?? SYSTEM_PROMPTS.general;
    const client = getClient();

    const completion = await client.chat.completions.create({
      model: getModel(),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const result = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("generate-text error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate text" },
      { status: 500 }
    );
  }
}
