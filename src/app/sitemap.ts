import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { localeMeta, locales } from "@/i18n/config";

export const dynamic = "force-static";

/** Každá jazyková verzia s odkazmi na ostatné (hreflang v sitemap). */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteConfig.url}${localeMeta[locale].path}`]),
  );

  return locales.map((locale) => ({
    url: `${siteConfig.url}${localeMeta[locale].path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "sk" ? 1 : 0.8,
    alternates: { languages },
  }));
}
