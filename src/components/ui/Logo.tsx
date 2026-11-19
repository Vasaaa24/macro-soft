import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** "light" = logo-white.svg pre tmavé pozadie, "dark" = logo.svg pre svetlé pozadie. */
  variant: "light" | "dark";
  className?: string;
  priority?: boolean;
};

/** Logo firmy zo súborov v /public (bez úprav). */
export function Logo({ variant, className, priority = false }: LogoProps) {
  const logo = variant === "light" ? siteConfig.logos.light : siteConfig.logos.dark;

  return (
    // SVG logo nepotrebuje optimalizáciu next/image; pri statickom exporte je <img> najjednoduchšie.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={siteConfig.logos.alt}
      width={logo.width}
      height={logo.height}
      className={cn("h-auto w-auto", className)}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
