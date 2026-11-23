import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statický export – výsledok v priečinku out/, nahrateľný na akýkoľvek hosting.
  output: "export",
  // Optimalizácia obrázkov vyžaduje server, pri exporte ju vypíname.
  images: { unoptimized: true },
  trailingSlash: true,
  experimental: {
    // Web má dva koreňové layouty (slovenčina na /, ostatné jazyky na /[lang]/) – 404 rieši app/global-not-found.tsx.
    globalNotFound: true,
  },
  turbopack: {
    // Koreň projektu (v nadradenom priečinku je iný package-lock.json).
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
