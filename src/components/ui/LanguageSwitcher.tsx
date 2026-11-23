"use client";

import { locales, localeMeta, type Locale } from "@/i18n/config";
import { setLocale } from "@/i18n/useLocale";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  current: Locale;
  /** Názov skupiny pre čítačky obrazovky („Jazyk“, „Language“…). */
  label: string;
  /** light = na bielej hlavičke, dark = na tmavom pozadí, menu = väčšie tlačidlá v mobilnom menu. */
  tone: "light" | "dark" | "menu";
  className?: string;
};

/**
 * Prepínač jazykov – tlačidlá, ktoré preložia stránku na mieste (adresa sa nemení, poloha na stránke ostáva).
 * Viditeľná je skratka (SK, EN, UA), čítačky obrazovky počujú názov jazyka v danom jazyku.
 */
export function LanguageSwitcher({ current, label, tone, className }: LanguageSwitcherProps) {
  const menu = tone === "menu";

  return (
    <div role="group" aria-label={label} className={className}>
      <ul
        className={cn(
          "flex items-center",
          menu ? "gap-2" : "gap-0.5 rounded-full p-0.5",
          tone === "light" && "bg-surface ring-1 ring-line",
          tone === "dark" && "bg-white/5 ring-1 ring-white/10",
        )}
      >
        {locales.map((locale) => {
          const meta = localeMeta[locale];
          const active = locale === current;
          return (
            <li key={locale}>
              <button
                type="button"
                lang={locale}
                aria-pressed={active}
                aria-label={meta.nativeName}
                title={meta.nativeName}
                onClick={() => setLocale(locale)}
                className={cn(
                  "inline-flex cursor-pointer items-center justify-center font-semibold tracking-wide transition-colors",
                  menu
                    ? "h-11 min-w-14 rounded-full px-4 text-sm ring-1"
                    : "h-8 min-w-10 rounded-full px-2.5 text-xs",
                  // aktívny jazyk
                  active && (menu ? "bg-white text-ink ring-white" : "bg-brand-strong text-white"),
                  // neaktívne jazyky podľa pozadia
                  !active && tone === "light" && "text-graphite hover:bg-white hover:text-ink",
                  !active && tone === "dark" && "text-white/70 hover:bg-white/10 hover:text-white",
                  !active && menu && "text-white/80 ring-white/20 hover:bg-white/10 hover:text-white",
                )}
              >
                {meta.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
