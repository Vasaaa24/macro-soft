import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { getDictionary, type Locale } from "@/i18n";
import { inter, spaceGrotesk } from "@/lib/fonts";
import { organizationJsonLd } from "@/lib/jsonld";
import "@/app/globals.css";

/**
 * Spoločný HTML dokument pre všetky jazyky. Používajú ho oba koreňové layouty
 * (slovenčina na / a ostatné jazyky na /en/, /uk/), každý s vlastným <html lang>.
 */
export function SiteDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale);
  const jsonLd = JSON.stringify(organizationJsonLd(t, locale)).replace(/</g, "\\u003c");

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
      {/* Toto je koreňový dokument (používajú ho oba koreňové layouty), <head> je tu správne – pravidlo pozná iba app/layout. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Trieda .js umožní skryť prvky pred animáciou len vtedy, keď JS naozaj beží. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <noscript>
          <style>{".split-parent{visibility:visible!important}"}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#obsah"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-brand-strong px-4 py-2 font-semibold text-white shadow-lg transition-transform focus-visible:translate-y-0 focus-visible:outline-white"
        >
          {t.a11y.skipLink}
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
