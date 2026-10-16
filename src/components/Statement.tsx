"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reducedMotion, words } from "@/lib/motion";
import Emblem from "./Emblem";

export default function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.to(".statement .word, .statement .ico", {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: true },
      });
      gsap.from(".statement .ico", {
        rotate: -180,
        scale: 0.3,
        stagger: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="statement">
      <p>
        {words("Avena, chía, linaza, quinoa,")}
        <span className="ico word">
          <img src="/img/ing/quinoa.png" alt="" />
        </span>{" "}
        {words("cacao, canela y marañón. Siete ingredientes vegetales girando")}
        <span className="ico word" style={{ color: "var(--gold)" }}>
          <Emblem />
        </span>{" "}
        <span className="word">
          <em>en</em>&nbsp;
        </span>
        <span className="word">
          <em>una</em>&nbsp;
        </span>
        <span className="word">
          <em>sola</em>&nbsp;
        </span>
        <span className="word">
          <em>órbita.</em>&nbsp;
        </span>
        {words("Lo mezclas, lo agitas y tu cuerpo entiende el resto.")}
        <span className="ico word">
          <img src="/img/ing/canela.png" alt="" />
        </span>
      </p>
    </section>
  );
}
