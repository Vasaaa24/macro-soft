"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Logo } from "@/components/ui/Logo";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { lockScroll } from "@/lib/lenis";
import { cn } from "@/lib/utils";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Oneskorenie postupného nábehu položiek mobilného menu (len pri otváraní). */
const stagger = (open: boolean, index: number): CSSProperties => ({
  transitionDelay: open ? `${140 + index * 60}ms` : "0ms",
});

type HeaderProps = {
  locale: Locale;
  /** Iba texty, ktoré hlavička potrebuje – menej dát v klientskom JS. */
  nav: Dictionary["nav"];
  cta: Dictionary["hero"]["cta"];
  a11y: Dictionary["a11y"];
};

export function Header({ locale, nav, cta, a11y }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Stav hlavičky: otvorené menu (tmavá) > odskrolované (biela) > nad hero (priehľadná).
  const tone: "menu" | "solid" | "clear" = open ? "menu" : scrolled ? "solid" : "clear";
  const lightLogo = tone !== "solid";

  // Zámok skrolovania sa nastavuje synchrónne, aby klik na kotvu v menu hneď mohol skrolovať.
  const setMenu = useCallback((next: boolean) => {
    lockScroll(next);
    setOpen(next);
  }, []);

  const close = useCallback(() => setMenu(false), [setMenu]);

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
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
        return;
      }
      // Fokus ostáva v hlavičke a v paneli menu, kým je menu otvorené.
      if (event.key !== "Tab") return;
      const items = [headerRef.current, panelRef.current]
        .flatMap((root) => (root ? Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)) : []))
        .filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktop.matches) close();
    };

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open, close]);

  // Pri odchode zo stránky s otvoreným menu nenecháme zamknuté skrolovanie.
  useEffect(() => () => lockScroll(false), []);

  const { company } = siteConfig;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
          tone === "solid" &&
            "on-light border-line bg-white/90 shadow-[0_8px_30px_-18px_rgba(20,20,20,0.35)] backdrop-blur-md",
          tone === "clear" && "border-transparent bg-transparent",
          tone === "menu" && "border-white/10 bg-ink",
        )}
      >
        <Container className="relative z-10 flex h-16 items-center justify-between gap-6 md:h-20">
          <a
            href="#"
            onClick={open ? close : undefined}
            aria-label={a11y.home}
            className="relative block shrink-0 rounded-md"
          >
            {/* Biele logo na tmavom pozadí (hero, menu), tmavé na bielej hlavičke – plynulá výmena cez opacity. */}
            <Logo
              variant="light"
              alt={a11y.logoAlt}
              priority
              className={cn("h-10 md:h-12", "transition-opacity duration-300", lightLogo ? "opacity-100" : "opacity-0")}
            />
            <span aria-hidden="true" className="absolute inset-0">
              <Logo
                variant="dark"
                alt=""
                className={cn(
                  "h-10 md:h-12",
                  "transition-opacity duration-300",
                  lightLogo ? "opacity-0" : "opacity-100",
                )}
              />
            </span>
          </a>

          <nav aria-label={a11y.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "rounded-md px-2.5 py-2 text-[0.95rem] font-medium transition-colors xl:px-3",
                      tone === "solid" ? "text-graphite hover:text-ink" : "text-white/80 hover:text-white",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher
              current={locale}
              label={a11y.language}
              tone={tone === "solid" ? "light" : "dark"}
              className="hidden lg:block"
            />
            <a
              href={cta.href}
              className="hidden items-center rounded-full bg-brand-strong px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover xl:inline-flex"
            >
              {cta.label}
            </a>

            {/* Hamburger, ktorý sa animovane zmení na krížik */}
            <button
              ref={toggleRef}
              type="button"
              className={cn(
                "relative inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
                tone === "solid" ? "text-ink hover:bg-surface" : "text-white hover:bg-white/10",
              )}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? a11y.closeMenu : a11y.openMenu}
              onClick={() => setMenu(!open)}
            >
              <span aria-hidden="true" className="relative block h-3.5 w-6">
                <span
                  className={cn(
                    "absolute left-0 top-0 block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-out-expo",
                    open && "translate-y-[6px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 right-0 block h-0.5 rounded-full bg-current transition-[transform,width] duration-300 ease-out-expo",
                    open ? "w-6 -translate-y-[6px] -rotate-45" : "w-4",
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
      </header>

      {/*
        Mobilné menu – tmavý panel na celú obrazovku s postupným nábehom položiek.
        Je mimo <header>: backdrop-filter hlavičky by inak menil polohu fixed panelu.
      */}
      <div
        ref={panelRef}
        id={menuId}
        inert={!open}
        data-lenis-prevent
        className={cn(
          "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink pt-16 transition-[opacity,transform,visibility] duration-500 ease-out-expo lg:hidden",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-32 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(47,128,237,0.28),transparent)]"
        />

        <nav aria-label={a11y.mainNav} className="relative flex-1">
          <Container className="pt-6">
            <ul className="border-t border-white/10">
              {nav.map((item, index) => (
                <li
                  key={item.href}
                  style={stagger(open, index)}
                  className={cn(
                    "border-b border-white/10 transition-[opacity,transform] duration-500 ease-out-expo",
                    open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
                  )}
                >
                  <a href={item.href} onClick={close} className="group flex items-baseline gap-4 py-5 text-white">
                    <span className="font-display text-sm font-medium tabular-nums text-brand-light">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-brand-light">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>

        <Container
          className={cn(
            "relative pb-8 pt-10 transition-[opacity,transform] duration-500 ease-out-expo",
            open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <div style={stagger(open, nav.length)}>
            <LanguageSwitcher current={locale} label={a11y.language} tone="menu" className="mb-6" />
            <a
              href={cta.href}
              onClick={close}
              className="flex items-center justify-center rounded-full bg-brand-strong px-5 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              {cta.label}
            </a>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
              {a11y.mobileContact}
            </p>
            <ul className="mt-3 grid gap-2 text-white/80">
              <li>
                <a href={company.phone.href} className="inline-flex items-center gap-3 rounded py-1.5 hover:text-white">
                  <Phone aria-hidden="true" className="size-4 text-brand-light" />
                  {company.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-3 rounded py-1.5 break-all hover:text-white"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-brand-light" />
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </>
  );
}
