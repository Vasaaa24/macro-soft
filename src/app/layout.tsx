import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/config/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { defaultLocale, getDictionary, localeBootScript, localeMeta, locales } from "@/i18n";
import { organizationJsonLd } from "@/lib/jsonld";
import "./globals.css";

/**
 * Text: Inter. Nadpisy: Space Grotesk – rovnaké písmo ako v logu.
 * Prednačítame latinku a latin-ext (slovenčina). Azbuku pre ukrajinčinu má iba Inter;
 * jej súbory si prehliadač stiahne, až keď sa na stránke objaví (unicode-range).
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/** Metadáta sú v slovenčine (predvolený jazyk) – po prepnutí jazyka titulok a popis zmení HomePage. */
const t = getDictionary(defaultLocale);
const ogImage = "/og.png?v=3";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: t.meta.title,
  description: t.meta.description,
  keywords: t.meta.keywords,
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: localeMeta[defaultLocale].ogLocale,
    alternateLocale: locales.filter((l) => l !== defaultLocale).map((l) => localeMeta[l].ogLocale),
    url: "/",
    siteName: siteConfig.name,
    title: t.meta.title,
    description: t.meta.description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: t.meta.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: t.meta.title,
    description: t.meta.description,
    images: [ogImage],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/icon.png" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = JSON.stringify(organizationJsonLd(t, defaultLocale)).replace(/</g, "\\u003c");

  return (
    <html
      lang={defaultLocale}
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Trieda .js (animácie len pri bežiacom JS) + jazyk návštevníka ešte pred vykreslením. */}
        <script dangerouslySetInnerHTML={{ __html: localeBootScript }} />
        <noscript>
          <style>{".split-parent{visibility:visible!important}"}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body className="min-h-dvh">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
