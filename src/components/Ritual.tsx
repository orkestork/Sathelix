"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reducedMotion } from "@/lib/motion";
import { NUTRITION } from "@/lib/data";

const STEPS = [
  {
    n: "01",
    title: "Abre un sachet",
    text: "33 g de nutrición vegetal. Una porción, siete ingredientes.",
    art: "/img/ing/avena.png",
    c: "#DFCBB3",
  },
  {
    n: "02",
    title: "Mezcla en 250 ml",
    text: "Agua, leche o tu bebida vegetal favorita. Fría o al clima.",
    art: "/img/ing/maranon.png",
    c: "#A9BD6A",
  },
  {
    n: "03",
    title: "Agita y disfruta",
    text: "Agita bien y hazlo parte de tu rutina: mañana, pre-entreno o media tarde.",
    art: "/img/ing/cacao.png",
    c: "#C9A96B",
  },
];

export default function Ritual() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(".step, .facts", {
        y: 140,
        rotate: (i) => (i % 2 ? 5 : -5),
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ritual__grid", start: "top 85%" },
      });
      gsap.from(".ritual__head h2 .ch", {
        yPercent: 100,
        opacity: 0,
        stagger: 0.04,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ritual__head", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="ritual" id="ritual">
      <div className="ritual__head">
        <h2 className="display" style={{ overflow: "hidden" }}>
          {"Tu ritual".split("").map((c, i) => (
            <span key={i} className="ch" style={{ display: "inline-block" }}>
              {c === " " ? " " : c}
            </span>
          ))}
          <br />
          <span className="serif" style={{ color: "var(--gold-2)", textTransform: "none" }}>
            diario
          </span>
        </h2>
        <p>
          Nutrición consciente que cabe en tu rutina. Tres pasos, treinta segundos, una órbita completa de energía
          natural.
        </p>
      </div>

      <div className="ritual__grid">
        {STEPS.map((s) => (
          <article key={s.n} className="step" style={{ background: s.c, ["--c" as string]: s.c }}>
            <img className="step__art" src={s.art} alt="" loading="lazy" />
            <span className="step__num display">{s.n}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </article>
        ))}

        <div className="facts">
          <h3>Información nutricional</h3>
          <table>
            <thead>
              <tr>
                <th />
                <th>
                  Por
                  <br />
                  100 g
                </th>
                <th>
                  Por porción
                  <br />
                  (33 g)
                </th>
              </tr>
            </thead>
            <tbody>
              {NUTRITION.map((r) => (
                <tr key={r.label} className={r.sub ? "sub" : ""}>
                  <td>{r.label}</td>
                  <td>{r.per100}</td>
                  <td>{r.perServing}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <small>Valores de referencia del empaque. Cont. neto 33 g.</small>
        </div>
      </div>
    </section>
  );
}
