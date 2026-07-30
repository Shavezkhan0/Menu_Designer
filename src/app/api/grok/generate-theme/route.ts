import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const VALID_CARD_STYLES = ["glass", "solid", "minimal", "bordered"];

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
    const { style } = (await req.json()) as { style: string };

    const client = getClient();

    const completion = await client.chat.completions.create({
      model: getModel(),
      messages: [
        {
          role: "system",
          content:
            "You are a UI/UX designer specializing in restaurant branding. Return ONLY valid JSON with this exact shape: { primaryColor: hex, accentColor: hex, backgroundColor: hex, fontFamily: string, cardStyle: string }. No explanation, no markdown formatting.",
        },
        {
          role: "user",
          content: style?.trim()
            ? `Generate a theme for a restaurant with this style: ${style}`
            : "Generate a random premium restaurant theme",
        },
      ],
      temperature: 0.8,
      max_tokens: 200,
    });

    const raw = completion.choices[0]?.message?.content ?? "";

    // Parse JSON from response (handle markdown code fences)
    let cleaned = raw.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/```(?:json)?/g, "").trim();
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse theme JSON:", raw);
      return NextResponse.json(
        { error: "Invalid theme response from AI" },
        { status: 500 }
      );
    }

    // Validate and normalize fields
    const hex = (v: unknown, fallback: string): string =>
      typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v) ? v : fallback;

    const theme = {
      primaryColor: hex(parsed.primaryColor, "#a78bfa"),
      accentColor: hex(parsed.accentColor, "#f472b6"),
      backgroundColor: hex(parsed.backgroundColor, "#111118"),
      fontFamily:
        typeof parsed.fontFamily === "string" && parsed.fontFamily.length > 0
          ? parsed.fontFamily
          : "Playfair Display, serif",
      cardStyle: VALID_CARD_STYLES.includes(parsed.cardStyle as string)
        ? (parsed.cardStyle as string)
        : "glass",
    };

    return NextResponse.json(theme);
  } catch (error) {
    console.error("generate-theme error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate theme" },
      { status: 500 }
    );
  }
}
