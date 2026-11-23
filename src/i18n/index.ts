import type { Locale } from "./config";
import type { Dictionary } from "./types";
import { en } from "./dictionaries/en";
import { sk } from "./dictionaries/sk";
import { uk } from "./dictionaries/uk";

export * from "./config";
export type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { sk, en, uk };

/** Texty webu pre daný jazyk. Slovníky sú malé, preto ich nenačítavame dynamicky. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
