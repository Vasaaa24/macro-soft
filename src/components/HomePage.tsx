import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Offer } from "@/components/sections/Offer";
import { Partners } from "@/components/sections/Partners";
import { Services } from "@/components/sections/Services";
import { getDictionary, type Locale } from "@/i18n";

/** Celá jednostránková prezentácia v danom jazyku. */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <Header locale={locale} nav={t.nav} cta={t.hero.cta} a11y={t.a11y} />
      <main id="obsah" tabIndex={-1} className="outline-none">
        <Hero t={t} />
        <Offer t={t} />
        <Services t={t} />
        <Partners t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
