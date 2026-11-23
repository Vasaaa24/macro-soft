import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { getDictionary, localeMeta, locales, ogImagePath, type Locale } from "@/i18n";

/** Odkazy na všetky jazykové verzie (hreflang) + x-default = slovenčina. */
function languageAlternates(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of locales) map[locale] = localeMeta[locale].path;
  map["x-default"] = localeMeta.sk.path;
  return map;
}

/** Metadata stránky (title, description, Open Graph, hreflang…) pre daný jazyk. */
export function buildMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  const path = localeMeta[locale].path;
  const ogImage = ogImagePath(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
    applicationName: siteConfig.shortName,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical: path, languages: languageAlternates() },
    formatDetection: { telephone: false, email: false, address: false },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      url: path,
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
}

export const viewport: Viewport = {
  themeColor: "#141414",
  colorScheme: "light",
};
