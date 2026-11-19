import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

/** Biele logo z /public (ak je nahrané) ako data URL; inak sa zobrazí len text. */
function readLogo(): string | null {
  const file = join(process.cwd(), "public", "logo-white.png");
  if (!existsSync(file)) return null;
  return `data:image/png;base64,${readFileSync(file).toString("base64")}`;
}

// Pozn.: predvolené písmo ImageResponse má jediný rez (bez tučného), text je preto stručný.
/** Statický Open Graph obrázok – pri exporte vznikne súbor out/og.png. */
export function GET() {
  const logo = readLogo();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#141414",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(47,128,237,0.3), transparent 45%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 56px 56px, 56px 56px",
          color: "#ffffff",
        }}
      >
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" height={96} style={{ height: 96, width: "auto" }} />
        ) : (
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700 }}>
            <span>macro</span>
            <span style={{ color: "#2F80ED", marginLeft: 14 }}>SOFT</span>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 96, height: 6, background: "#2F80ED", marginBottom: 32 }} />
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>Elektrotechnológie z Európy</div>
          <div style={{ fontSize: 34, marginTop: 20, color: "rgba(255,255,255,0.7)" }}>
            Logistika · CMR · Colné služby
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#6AA6F5" }}>{siteConfig.domain}</div>
      </div>
    ),
    size,
  );
}
