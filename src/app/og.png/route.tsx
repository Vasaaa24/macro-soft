import { renderOgImage } from "@/lib/og";

export const dynamic = "force-static";

/** Open Graph obrázok pre slovenčinu – pri exporte vznikne súbor out/og.png. */
export function GET() {
  return renderOgImage("sk");
}
