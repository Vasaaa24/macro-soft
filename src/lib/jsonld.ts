import { siteConfig } from "@/config/site";

const { company } = siteConfig;

/** JSON-LD schéma Organization (schema.org) so sídlom, IČO, DIČ a kontaktmi. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: company.legalName,
  legalName: company.legalName,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  image: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  email: company.email,
  telephone: company.phone.e164,
  taxID: company.ico,
  vatID: company.dic,
  identifier: [
    { "@type": "PropertyValue", propertyID: "IČO", value: company.ico },
    { "@type": "PropertyValue", propertyID: "DIČ", value: company.dic },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    postalCode: company.address.postalCode,
    addressLocality: `${company.address.city} – ${company.address.district}`,
    addressCountry: company.address.countryCode,
  },
  location: {
    "@type": "Place",
    geo: { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lon },
    hasMap: company.mapUrl,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: company.phone.e164,
      email: company.email,
      availableLanguage: ["sk", "cs", "en"],
    },
  ],
  areaServed: "Europe",
  knowsAbout: siteConfig.offer.items.map((item) => item.title),
} as const;
