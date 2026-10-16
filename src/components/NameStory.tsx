"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reducedMotion } from "@/lib/motion";
import { NAME_PARTS } from "@/lib/data";

export default function NameStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const track = q(".name__track")[0] as HTMLElement;
      const items = q(".name__item") as HTMLElement[];

      // los elementos viajan sobre un arco: se inclinan y bajan al alejarse del centro
      // se mide con offsets + x actual del track (no con getBoundingClientRect, que incluye el giro previo)
      const bend = () => {
        const vw = window.innerWidth;
        const tx = Number(gsap.getProperty(track, "x"));
        items.forEach((el) => {
          const center = el.offsetLeft + el.offsetWidth / 2 + tx;
          const d = gsap.utils.clamp(-1.2, 1.2, (center - vw / 2) / vw);
          gsap.set(el, { rotate: d * 22, y: d * d * 260 });
        });
      };

      if (reducedMotion()) {
        bend();
        return;
      }

      const distance = () => track.scrollWidth - window.innerWidth * 0.5;

      gsap
        .timeline({
          onUpdate: bend,
          scrollTrigger: {
            trigger: q(".name__pin")[0],
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onRefresh: bend,
          },
        })
        .to(track, { x: () => -distance(), ease: "none" }, 0)
        .to(q(".name__lead"), { opacity: 0, y: -40, ease: "none", duration: 0.12 }, 0.02)
        .to(q(".name__title"), { yPercent: -30, ease: "none" }, 0);

      gsap.from(q(".name__title textPath"), {
        attr: { startOffset: "120%" },
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="name" id="nombre">
      <div className="name__pin">
        <svg className="name__title" viewBox="0 0 1400 400" aria-label="Un nombre, tres dimensiones">
          <defs>
            <path id="name-arc" d="M 20 390 Q 700 -10 1380 390" />
          </defs>
          <text textAnchor="middle">
            <textPath href="#name-arc" startOffset="50%">
              Un nombre, tres dimensiones
            </textPath>
          </text>
        </svg>

        <p className="name__lead">
          De Phi Hélix a Sathelix: evolución, no ruptura. Ciencia y sabiduría ancestral en una sola palabra.
        </p>

        <div className="name__arc" />

        <div className="name__track">
          {NAME_PARTS.map((p) => (
            <div key={p.tag} className="name__item">
              <span className="name__word display outline">{p.word}</span>
              <span className="tag">{p.tag}</span>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
