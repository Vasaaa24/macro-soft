import type { Locale } from "./config";
import type { Dictionary } from "./types";
import { en } from "./dictionaries/en";
import { sk } from "./dictionaries/sk";
import { uk } from "./dictionaries/uk";

export * from "./config";
export type { Dictionary } from "./types";

/** Slovníky sú malé, preto sú všetky tri priamo v stránke – prepnutie jazyka je okamžité. */
const dictionaries: Record<Locale, Dictionary> = { sk, en, uk };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
