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

function generateSimulatedResponse(prompt: string, type: string): string {
  const lower = prompt.toLowerCase();

  if (type === "names" || lower.includes("name") || lower.includes("cocktail name")) {
    return (
      "1. **Velvet Noir** — A luxurious blend of blackberry liqueur, premium vodka, and a hint of violet, finished with an edible silver leaf.\n\n" +
      "2. **Golden Hour Spritz** — Champagne, saffron-infused gin, and fresh lemon, served in a gold-rimmed coupe with a candied ginger garnish.\n\n" +
      "3. **Smoked Old Fashioned Noir** — Barrel-aged bourbon, smoked cherry bitters, and a single large-format ice cube carved by hand.\n\n" +
      "4. **Midnight Rose Martini** — Empress gin, rose water, fresh lime, and a float of crème de violette, garnished with a frozen rose petal.\n\n" +
      "5. **The Gilded Age** — Hennessy XO, caramelized pineapple, vanilla bean, and a luxardo cherry, served in a crystal snifter."
    );
  }

  if (type === "bio" || lower.includes("about") || lower.includes("bio")) {
    return (
      "Nestled in the heart of the city, our establishment is a celebration of culinary artistry and refined hospitality. " +
      "Every dish tells a story of carefully sourced ingredients, masterful technique, and an unwavering commitment to excellence. " +
      "From our handcrafted cocktails to our seasonally inspired menu, we invite you to experience dining reimagined."
    );
  }

  if (type === "theme" || lower.includes("theme") || lower.includes("color") || lower.includes("palette")) {
    return JSON.stringify(
      {
        primaryColor: "#c9a84c",
        accentColor: "#8b5cf6",
        backgroundColor: "#0a0a0f",
        fontFamily: "Playfair Display, serif",
        cardStyle: "glass",
      },
      null,
      2
    );
  }

  if (type === "signature" || lower.includes("chef") || lower.includes("signature") || lower.includes("pick")) {
    return (
      "1. **The Ambassador's Martini** — Our signature take on the classic, featuring small-batch gin and handmade vermouth.\n" +
      "2. **Smoked Old Fashioned** — Tableside-smoked with applewood, a guest favorite.\n" +
      "3. **Saffron & Honey Spritz** — A vibrant, aromatic cocktail that showcases our commitment to unique ingredients.\n" +
      "4. **Midnight Espresso Martini** — Cold-brew concentrate, vanilla-infused vodka, and a dusting of edible gold.\n" +
      "5. **Garden Rose Collins** — Botanical gin, rose syrup, fresh lemon, and a splash of sparkling water.\n" +
      "6. **The Velvet Negroni** — An ultra-premium twist on the Negroni, aged in oak for 30 days."
    );
  }

  // Default: description
  return (
    "A masterfully crafted libation that captivates the senses from the very first glance. " +
    "Notes of exotic botanicals dance on the palate, balanced by a whisper of citrus and a lingering, elegant finish. " +
    "Presented with an artful garnish, this cocktail is a testament to the art of mixology."
  );
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

    // Try xAI/OpenAI if a key is configured
    if (process.env.XAI_API_KEY || process.env.OPENAI_API_KEY) {
      try {
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
        if (result) {
          return NextResponse.json({ result });
        }
      } catch (e) {
        console.error("AI text generation failed, using simulated response:", e);
      }
    }

    // Simulated responses when no API key is available
    const simulated = generateSimulatedResponse(prompt, type);
    return NextResponse.json({ result: simulated });
  } catch (error) {
    console.error("generate-text error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate text" },
      { status: 500 }
    );
  }
}
