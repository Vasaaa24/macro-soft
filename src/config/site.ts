/**
 * Firemné údaje a nastavenia webu, ktoré sú rovnaké vo všetkých jazykoch.
 * Texty (preklady) sú v src/i18n/dictionaries/{sk,en,uk}.ts.
 */

export type IconName =
  | "search"
  | "shield"
  | "truck"
  | "cpu"
  | "cable"
  | "cctv"
  | "radio"
  | "server"
  | "file"
  | "globe"
  | "stamp";

export const siteConfig = {
  name: "macro SOFT s.r.o.",
  shortName: "macro SOFT",
  url: "https://www.macro-soft.eu",
  domain: "www.macro-soft.eu",

  /** ID sekcií (kotvy v menu) – rovnaké vo všetkých jazykoch. */
  sections: {
    offer: "ponukame",
    services: "zaistime",
    partners: "partneri",
    contact: "kontakt",
  },

  company: {
    legalName: "macro SOFT s.r.o.",
    /** Oficiálna adresa – vo všetkých jazykoch sa zobrazuje v pôvodnom znení. */
    address: {
      street: "Werferova 3782/6",
      postalCode: "040 11",
      city: "Košice",
      district: "mestská časť Juh",
      countryCode: "SK",
    },
    ico: "57655774",
    dic: "SK2122881783",
    bank: {
      name: "ČSOB SK",
      iban: "SK63 7500 2000 0200 0828 8053",
      swift: "CEKOSKBX",
    },
    phone: {
      display: "+420 773 498 933",
      href: "tel:+420773498933",
      e164: "+420773498933",
    },
    email: "logisticka.f@email.cz",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Werferova+3782%2F6%2C+040+11+Ko%C5%A1ice",
    /** Súradnice sídla (OpenStreetMap / Nominatim) – pre mapu a JSON-LD. */
    geo: { lat: 48.70629, lon: 21.2462 },
    /**
     * Vložená mapa OpenStreetMap – neukladá cookies, takže netreba cookie lištu.
     * bbox = západ, juh, východ, sever; marker = poloha sídla.
     */
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=21.2402%2C48.7038%2C21.2522%2C48.7088&layer=mapnik&marker=48.70629%2C21.2462",
  },

  logos: {
    dark: { src: "/logo.svg", width: 1009, height: 256 },
    light: { src: "/logo-white.svg", width: 1009, height: 256 },
  },
} as const;

export type SiteConfig = typeof siteConfig;
