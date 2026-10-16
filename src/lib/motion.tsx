"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const LOADED_EVENT = "sathelix:loaded";

/** Ejecuta `cb` cuando el preloader terminó (o de inmediato si ya terminó). */
export function onLoaded(cb: () => void) {
  if ((window as unknown as { __sathelixLoaded?: boolean }).__sathelixLoaded) {
    cb();
    return () => {};
  }
  window.addEventListener(LOADED_EVENT, cb, { once: true });
  return () => window.removeEventListener(LOADED_EVENT, cb);
}

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Separa un texto en palabras envueltas en <span class="word"> (para reveals). */
export function words(text: string) {
  return text.split(" ").map((w, i) => (
    <span key={i} className="word">
      {w}&nbsp;
    </span>
  ));
}
