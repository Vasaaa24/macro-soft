import { Inter, Space_Grotesk } from "next/font/google";

/**
 * Text: Inter. Nadpisy: Space Grotesk – rovnaké písmo ako v logu.
 * Prednačítame latinku a latin-ext (slovenčina). Azbuku pre ukrajinčinu má iba Inter;
 * jej súbory si prehliadač stiahne len na ukrajinskej stránke (unicode-range).
 */
export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});
