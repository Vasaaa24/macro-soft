import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { getDictionary, localeMeta, locales } from "@/i18n";
import { inter, spaceGrotesk } from "@/lib/fonts";
import "./globals.css";

/*
 * Globálna stránka 404 – web má dva koreňové layouty (slovenčina na /, ostatné jazyky na /en/, /uk/),
 * preto 404 nevzniká z layoutu. Nevieme, z akej jazykovej verzie návštevník prišiel,
 * takže stránka je trojjazyčná.
 */

const sk = getDictionary("sk");

export const metadata: Metadata = {
  title: `404 – ${sk.notFound.title}`,
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="sk" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-dvh bg-ink text-white">
        <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col justify-center px-5 py-16 sm:px-6">
          <Link href="/" className="mb-14 inline-block self-start rounded-md">
            <Logo variant="light" alt={sk.a11y.logoAlt} className="h-10" />
          </Link>
          <p className="font-display text-7xl font-bold text-brand-light sm:text-8xl">404</p>

          <ul className="mt-10 grid gap-8">
            {locales.map((locale) => {
              const t = getDictionary(locale);
              const meta = localeMeta[locale];
              return (
                <li key={locale} lang={locale} className="border-t border-white/10 pt-6">
                  <h1 className="text-2xl font-bold sm:text-3xl">{t.notFound.title}</h1>
                  <p className="mt-2 text-white/70">{t.notFound.text}</p>
                  <Link
                    href={meta.path}
                    hrefLang={locale}
                    className="mt-4 inline-flex rounded-full bg-brand-strong px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
                  >
                    {t.notFound.back}
                  </Link>
                </li>
              );
            })}
          </ul>
        </main>
      </body>
    </html>
  );
}
