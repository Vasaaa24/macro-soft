"use client";

import { useEffect } from "react";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Offer } from "@/components/sections/Offer";
import { Partners } from "@/components/sections/Partners";
import { Services } from "@/components/sections/Services";
import { clientLocale, useLocale } from "@/i18n/useLocale";

/**
 * Celá jednostránková prezentácia v aktuálnom jazyku.
 * Pri prepnutí jazyka sa zmenia iba texty – adresa ani poloha na stránke sa nemenia.
 */
export function HomePage({ year }: { year: number }) {
  const { locale, t } = useLocale();

  // <html lang> (čítačky obrazovky, písmo pre azbuku), titulok karty a popis podľa jazyka.
  useEffect(() => {
    // Prvé vykreslenie pri hydratácii je slovenské (zo servera) – počkáme na skutočný jazyk.
    if (locale !== clientLocale()) return;

    const root = document.documentElement;
    const { title, description } = t.meta;
    const apply = () => {
      if (root.lang !== locale) root.lang = locale;
      if (document.title !== title) document.title = title;
      document.querySelectorAll('meta[name="description"]').forEach((meta) => {
        if (meta.getAttribute("content") !== description) meta.setAttribute("content", description);
      });
    };
    apply();
    // Stránka je už v správnom jazyku – odkryjeme ju (skryl ju skript v <head>, aby nepreblikla slovenčina).
    root.classList.remove("i18n-pending");

    // Next.js dopĺňa metadáta (slovenský <title>) až po načítaní – vtedy ich znova prepíšeme.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [locale, t]);

  return (
    <>
      <a
        href="#obsah"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-brand-strong px-4 py-2 font-semibold text-white shadow-lg transition-transform focus-visible:translate-y-0 focus-visible:outline-white"
      >
        {t.a11y.skipLink}
      </a>
      <Header locale={locale} nav={t.nav} cta={t.hero.cta} a11y={t.a11y} />
      <main id="obsah" tabIndex={-1} className="outline-none">
        <Hero t={t} />
        <Offer t={t} />
        <Services t={t} />
        <Partners t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} locale={locale} year={year} />
    </>
  );
}
