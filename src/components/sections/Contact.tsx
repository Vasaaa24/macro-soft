import { ArrowUpRight, Building2, FileText, Landmark, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/types";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact({ t }: { t: Dictionary }) {
  const { contact } = t;
  const { company } = siteConfig;
  const { labels } = contact;
  const { address } = company;

  return (
    <section
      id={siteConfig.sections.contact}
      aria-labelledby="kontakt-title"
      className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 -z-10 size-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(47,128,237,0.16),transparent)]"
      />
      <Container>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col">
              <SectionHeading
                id="kontakt-title"
                eyebrow={contact.eyebrow}
                title={contact.title}
                intro={contact.intro}
                tone="dark"
              />

              <ul className="mt-10 grid gap-4">
                <li data-reveal>
                  <a
                    href={company.phone.href}
                    className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-brand/70 sm:p-6"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white">
                      <Phone aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-white/60">{labels.phone}</span>
                      <span className="block font-display text-xl font-semibold sm:text-2xl">
                        {company.phone.display}
                      </span>
                    </span>
                  </a>
                </li>
                <li data-reveal>
                  <a
                    href={`mailto:${company.email}`}
                    className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-brand/70 sm:p-6"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white">
                      <Mail aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-white/60">{labels.email}</span>
                      <span className="block break-all font-display text-xl font-semibold sm:text-2xl">
                        {company.email}
                      </span>
                    </span>
                  </a>
                </li>
              </ul>

              {/* OpenStreetMap bez cookies; na desktope vyplní zvyšnú výšku stĺpca. */}
              <div
                data-reveal
                className="mt-4 h-72 overflow-hidden rounded-3xl border border-white/10 bg-ink-2 sm:h-80 lg:h-auto lg:min-h-72 lg:flex-1"
              >
                <iframe
                  src={company.mapEmbedUrl}
                  title={labels.mapTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block size-full border-0 grayscale-[35%]"
                />
              </div>
            </div>

            <div data-reveal className="rounded-3xl border border-white/10 bg-ink-2 p-6 sm:p-8">
              <address className="not-italic">
                {/* Ikona je vo vnútri <dt>, aby <dl> obsahoval iba dvojice dt/dd (validné HTML). */}
                <dl className="grid gap-7">
                  <div className="relative pl-9">
                    <dt className="text-sm text-white/60">
                      <Building2 aria-hidden="true" className="absolute left-0 top-0.5 size-5 text-brand-light" />
                      {labels.company}
                    </dt>
                    <dd className="mt-1 text-lg font-semibold">{company.legalName}</dd>
                  </div>

                  <div className="relative pl-9">
                    <dt className="text-sm text-white/60">
                      <MapPin aria-hidden="true" className="absolute left-0 top-0.5 size-5 text-brand-light" />
                      {labels.address}
                    </dt>
                    <dd className="mt-1 leading-relaxed">
                      {address.street}
                      <br />
                      {address.postalCode} {address.city} – {address.district}
                      <br />
                      <a
                        href={company.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 rounded font-semibold text-brand-light underline-offset-4 hover:underline"
                      >
                        {labels.map}
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                        <span className="sr-only">{labels.mapHint}</span>
                      </a>
                    </dd>
                  </div>

                  <div className="relative pl-9">
                    <dt className="text-sm text-white/60">
                      <FileText aria-hidden="true" className="absolute left-0 top-0.5 size-5 text-brand-light" />
                      {labels.ids}
                    </dt>
                    <dd className="mt-1 leading-relaxed">
                      {labels.ico}: <span className="font-semibold tabular-nums">{company.ico}</span>
                      <br />
                      {labels.dic}: <span className="font-semibold tabular-nums">{company.dic}</span>
                    </dd>
                  </div>

                  <div className="relative min-w-0 pl-9">
                    <dt className="text-sm text-white/60">
                      <Landmark aria-hidden="true" className="absolute left-0 top-0.5 size-5 text-brand-light" />
                      {labels.bank}
                    </dt>
                    <dd className="mt-1 leading-relaxed">
                      <span className="block">{company.bank.name}</span>
                      <span className="mt-2 block text-sm text-white/60">{labels.iban}</span>
                      <span className="block font-semibold tabular-nums tracking-wide sm:text-lg">
                        {company.bank.iban}
                      </span>
                      <CopyButton
                        value={company.bank.iban.replace(/\s/g, "")}
                        label={labels.copyIban}
                        copiedLabel={labels.copied}
                        failedLabel={labels.copyFailed}
                        className="mt-3"
                      />
                      <span className="mt-4 block text-sm text-white/60">{labels.swift}</span>
                      <span className="block font-semibold tracking-wide">{company.bank.swift}</span>
                    </dd>
                  </div>
                </dl>
              </address>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
