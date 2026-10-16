"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reducedMotion, words } from "@/lib/motion";
import Emblem from "./Emblem";

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.to(".manifesto__text .word", {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: { trigger: ".manifesto__text", start: "top 80%", end: "bottom 45%", scrub: true },
      });
      gsap.to(".manifesto__bg", {
        rotate: 120,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="manifesto" id="manifiesto">
      <Emblem className="manifesto__bg" mono ring />
      <div className="manifesto__inner">
        <p className="eyebrow" style={{ color: "var(--gold)" }}>
          07 / Manifiesto
        </p>
        <h2 className="display">
          Everything <span className="serif" style={{ color: "var(--gold-2)" }}>in</span>{" "}
          <span className="outline">harmony</span>
        </h2>
        <p className="manifesto__text">
          {words(
            "El universo se mueve en ciclos. De las órbitas de los cuerpos celestes a las espirales de la naturaleza, todo sigue un ritmo que conecta, transforma y sostiene la vida. Inspirados en esa armonía y en la sabiduría ancestral de la India, reunimos siete ingredientes vegetales en una sola experiencia nutricional consciente. Siete elementos. Un movimiento continuo. Un propósito: reconectar la nutrición con el ritmo natural de la vida.",
          )}
        </p>
        <p className="manifesto__sign display" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>
          Natural energy. Total nutrition.
        </p>
      </div>
    </section>
  );
}
