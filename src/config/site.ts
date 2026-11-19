/**
 * Centrálne miesto pre všetky texty a firemné údaje webu.
 * Pri zmene údajov upravujte iba tento súbor.
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

export type Feature = {
  title: string;
  description: string;
  icon: IconName;
};

export type ServiceItem = Feature & {
  /** Krátka skratka zvýraznená na karte (napr. CMR, EÚ, CLO). */
  tag: string;
};

export const siteConfig = {
  name: "macro SOFT s.r.o.",
  shortName: "macro SOFT",
  url: "https://www.macro-soft.eu",
  domain: "www.macro-soft.eu",
  locale: "sk_SK",
  title: "macro SOFT s.r.o. – medzinárodný dodávateľ elektrotechnológií",
  description:
    "macro SOFT s.r.o. z Košíc vyhľadá najvhodnejší elektrotechnický tovar na európskom trhu, zaistí bezpečnú obchodnú komunikáciu, preclenie a dopravu až k vám.",
  keywords: [
    "elektrotechnológie",
    "dodávateľ elektroniky",
    "čipy a mikrokontroléry",
    "optické káble",
    "telekomunikačná technika",
    "logistika CMR",
    "colné služby",
    "Košice",
  ],

  nav: [
    { label: "Ponúkame", href: "#ponukame" },
    { label: "Zaistíme", href: "#zaistime" },
    { label: "Partneri", href: "#partneri" },
    { label: "Kontakt", href: "#kontakt" },
  ],

  hero: {
    eyebrow: "macro SOFT s.r.o. · Košice",
    title: "Medzinárodný dodávateľ elektrotechnológií",
    lead: "Elektrotechnický tovar zabezpečíme od overených dodávateľov a postaráme sa o všetko od výberu až po doručenie.",
    points: [
      {
        title: "Vyhľadáme najvhodnejší tovar na európskom trhu",
        icon: "search",
      },
      {
        title: "Zaistíme bezpečnú obchodnú komunikáciu",
        icon: "shield",
      },
      {
        title: "Preclíme a dopravíme tovar priamo k vám",
        icon: "truck",
      },
    ] satisfies { title: string; icon: IconName }[],
    cta: { label: "Kontaktujte nás", href: "#kontakt" },
    secondaryCta: { label: "Čo ponúkame", href: "#ponukame" },
  },

  offer: {
    id: "ponukame",
    eyebrow: "Sortiment",
    title: "Ponúkame",
    intro:
      "Dodávame komponenty a technológie pre priemysel, telekomunikácie aj IT. Ak hľadaný tovar nemáme v ponuke, vyhľadáme ho u preverených výrobcov a distribútorov.",
    items: [
      {
        title: "Pamäťové úložiská, čipy a mikrokontroléry",
        description: "Pamäťové moduly, integrované obvody a riadiace jednotky pre vývoj aj sériovú výrobu.",
        icon: "cpu",
      },
      {
        title: "Optické káble, vlákna a príslušenstvo",
        description: "Káble, vlákna, konektory a spojovací materiál pre dátové a telekomunikačné siete.",
        icon: "cable",
      },
      {
        title: "Bezpečnostné a diaľkovo ovládané systémy",
        description: "Kamerové a zabezpečovacie systémy, riadiace jednotky a zariadenia na diaľkové ovládanie.",
        icon: "cctv",
      },
      {
        title: "Moderné telekomunikačné nástroje",
        description: "Sieťové a prenosové zariadenia a meracia technika pre telekomunikačnú infraštruktúru.",
        icon: "radio",
      },
      {
        title: "Výpočtová technika, vodiče a nahrávacie technológie",
        description: "Hardvér, vodiče a kabeláž, ako aj zariadenia na záznam a ukladanie dát.",
        icon: "server",
      },
    ] satisfies Feature[],
  },

  services: {
    id: "zaistime",
    eyebrow: "Služby",
    title: "Zaistíme",
    intro:
      "Okrem samotného tovaru preberáme aj starosť o jeho cestu k vám – od prepravných dokumentov až po colné konanie.",
    items: [
      {
        tag: "CMR",
        title: "Logistické služby na mieru",
        description: "Prepravu naplánujeme podľa vašich potrieb vrátane medzinárodného nákladného listu CMR.",
        icon: "file",
      },
      {
        tag: "EÚ",
        title: "Doprava v rámci EÚ a do iných krajín",
        description: "Tovar doručíme v rámci Európskej únie aj do tretích krajín prostredníctvom overených dopravcov.",
        icon: "globe",
      },
      {
        tag: "CLO",
        title: "Colný profesionálny export/import",
        description: "Zabezpečíme colné odbavenie pri vývoze aj dovoze, aby tovar prešiel hranicou bez zdržania.",
        icon: "stamp",
      },
    ] satisfies ServiceItem[],
  },

  partners: {
    id: "partneri",
    eyebrow: "Spolupráca",
    title: "Partneri a dopravcovia",
    intro: "Pri preprave spolupracujeme so spoľahlivými logistickými spoločnosťami.",
  },

  contact: {
    id: "kontakt",
    eyebrow: "Kontakt",
    title: "Ozvite sa nám",
    intro: "Napíšte nám alebo zavolajte – radi s vami preberieme váš dopyt.",
    labels: {
      company: "Spoločnosť",
      address: "Adresa",
      ids: "Identifikačné údaje",
      bank: "Bankové spojenie",
      phone: "Telefón",
      email: "E-mail",
      map: "Zobraziť na mape",
      mapHint: "(Google Maps, otvorí sa v novom okne)",
      mapTitle: "Mapa – sídlo macro SOFT s.r.o., Werferova 3782/6, Košice",
      ico: "IČO",
      dic: "DIČ (VAT)",
      iban: "IBAN",
      swift: "SWIFT / BIC",
      copyIban: "Kopírovať IBAN",
      copied: "IBAN skopírovaný",
      copyFailed: "Kopírovanie zlyhalo",
    },
  },

  company: {
    legalName: "macro SOFT s.r.o.",
    address: {
      street: "Werferova 3782/6",
      postalCode: "040 11",
      city: "Košice",
      district: "mestská časť Juh",
      country: "Slovensko",
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
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Werferova+3782%2F6%2C+040+11+Ko%C5%A1ice",
    /** Súradnice sídla (OpenStreetMap / Nominatim) – pre mapu a JSON-LD. */
    geo: { lat: 48.70629, lon: 21.2462 },
    /**
     * Vložená mapa OpenStreetMap – neukladá cookies, takže netreba cookie lištu.
     * bbox = západ, juh, východ, sever; marker = poloha sídla.
     */
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=21.2402%2C48.7038%2C21.2522%2C48.7088&layer=mapnik&marker=48.70629%2C21.2462",
  },

  footer: {
    tagline: "Medzinárodný dodávateľ elektrotechnológií",
    rights: "Všetky práva vyhradené.",
  },

  a11y: {
    skipLink: "Preskočiť na obsah",
    openMenu: "Otvoriť menu",
    closeMenu: "Zatvoriť menu",
    mainNav: "Hlavná navigácia",
    footerNav: "Odkazy v pätičke",
    home: "macro SOFT – na začiatok stránky",
  },

  logos: {
    dark: { src: "/logo.svg", width: 1009, height: 256 },
    light: { src: "/logo-white.svg", width: 1009, height: 256 },
    alt: "macro SOFT – medzinárodný dodávateľ elektrotechnológií",
  },
} as const;

export type SiteConfig = typeof siteConfig;
