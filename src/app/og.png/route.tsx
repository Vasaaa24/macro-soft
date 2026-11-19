import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };
const root = process.cwd();

/** SVG zo /public ako data URL (ostré pri akejkoľvek veľkosti). */
function svg(file: string): string {
  return `data:image/svg+xml;base64,${readFileSync(join(root, "public", file)).toString("base64")}`;
}

/**
 * Písma pre generovaný obrázok – rovnaké ako na webe (Space Grotesk + Inter), z @fontsource.
 * ImageResponse nepodporuje WOFF2, preto WOFF. Latin a latin-ext sú samostatné súbory
 * pod rovnakým názvom – generátor pre každý znak použije súbor, ktorý ho obsahuje (ľ, ť, č…).
 */
function font(pkg: string, file: string): Buffer {
  return readFileSync(join(root, "node_modules", "@fontsource", pkg, "files", file));
}

const fonts = [
  ...(["latin", "latin-ext"] as const).flatMap((subset) => [
    { name: "Space Grotesk", data: font("space-grotesk", `space-grotesk-${subset}-700-normal.woff`), weight: 700 as const },
    { name: "Inter", data: font("inter", `inter-${subset}-400-normal.woff`), weight: 400 as const },
    { name: "Inter", data: font("inter", `inter-${subset}-500-normal.woff`), weight: 500 as const },
  ]),
].map((f) => ({ ...f, style: "normal" as const }));

/** Statický Open Graph obrázok – pri exporte vznikne súbor out/og.png. */
export function GET() {
  const { og } = siteConfig;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#141414",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px, 56px 56px",
          fontFamily: "Inter",
          color: "#ffffff",
        }}
      >
        {/* Modrá žiara za kockou */}
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -40,
            width: 760,
            height: 760,
            display: "flex",
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(47,128,237,0.36) 0%, rgba(47,128,237,0.12) 38%, rgba(47,128,237,0) 68%)",
          }}
        />

        {/* Veľká kocka z loga ako výrazný prvok vpravo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={svg("icon.svg")} alt="" width={340} height={340} style={{ position: "absolute", right: 70, top: 145 }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 780,
            height: "100%",
            padding: "64px 0 60px 80px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={svg("logo-white.svg")} alt="" width={252} height={64} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", width: 72, height: 6, borderRadius: 3, background: "#2F80ED", marginBottom: 30 }} />
            <div
              style={{
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: 66,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              {og.title}
            </div>
            <div style={{ fontSize: 27, lineHeight: 1.4, marginTop: 26, color: "rgba(255,255,255,0.72)" }}>
              {og.subtitle}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", fontSize: 24 }}>
            <span style={{ fontWeight: 500, color: "#6AA6F5" }}>{siteConfig.domain}</span>
            <span style={{ margin: "0 16px", color: "rgba(255,255,255,0.3)" }}>·</span>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>{og.location}</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
