import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  const { services } = siteConfig;

  return (
    <section
      id={services.id}
      aria-labelledby="zaistime-title"
      className="on-light border-y border-line bg-surface py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <SectionHeading
              id="zaistime-title"
              eyebrow={services.eyebrow}
              title={services.title}
              intro={services.intro}
              className="lg:sticky lg:top-32 lg:self-start"
            />

            <ol className="grid gap-4 sm:gap-5">
              {services.items.map((item, index) => (
                <li
                  key={item.tag}
                  data-reveal
                  className="group relative overflow-hidden rounded-3xl border border-[var(--card-border)] bg-white p-7 shadow-[var(--card-shadow)] transition-shadow duration-300 hover:shadow-[var(--card-shadow-hover)] sm:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brand transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
                  />
                  <div className="flex items-start gap-5 sm:gap-6">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand-light">
                      <Icon name={item.icon} className="size-6" />
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-baseline gap-3">
                        <span className="font-display text-2xl font-bold tracking-tight text-ink">{item.tag}</span>
                        <span aria-hidden="true" className="text-sm font-medium tabular-nums text-graphite/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </p>
                      <h3 className="mt-1 text-lg font-semibold leading-snug text-ink sm:text-xl">{item.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
