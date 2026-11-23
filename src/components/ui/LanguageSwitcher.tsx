import { locales, localeMeta, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  current: Locale;
  /** Názov navigácie pre čítačky obrazovky („Jazyk“, „Language“…). */
  label: string;
  /** light = na bielej hlavičke, dark = na tmavom pozadí, menu = väčšie tlačidlá v mobilnom menu. */
  tone: "light" | "dark" | "menu";
  className?: string;
};

/**
 * Prepínač jazykov – obyčajné odkazy na /, /en/, /uk/ (funguje aj bez JavaScriptu).
 * Viditeľná je skratka (SK, EN, UA), čítačky obrazovky počujú názov jazyka v danom jazyku.
 */
export function LanguageSwitcher({ current, label, tone, className }: LanguageSwitcherProps) {
  const menu = tone === "menu";

  return (
    <nav aria-label={label} className={className}>
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
              <a
                href={meta.path}
                hrefLang={locale}
                lang={locale}
                aria-current={active ? "true" : undefined}
                aria-label={meta.nativeName}
                title={meta.nativeName}
                className={cn(
                  "inline-flex items-center justify-center font-semibold tracking-wide transition-colors",
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
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
