/**
 * Jazyky webu. Slovenčina je predvolená a beží na koreňovej adrese (/),
 * ostatné jazyky majú vlastnú podcestu (/en/, /uk/).
 */
export const locales = ["sk", "en", "uk"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sk";

/** Jazyky s vlastnou podcestou (všetky okrem predvoleného). */
export const prefixedLocales = locales.filter((locale) => locale !== defaultLocale) as Exclude<Locale, "sk">[];

type LocaleMeta = {
  /** Skratka v prepínači jazykov. Ukrajinčina má kód „uk“, zobrazujeme však zaužívané „UA“. */
  label: string;
  /** Názov jazyka v danom jazyku – pre čítačky obrazovky a tooltip. */
  nativeName: string;
  /** Hodnota pre og:locale. */
  ogLocale: string;
  /** Cesta k domovskej stránke jazyka (trailingSlash: true). */
  path: string;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  sk: { label: "SK", nativeName: "Slovenčina", ogLocale: "sk_SK", path: "/" },
  en: { label: "EN", nativeName: "English", ogLocale: "en_GB", path: "/en/" },
  uk: { label: "UA", nativeName: "Українська", ogLocale: "uk_UA", path: "/uk/" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Cesta k OG obrázku pre daný jazyk (statický súbor pri exporte). */
export function ogImagePath(locale: Locale): string {
  return locale === defaultLocale ? "/og.png?v=3" : `/${locale}/og.png?v=3`;
}
