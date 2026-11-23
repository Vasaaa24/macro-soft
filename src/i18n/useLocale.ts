"use client";

import { useSyncExternalStore } from "react";
import { defaultLocale, getDictionary, isLocale, LOCALE_STORAGE_KEY, type Locale } from "@/i18n";

/**
 * Aktuálny jazyk – malý globálny „store“ v prehliadači.
 * Server (statický export) vždy vykreslí slovenčinu; po hydratácii React prejde na jazyk,
 * ktorý zistil skript v <head> (uložený v <html lang>), alebo ktorý návštevník zvolí v prepínači.
 */
let current: Locale | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): Locale {
  if (current === null) {
    const lang = document.documentElement.lang;
    current = isLocale(lang) ? lang : defaultLocale;
  }
  return current;
}

const getServerSnapshot = (): Locale => defaultLocale;

/** Skutočný jazyk v prehliadači (počas hydratácie môže React ešte vykresľovať slovenčinu zo servera). */
export const clientLocale = getSnapshot;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setLocale(locale: Locale) {
  if (locale === current) return;
  current = locale;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Súkromné okno / zablokované úložisko – jazyk sa len nezapamätá.
  }
  listeners.forEach((listener) => listener());
}

export function useLocale() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { locale, t: getDictionary(locale) };
}
