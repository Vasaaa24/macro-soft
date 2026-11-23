import type { Dictionary } from "../types";

/** Slovenčina – predvolený jazyk webu (/). */
export const sk: Dictionary = {
  meta: {
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
  },

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
      { title: "Vyhľadáme najvhodnejší tovar na európskom trhu", icon: "search" },
      { title: "Zaistíme bezpečnú obchodnú komunikáciu", icon: "shield" },
      { title: "Preclíme a dopravíme tovar priamo k vám", icon: "truck" },
    ],
    cta: { label: "Kontaktujte nás", href: "#kontakt" },
    secondaryCta: { label: "Čo ponúkame", href: "#ponukame" },
  },

  offer: {
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
    ],
  },

  services: {
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
    ],
  },

  partners: {
    eyebrow: "Spolupráca",
    title: "Partneri a dopravcovia",
    intro: "Pri preprave spolupracujeme so spoľahlivými logistickými spoločnosťami.",
  },

  contact: {
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

  og: {
    title: "Medzinárodný dodávateľ elektrotechnológií",
    subtitle: "Komponenty z Európy · Logistika CMR · Colné služby",
    location: "Košice · Slovensko",
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
    mobileContact: "Rýchly kontakt",
    footerNav: "Odkazy v pätičke",
    home: "macro SOFT – na začiatok stránky",
    language: "Jazyk",
    logoAlt: "macro SOFT – medzinárodný dodávateľ elektrotechnológií",
  },

  notFound: {
    title: "Stránka sa nenašla",
    text: "Stránka, ktorú hľadáte, neexistuje alebo bola presunutá.",
    back: "Späť na úvod",
  },
};
