"use client";

import { useEffect, useId, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const solid = scrolled || open;

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        solid
          ? "on-light border-b border-line bg-white/90 shadow-[0_8px_30px_-18px_rgba(20,20,20,0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <a href="#" aria-label={siteConfig.a11y.home} className="relative block shrink-0 rounded-md">
          {/* Biele logo nad tmavým hero, tmavé na bielej hlavičke – plynulá výmena cez opacity. */}
          <Logo
            variant="light"
            priority
            className={cn("h-10 md:h-12", "transition-opacity duration-300", solid ? "opacity-0" : "opacity-100")}
          />
          <span aria-hidden="true" className="absolute inset-0">
            <Logo
              variant="dark"
              className={cn("h-10 md:h-12", "transition-opacity duration-300", solid ? "opacity-100" : "opacity-0")}
            />
          </span>
        </a>

        <nav aria-label={siteConfig.a11y.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors",
                    solid ? "text-graphite hover:text-ink" : "text-white/80 hover:text-white",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.hero.cta.href}
            className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-brand-strong text-white transition-colors hover:bg-brand-hover md:inline-flex"
          >
            {siteConfig.hero.cta.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>

          <button
            type="button"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full transition-colors md:hidden",
              solid ? "text-ink hover:bg-surface" : "text-white hover:bg-white/10",
            )}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? siteConfig.a11y.closeMenu : siteConfig.a11y.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </Container>

      <div id={menuId} hidden={!open} className="border-t border-line bg-white md:hidden">
        <nav aria-label={siteConfig.a11y.mainNav}>
          <Container className="py-4">
            <ul className="flex flex-col">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    className="flex items-center justify-between rounded-md px-2 py-3.5 text-lg font-medium text-ink hover:bg-surface"
                  >
                    {item.label}
                    <ArrowRight aria-hidden="true" className="size-4 text-graphite" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={siteConfig.hero.cta.href}
              onClick={close}
              className="mt-4 flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-semibold bg-brand-strong text-white transition-colors hover:bg-brand-hover"
            >
              {siteConfig.hero.cta.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </Container>
        </nav>
      </div>
    </header>
  );
}
