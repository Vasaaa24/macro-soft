import type { Dictionary } from "../types";

/** English (/en/). */
export const en: Dictionary = {
  meta: {
    title: "macro SOFT s.r.o. – international supplier of electrical technologies",
    description:
      "macro SOFT s.r.o. from Košice sources the most suitable electrical and electronic goods on the European market, ensures secure business communication and handles customs clearance and delivery to your door.",
    keywords: [
      "electrical technologies",
      "electronics supplier",
      "chips and microcontrollers",
      "fibre optic cables",
      "telecommunication equipment",
      "CMR logistics",
      "customs services",
      "Košice",
      "Slovakia",
    ],
  },

  nav: [
    { label: "Products", href: "#ponukame" },
    { label: "Services", href: "#zaistime" },
    { label: "Partners", href: "#partneri" },
    { label: "Contact", href: "#kontakt" },
  ],

  hero: {
    eyebrow: "macro SOFT s.r.o. · Košice, Slovakia",
    title: "International supplier of electrical technologies",
    lead: "We source electrical goods from verified suppliers and take care of everything from selection to delivery.",
    points: [
      { title: "We find the most suitable goods on the European market", icon: "search" },
      { title: "We ensure secure business communication", icon: "shield" },
      { title: "We clear customs and deliver the goods straight to you", icon: "truck" },
    ],
    cta: { label: "Contact us", href: "#kontakt" },
    secondaryCta: { label: "What we offer", href: "#ponukame" },
  },

  offer: {
    eyebrow: "Product range",
    title: "What we offer",
    intro:
      "We supply components and technologies for industry, telecommunications and IT. If the goods you need are not in our range, we will source them from vetted manufacturers and distributors.",
    items: [
      {
        title: "Memory storage, chips and microcontrollers",
        description: "Memory modules, integrated circuits and control units for development and series production.",
        icon: "cpu",
      },
      {
        title: "Fibre optic cables, fibres and accessories",
        description: "Cables, fibres, connectors and jointing material for data and telecommunication networks.",
        icon: "cable",
      },
      {
        title: "Security and remote-controlled systems",
        description: "CCTV and security systems, control units and remote-control devices.",
        icon: "cctv",
      },
      {
        title: "Modern telecommunication tools",
        description: "Network and transmission equipment and test instruments for telecommunication infrastructure.",
        icon: "radio",
      },
      {
        title: "Computing, wiring and recording technology",
        description: "Hardware, wires and cabling, as well as data recording and storage devices.",
        icon: "server",
      },
    ],
  },

  services: {
    eyebrow: "Services",
    title: "What we provide",
    intro:
      "Beyond the goods themselves, we take care of their journey to you – from transport documents to customs clearance.",
    items: [
      {
        tag: "CMR",
        title: "Tailored logistics services",
        description: "We plan transport to suit your needs, including the international CMR consignment note.",
        icon: "file",
      },
      {
        tag: "EU",
        title: "Transport within the EU and beyond",
        description: "We deliver goods within the European Union and to third countries through reliable carriers.",
        icon: "globe",
      },
      {
        tag: "Customs",
        title: "Professional customs export/import",
        description: "We handle customs clearance for exports and imports so your goods cross the border without delay.",
        icon: "stamp",
      },
    ],
  },

  partners: {
    eyebrow: "Cooperation",
    title: "Partners and carriers",
    intro: "For transport, we work with reliable logistics companies.",
  },

  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    intro: "Write to us or give us a call – we will be happy to discuss your enquiry.",
    labels: {
      company: "Company",
      address: "Address",
      ids: "Company identifiers",
      bank: "Bank details",
      phone: "Phone",
      email: "Email",
      map: "Show on map",
      mapHint: "(Google Maps, opens in a new window)",
      mapTitle: "Map – registered office of macro SOFT s.r.o., Werferova 3782/6, Košice",
      ico: "Company ID (IČO)",
      dic: "VAT ID (DIČ)",
      iban: "IBAN",
      swift: "SWIFT / BIC",
      copyIban: "Copy IBAN",
      copied: "IBAN copied",
      copyFailed: "Copying failed",
    },
  },

  og: {
    title: "International supplier of electrical technologies",
    subtitle: "Components from Europe · CMR logistics · Customs services",
    location: "Košice · Slovakia",
  },

  footer: {
    tagline: "International supplier of electrical technologies",
    rights: "All rights reserved.",
  },

  a11y: {
    skipLink: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    mobileContact: "Quick contact",
    footerNav: "Footer links",
    home: "macro SOFT – back to top",
    language: "Language",
    logoAlt: "macro SOFT – international supplier of electrical technologies",
  },

  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has been moved.",
    back: "Back to the homepage",
  },
};
