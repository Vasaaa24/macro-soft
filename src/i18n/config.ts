/**
 * Jazyky webu. Celý web je jedna stránka – jazyk sa prepína priamo v prehliadači (bez inej adresy).
 * Predvolená je slovenčina: v nej je vygenerované HTML a v nej web vidia vyhľadávače.
 */
export const locales = ["sk", "en", "uk"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sk";

/** Kľúč v localStorage, pod ktorým si prehliadač pamätá zvolený jazyk. */
export const LOCALE_STORAGE_KEY = "lang";

type LocaleMeta = {
  /** Skratka v prepínači jazykov. Ukrajinčina má kód „uk“, zobrazujeme však zaužívané „UA“. */
  label: string;
  /** Názov jazyka v danom jazyku – pre čítačky obrazovky a tooltip. */
  nativeName: string;
  /** Hodnota pre og:locale. */
  ogLocale: string;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  sk: { label: "SK", nativeName: "Slovenčina", ogLocale: "sk_SK" },
  en: { label: "EN", nativeName: "English", ogLocale: "en_GB" },
  uk: { label: "UA", nativeName: "Українська", ogLocale: "uk_UA" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/**
 * Skript do <head>, ktorý ešte pred vykreslením zistí jazyk návštevníka:
 * 1. jazyk zvolený skôr (localStorage), 2. jazyk prehliadača (sk/cs → SK, en → EN, uk → UA).
 * Pri inom jazyku ako slovenčina stránku na okamih skryje, aby nepreblikla slovenská verzia
 * (odkryje ju LocaleEffects po prepnutí, poistka po 2,5 s). Roboty vyhľadávačov ostávajú na slovenčine.
 */
export const localeBootScript = `(function(){var d=document.documentElement;d.classList.add('js');var l=null;try{l=localStorage.getItem('${LOCALE_STORAGE_KEY}')}catch(e){}if(${JSON.stringify(locales)}.indexOf(l)<0){l='${defaultLocale}';if(!/bot|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent)){var n=navigator.languages||[navigator.language||''];for(var i=0;i<n.length;i++){var c=String(n[i]).slice(0,2).toLowerCase();if(c==='sk'||c==='cs'){l='sk';break}if(c==='en'){l='en';break}if(c==='uk'){l='uk';break}}}}d.lang=l;if(l!=='${defaultLocale}'){d.classList.add('i18n-pending');setTimeout(function(){d.classList.remove('i18n-pending')},2500)}})()`;
