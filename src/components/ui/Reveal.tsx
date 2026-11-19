"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Obal, ktorý pri scrolle postupne odhalí všetky potomky s atribútom `data-reveal`.
 * Animuje sa iba transform a opacity; pri prefers-reduced-motion sa nič neanimuje
 * a obsah je viditeľný hneď (CSS skrýva [data-reveal] len pri no-preference).
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current);
        if (!items.length) return;

        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { autoAlpha: 0, y: 28 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.08,
                overwrite: true,
                clearProps: "transform,visibility",
              },
            ),
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
