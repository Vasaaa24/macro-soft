"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { LogoItem } from "@/components/ui/LogoLoop";
import { partners, type Partner } from "@/data/partners";

// Pás log sa načíta až pri priblížení sekcie – menej JS pri prvom načítaní stránky.
const LogoLoop = dynamic(() => import("@/components/ui/LogoLoop").then((mod) => mod.LogoLoop), {
  ssr: false,
});

function Placeholder({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap font-display text-2xl font-bold tracking-tight text-graphite sm:text-3xl">
      <span aria-hidden="true" className="size-2.5 rounded-full bg-brand" />
      {name}
    </span>
  );
}

/** Predvolená výška loga v px, ak partner nemá vlastnú (`height` v partners.ts). */
const DEFAULT_LOGO_HEIGHT = 36;

function renderPartner(partner: Partner): ReactNode {
  if (!partner.logo) return <Placeholder name={partner.name} />;
  return (
    // Statický export bez optimalizácie obrázkov – <img> je zámerné.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={partner.logo}
      alt={partner.name}
      style={{ height: partner.height ?? DEFAULT_LOGO_HEIGHT }}
      className="block w-auto max-w-none object-contain"
      loading="lazy"
      decoding="async"
    />
  );
}

/** Skutočné logo z /public/partners (s vlastnou výškou pre optické vyváženie), inak textový zástupca. */
const logos: LogoItem[] = partners.map((partner) => ({
  node: renderPartner(partner),
  title: partner.name,
  href: partner.url,
  ariaLabel: partner.name,
}));

export function PartnersLoop({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-10">
      {near ? (
        <LogoLoop
          logos={logos}
          speed={60}
          direction="left"
          logoHeight={44}
          gap={96}
          pauseOnHover
          fadeOut
          draggable={false}
          intro={false}
          ariaLabel={label}
        />
      ) : (
        // Statický zoznam (aj pre SEO a bez JS), kým sa nenačíta animovaný pás.
        <ul aria-label={label} className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 px-5">
          {partners.map((partner) => (
            <li key={partner.name}>{renderPartner(partner)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
