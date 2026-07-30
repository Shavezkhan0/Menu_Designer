import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Menu Designer",
  description: "AI-Powered Restaurant Menu Designer",
};

export default function MenuDesignerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.variable} ${playfair.variable} h-screen w-screen overflow-hidden`}
      style={{
        backgroundColor: "#0a0a0f",
        fontFamily: "var(--font-inter)",
      }}
    >
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        * {
          -webkit-tap-highlight-color: transparent;
        }

        *:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 2px;
        }

        /* Custom scrollbar for sidebar */
        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 2px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #52525b;
        }

        /* range input styling */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 2px;
          outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #a78bfa;
          cursor: pointer;
          border: 2px solid #0a0a0f;
          box-shadow: 0 0 0 1px rgba(167,139,250,0.3);
        }

        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #a78bfa;
          cursor: pointer;
          border: 2px solid #0a0a0f;
        }
      `}</style>
      {children}
    </div>
  );
}
