"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/motion";
import { PROMISES } from "@/lib/data";
import Icon from "./Icons";

const HEAD = 72; // alto de la cabecera apilada (px)
const TOP = 96; // primera posición sticky (debajo del nav)

const FLOATS = [
  { slug: "cacao", x: 8, y: 8, w: 12, speed: 0.6 },
  { slug: "canela", x: 74, y: 4, w: 15, speed: 0.9 },
  { slug: "avena", x: 16, y: 38, w: 13, speed: 1.3 },
  { slug: "maranon", x: 72, y: 36, w: 11, speed: 0.7 },
  { slug: "linaza", x: -4, y: 66, w: 17, speed: 1.6, blur: true },
  { slug: "chia", x: 82, y: 62, w: 15, speed: 1.8, blur: true },
  { slug: "quinoa", x: 58, y: 84, w: 11, speed: 1.1 },
];

export default function Promises() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".pcard");
      // cuando la siguiente tarjeta se apila, la anterior se oscurece
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        ScrollTrigger.create({
          trigger: next,
          start: `top ${TOP + (i + 1) * HEAD + 40}px`,
          onEnter: () => card.classList.add("is-past"),
          onLeaveBack: () => card.classList.remove("is-past"),
        });
      });

      if (reducedMotion()) return;

      // inclinación de entrada tipo "tarjeta lanzada"
      cards.forEach((card, i) => {
        gsap.from(card, {
          rotate: i % 2 ? 4 : -4,
          xPercent: i % 2 ? 6 : -6,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: `top ${TOP + i * HEAD + 120}px`, scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".promises__floats .float").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 200 * Number(el.dataset.speed) },
          {
            y: -400 * Number(el.dataset.speed),
            rotate: Number(el.dataset.speed) * 40,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="promises" id="promesas">
      <div className="promises__floats" aria-hidden="true">
        {FLOATS.map((f) => (
          <div
            key={f.slug}
            className={`float ${f.blur ? "float--blur" : ""}`}
            data-speed={f.speed}
            style={{ left: `${f.x}%`, top: `${f.y}%`, width: `${f.w}vw` }}
          >
            <img src={`/img/ing/${f.slug}.png`} alt="" loading="lazy" />
          </div>
        ))}
      </div>

      <div className="promises__head">
        <p className="eyebrow" style={{ color: "var(--gold)" }}>
          Lo que sí · Lo que no
        </p>
        <h2 className="display">
          Pura <span className="serif" style={{ color: "var(--gold-2)" }}>naturaleza</span>
        </h2>
      </div>

      <div className="promises__list">
        {PROMISES.map((p, i) => (
          <article key={p.title} className="pcard" style={{ top: TOP + i * HEAD, zIndex: i + 1 }}>
            <h3 className="tag pcard__head">{p.title}</h3>
            <div className="pcard__body">
              <span className="pcard__icon">
                <Icon name={p.icon} />
              </span>
              <p>{p.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
