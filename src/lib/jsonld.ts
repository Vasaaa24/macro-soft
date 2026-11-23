import { siteConfig } from "@/config/site";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

/** JSON-LD schéma Organization (schema.org) so sídlom, IČO, DIČ a kontaktmi – v jazyku stránky. */
export function organizationJsonLd(t: Dictionary, locale: Locale) {
  const { company } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: company.legalName,
    legalName: company.legalName,
    alternateName: siteConfig.shortName,
    url: `${siteConfig.url}${localeMeta[locale].path}`,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/logo.png`,
    description: t.meta.description,
    inLanguage: locale,
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
        availableLanguage: [...locales, "cs"],
      },
    ],
    areaServed: "Europe",
    knowsAbout: t.offer.items.map((item) => item.title),
  };
}
