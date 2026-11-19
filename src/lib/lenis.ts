import type Lenis from "lenis";

/** Aktuálna inštancia Lenisu (null, ak smooth scroll nebeží – napr. pri prefers-reduced-motion). */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

/**
 * Zamkne/odomkne skrolovanie stránky (napr. pri otvorenom mobilnom menu).
 * S Lenisom ho zastaví, bez neho nastaví overflow na <html>.
 */
export function lockScroll(locked: boolean) {
  if (locked) {
    instance?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "";
    instance?.start();
  }
}
