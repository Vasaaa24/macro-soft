import type { IconName } from "@/config/site";

export type NavItem = { label: string; href: string };

export type Feature = {
  title: string;
  description: string;
  icon: IconName;
};

export type ServiceItem = Feature & {
  /** Krátka skratka zvýraznená na karte (napr. CMR, EÚ, CLO). */
  tag: string;
};

/**
 * Všetky texty webu pre jeden jazyk. Každý slovník (sk, en, uk) musí mať úplne rovnakú štruktúru –
 * TypeScript tak ohlási chýbajúci preklad pri builde.
 */
export type Dictionary = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: NavItem[];
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    points: { title: string; icon: IconName }[];
    cta: NavItem;
    secondaryCta: NavItem;
  };
  offer: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Feature[];
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ServiceItem[];
  };
  partners: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    labels: {
      company: string;
      address: string;
      ids: string;
      bank: string;
      phone: string;
      email: string;
      map: string;
      mapHint: string;
      mapTitle: string;
      ico: string;
      dic: string;
      iban: string;
      swift: string;
      copyIban: string;
      copied: string;
      copyFailed: string;
    };
  };
  /** Texty náhľadového obrázka pri zdieľaní odkazu (Open Graph). */
  og: {
    title: string;
    subtitle: string;
    location: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
  a11y: {
    skipLink: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    mobileContact: string;
    footerNav: string;
    home: string;
    language: string;
    logoAlt: string;
  };
  notFound: {
    title: string;
    text: string;
    back: string;
  };
};
