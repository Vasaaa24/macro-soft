import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteDocument } from "@/components/SiteDocument";
import { isLocale, prefixedLocales } from "@/i18n/config";
import { buildMetadata } from "@/lib/metadata";

export { viewport } from "@/lib/metadata";

/** Iba vopred známe jazyky – iné cesty (napr. /de/) skončia na 404. */
export const dynamicParams = false;

/** Ostatné jazyky s vlastnou podcestou: /en/, /uk/. */
export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return buildMetadata(lang);
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <SiteDocument locale={lang}>{children}</SiteDocument>;
}
