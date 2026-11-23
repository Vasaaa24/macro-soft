import type { Dictionary } from "@/i18n/types";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import SplitText from "@/components/ui/SplitText";
import { HeroBackground } from "./HeroBackground";

export function Hero({ t }: { t: Dictionary }) {
  const { hero } = t;

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <HeroBackground />
      </div>
      {/* Jemné modré svetlo odvodené z loga */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(47,128,237,0.22),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink"
      />

      <Container className="pb-20 pt-32 sm:pb-24 md:pt-40 lg:pb-32 lg:pt-48">
        {/* Obsah hero je viditeľný hneď (rýchle LCP); animuje sa iba nadpis. */}
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
            {hero.eyebrow}
          </p>

          <SplitText
            id="hero-title"
            text={hero.title}
            tag="h1"
            splitType="words"
            effect="rise"
            trigger="load"
            delay={70}
            duration={0.9}
            textAlign="left"
            // pb: SplitText orezáva (overflow-hidden) – priestor pre dotiahnutia písmen (g, j, y) v poslednom riadku
            className="max-w-4xl pb-[0.14em] text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-7xl"
          />

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
            {hero.lead}
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {hero.points.map((point) => (
              <li
                key={point.title}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                  <Icon name={point.icon} className="size-5" />
                </span>
                <span className="pt-0.5 text-[0.95rem] font-medium leading-snug text-white/90">{point.title}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={hero.cta.href}
              className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold bg-brand-strong text-white transition-colors hover:bg-brand-hover"
            >
              {hero.cta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
