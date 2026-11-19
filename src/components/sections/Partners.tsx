import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PartnersLoop } from "./PartnersLoop";

export function Partners() {
  const { partners } = siteConfig;

  return (
    <section id={partners.id} aria-labelledby="partneri-title" className="on-light bg-paper py-20 sm:py-28">
      <Reveal>
        <Container>
          <SectionHeading
            id="partneri-title"
            eyebrow={partners.eyebrow}
            title={partners.title}
            intro={partners.intro}
          />
        </Container>
        <div data-reveal className="mt-12 border-y border-line py-10 sm:mt-16 sm:py-12">
          <PartnersLoop label={partners.title} />
        </div>
      </Reveal>
    </section>
  );
}
