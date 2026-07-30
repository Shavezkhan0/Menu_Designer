import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = (await req.json()) as { prompt: string };

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const enhancedPrompt = `Premium restaurant background: ${prompt}. Dark, moody, atmospheric. High quality.`;

    // Try xAI image generation
    if (process.env.XAI_API_KEY) {
      try {
        const res = await fetch("https://api.x.ai/v1/images/generations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.XAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "grok-2-image",
            prompt: enhancedPrompt,
            n: 1,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const imageUrl =
            data?.data?.[0]?.url ??
            data?.data?.[0]?.b64_json ??
            data?.url;
          if (imageUrl) {
            return NextResponse.json({ imageUrl });
          }
        }
      } catch {
        console.error("xAI image generation failed, falling back to text");
      }
    }

    // Fallback: generate a CSS gradient via text model
    const client = process.env.XAI_API_KEY
      ? new OpenAI({ baseURL: "https://api.x.ai/v1", apiKey: process.env.XAI_API_KEY })
      : new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const model = process.env.XAI_API_KEY ? "grok-3-mini" : "gpt-4o-mini";

    const completion = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a CSS gradient designer for restaurant menus. Based on the user's description, return ONLY a valid CSS gradient value (e.g. 'linear-gradient(135deg, #hex, #hex)'). No explanation, no markdown, just the gradient string.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 100,
    });

    const gradient = completion.choices[0]?.message?.content?.trim() ?? "";

    if (!gradient) {
      return NextResponse.json(
        { error: "Could not generate background" },
        { status: 500 }
      );
    }

    return NextResponse.json({ gradient, imageUrl: null });
  } catch (error) {
    console.error("generate-background error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate background" },
      { status: 500 }
    );
  }
}
