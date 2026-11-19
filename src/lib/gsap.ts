import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Animácie spúšťame iba vtedy, keď používateľ nemá zapnuté obmedzenie pohybu. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_REDUCE = "(prefers-reduced-motion: reduce)";

/** Výška sticky hlavičky – posun pri skrolovaní na kotvy. */
export const HEADER_OFFSET = 80;

export { gsap, ScrollTrigger, SplitText, useGSAP };
