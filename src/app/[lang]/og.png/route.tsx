import { notFound } from "next/navigation";
import { isLocale, prefixedLocales } from "@/i18n/config";
import { renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

/** Open Graph obrázok pre /en/ a /uk/ – pri exporte vzniknú out/en/og.png a out/uk/og.png. */
export async function GET(_request: Request, ctx: RouteContext<"/[lang]/og.png">) {
  const { lang } = await ctx.params;
  if (!isLocale(lang)) notFound();
  return renderOgImage(lang);
}
