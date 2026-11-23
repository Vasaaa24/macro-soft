import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n";

const size = { width: 1200, height: 630 };
const root = process.cwd();

/** SVG zo /public ako data URL (ostré pri akejkoľvek veľkosti). */
function svg(file: string): string {
  return `data:image/svg+xml;base64,${readFileSync(join(root, "public", file)).toString("base64")}`;
}

/**
 * Písma pre generovaný obrázok – rovnaké ako na webe (Space Grotesk + Inter), z @fontsource.
 * ImageResponse nepodporuje WOFF2, preto WOFF. Každá sada znakov (latin, latin-ext, azbuka) je samostatný
 * súbor a dostane vlastný názov rodiny – generátor súbory s rovnakým názvom a váhou zlučuje do jedného,
 * takže by inak videl iba latinku. Rodiny potom radíme za sebou ako záložné písma (stack).
 */
function font(pkg: string, file: string): Buffer {
  return readFileSync(join(root, "node_modules", "@fontsource", pkg, "files", file));
}

const groteskSubsets = ["latin", "latin-ext"] as const;
const interSubsets = ["latin", "latin-ext", "cyrillic", "cyrillic-ext"] as const;
type Weight = 400 | 500 | 700;

const family = (base: string, subset: string, weight: Weight) => `${base} ${subset} ${weight}`;

const fonts = [
  ...groteskSubsets.map((subset) => ({
    name: family("Space Grotesk", subset, 700),
    data: font("space-grotesk", `space-grotesk-${subset}-700-normal.woff`),
    weight: 700 as Weight,
  })),
  ...interSubsets.flatMap((subset) =>
    ([400, 500, 700] as const).map((weight) => ({
      name: family("Inter", subset, weight),
      data: font("inter", `inter-${subset}-${weight}-normal.woff`),
      weight: weight as Weight,
    })),
  ),
].map((f) => ({ ...f, style: "normal" as const }));

/** CSS font-family so všetkými sadami znakov danej rodiny a váhy. */
const stack = (base: "Space Grotesk" | "Inter", weight: Weight) =>
  (base === "Space Grotesk" ? groteskSubsets : interSubsets)
    .map((subset) => `"${family(base, subset, weight)}"`)
    .join(", ");

/** Náhľadový obrázok pri zdieľaní odkazu (Open Graph) v danom jazyku. */
export function renderOgImage(locale: Locale): ImageResponse {
  const { og } = getDictionary(locale);
  // Space Grotesk nemá azbuku – ukrajinský nadpis je v Interi (rovnako ako na webe).
  const titleFont = locale === "uk" ? stack("Inter", 700) : stack("Space Grotesk", 700);

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
          fontFamily: stack("Inter", 400),
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
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(47,128,237,0.36) 0%, rgba(47,128,237,0.12) 38%, rgba(47,128,237,0) 68%)",
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
            <div
              style={{ display: "flex", width: 72, height: 6, borderRadius: 3, background: "#2F80ED", marginBottom: 30 }}
            />
            <div
              style={{
                fontFamily: titleFont,
                fontWeight: 700,
                fontSize: locale === "uk" ? 60 : 66,
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
            <span style={{ fontFamily: stack("Inter", 500), fontWeight: 500, color: "#6AA6F5" }}>{siteConfig.domain}</span>
            <span style={{ margin: "0 16px", color: "rgba(255,255,255,0.3)" }}>·</span>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>{og.location}</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
