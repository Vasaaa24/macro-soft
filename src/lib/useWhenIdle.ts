"use client";

import { useEffect, useState } from "react";

/** Vráti true, keď je prehliadač nečinný (alebo po timeoute) – na odloženie nekritických efektov. */
export function useWhenIdle(timeout = 2000): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setIdle(true), { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setIdle(true), 300);
    return () => clearTimeout(id);
  }, [timeout]);

  return idle;
}
