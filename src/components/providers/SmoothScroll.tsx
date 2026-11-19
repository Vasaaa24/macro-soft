"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, HEADER_OFFSET, MOTION_REDUCE, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

/**
 * Lenis smooth scroll prepojený s GSAP ScrollTrigger podľa README Lenisu.
 * Pri prefers-reduced-motion: reduce sa Lenis vôbec nespustí (a vypne sa pri zmene nastavenia).
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduceQuery = window.matchMedia(MOTION_REDUCE);
    let lenis: Lenis | null = null;

    const update = (time: number) => {
      lenis?.raf(time * 1000);
    };

    const start = () => {
      if (lenis) return;
      lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    };

    const stop = () => {
      if (!lenis) return;
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenis = null;
      setLenis(null);
    };

    const onMotionChange = () => {
      if (reduceQuery.matches) stop();
      else start();
    };

    // Kotvy (#kontakt…) posúvame cez Lenis, aby bol pohyb plynulý a zohľadnil sticky hlavičku.
    // Po doskrolovaní presunieme fokus na cieľovú sekciu (skip-link, klávesnica, čítačky).
    const onClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      const id = decodeURIComponent(link.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (id && !target) return;

      event.preventDefault();
      const focusTarget = () => {
        if (!target) return;
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };

      lenis.scrollTo(target ?? 0, { offset: -HEADER_OFFSET, onComplete: focusTarget });
      history.pushState(null, "", id ? `#${id}` : window.location.pathname);
    };

    onMotionChange();
    reduceQuery.addEventListener("change", onMotionChange);
    document.addEventListener("click", onClick);

    return () => {
      reduceQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("click", onClick);
      stop();
    };
  }, []);

  return null;
}
