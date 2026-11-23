import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/types";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

// Karta je vyvýšená tieňom namiesto výrazného okraja – rovnaký okraj aj tieň ako karty v sekcii Zaistíme.
const cardStyle = { "--spotlight-card-border": "var(--card-border)" } as CSSProperties;

// Rozloženie „bento“: prvé dve karty širšie, ďalšie tri v rade (na desktope).
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export function Offer({ t }: { t: Dictionary }) {
  const { offer } = t;

  return (
    <section id={siteConfig.sections.offer} aria-labelledby="ponukame-title" className="on-light bg-paper py-20 sm:py-28 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading id="ponukame-title" eyebrow={offer.eyebrow} title={offer.title} intro={offer.intro} />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-6">
            {offer.items.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                className={cn(
                  spans[index],
                  index === offer.items.length - 1 && "sm:col-span-2 lg:col-span-2",
                )}
              >
                <SpotlightCard
                  theme="light"
                  spotlightColor="#2F80ED"
                  intensity={0.5}
                  borderGlow={0.9}
                  spotlightSize={280}
                  proximity={60}
                  style={cardStyle}
                  className="flex h-full flex-col p-7 shadow-[var(--card-shadow)] transition-shadow duration-300 hover:shadow-[var(--card-shadow-hover)] sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand-strong">
                      <Icon name={item.icon} className="size-6" />
                    </span>
                    <span aria-hidden="true" className="font-display text-sm font-semibold tabular-nums text-graphite/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold leading-snug text-ink sm:text-[1.35rem]">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
                </SpotlightCard>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
