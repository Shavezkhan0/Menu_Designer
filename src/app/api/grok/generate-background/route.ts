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
    if (process.env.XAI_API_KEY && process.env.XAI_API_KEY.startsWith("xai-")) {
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
          const rawImage =
            data?.data?.[0]?.url ??
            data?.data?.[0]?.b64_json ??
            data?.url;
          let imageUrl = rawImage;
          if (rawImage && !rawImage.startsWith("http") && !rawImage.startsWith("data:")) {
            imageUrl = `data:image/png;base64,${rawImage}`;
          }
          if (imageUrl) {
            return NextResponse.json({ imageUrl });
          }
        }
      } catch (e) {
        console.error("xAI image generation failed:", e);
      }
    }

    // Fallback: If no valid Grok API key or it failed, use Pollinations AI for free image generation
    const fallbackImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=1080&height=1920&nologo=true`;
    
    return NextResponse.json({ imageUrl: fallbackImageUrl });
  } catch (error) {
    console.error("generate-background error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate background" },
      { status: 500 }
    );
  }
}
