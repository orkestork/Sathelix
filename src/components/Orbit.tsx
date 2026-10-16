"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/motion";
import { INGREDIENTS } from "@/lib/data";
import Emblem from "./Emblem";

const N = INGREDIENTS.length;
const STEP = 360 / N;
const ACTIVE_ANGLE = 180; // el ingrediente activo se ubica a la izquierda, junto al texto

export default function Orbit() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const wheel = q(".orbit__wheel")[0] as HTMLElement;
      const items = q(".orbit__item") as HTMLElement[];
      const names = q(".orbit__name") as HTMLElement[];
      const texts = q(".orbit__text") as HTMLElement[];
      const bars = q(".orbit__progress i") as HTMLElement[];
      const countEl = q(".orbit__count b")[0] as HTMLElement;
      let current = -1;

      gsap.set([...names, ...texts], { autoAlpha: 0 });

      const show = (idx: number) => {
        if (idx === current) return;
        const dir = idx > current ? 1 : -1;
        if (current >= 0) {
          gsap.to(names[current], { yPercent: -100 * dir, autoAlpha: 0, duration: 0.5, ease: "power3.in", overwrite: true });
          gsap.to(texts[current], { y: -20 * dir, autoAlpha: 0, duration: 0.3, overwrite: true });
        }
        gsap.fromTo(
          names[idx],
          { yPercent: 100 * dir, autoAlpha: 1 },
          { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: "expo.out", overwrite: true },
        );
        gsap.fromTo(texts[idx], { y: 20 * dir, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, delay: 0.1, overwrite: true });
        countEl.textContent = `0${idx + 1}`;
        current = idx;
      };

      const layout = (a: number) => {
        const R = wheel.offsetWidth * 0.43;
        items.forEach((el, i) => {
          const deg = ACTIVE_ANGLE + (i - a) * STEP;
          const rad = (deg * Math.PI) / 180;
          const near = Math.max(0, 1 - Math.abs(i - a));
          gsap.set(el, {
            x: Math.cos(rad) * R,
            y: Math.sin(rad) * R,
            scale: 0.72 + near * 0.62,
            zIndex: Math.round(near * 10) + 1,
            opacity: 0.45 + near * 0.55,
          });
          (el.querySelector("span") as HTMLElement).style.opacity = String(near);
        });
        bars.forEach((b, i) => b.style.setProperty("--p", String(gsap.utils.clamp(0, 1, a - i + 1))));
        gsap.set(q(".orbit__center"), { rotate: -a * STEP * 0.5 });
        gsap.set(q(".orbit__track"), { rotate: a * STEP });
        show(Math.round(a));
      };

      layout(0);

      if (reducedMotion()) return;

      ScrollTrigger.create({
        trigger: q(".orbit")[0],
        start: "top top",
        end: () => `+=${window.innerHeight * N * 0.7}`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => layout(self.progress * (N - 1)),
        onRefresh: (self) => layout(self.progress * (N - 1)),
        snap: { snapTo: 1 / (N - 1), duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: "power2.inOut" },
      });

      // intro: letras gigantes que caen como en un tablero
      gsap.from(q(".orbit-intro__big .ch"), {
        yPercent: -120,
        rotate: () => gsap.utils.random(-25, 25),
        opacity: 0,
        stagger: 0.05,
        ease: "bounce.out",
        duration: 1.2,
        scrollTrigger: { trigger: q(".orbit-intro")[0], start: "top 60%" },
      });
      gsap.from(q(".orbit-intro__small .ch"), {
        opacity: 0.1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: { trigger: q(".orbit-intro")[0], start: "top 80%", end: "top 30%", scrub: true },
      });
    },
    { scope: root },
  );

  const chars = (t: string) =>
    t.split("").map((c, i) => (
      <span key={i} className="ch">
        {c === " " ? " " : c}
      </span>
    ));

  return (
    <div ref={root} id="orbita">
      <div className="orbit-intro">
        <p className="orbit-intro__small display">{chars("Siete elementos")}</p>
        <p className="orbit-intro__big display outline">{chars("Una órbita")}</p>
      </div>

      <section className="orbit" aria-label="Los siete ingredientes">
        <div className="orbit__grid">
          <div className="orbit__copy">
            <div className="orbit__count eyebrow">
              <b>01</b> / 07 · Ingrediente
            </div>
            <div className="orbit__names">
              {INGREDIENTS.map((ing) => (
                <h3 key={ing.slug} className="orbit__name display" style={{ color: ing.tint }}>
                  {ing.name}
                </h3>
              ))}
            </div>
            <div className="orbit__texts">
              {INGREDIENTS.map((ing) => (
                <div key={ing.slug} className="orbit__text">
                  <p className="orbit__en serif">{ing.en}</p>
                  <h3>{ing.note}</h3>
                  <p>{ing.benefit}</p>
                </div>
              ))}
            </div>
            <div className="orbit__progress" aria-hidden="true">
              {INGREDIENTS.map((ing) => (
                <i key={ing.slug} />
              ))}
            </div>
          </div>

          <div className="orbit__wheel">
            <div className="orbit__glow" />
            <div className="orbit__track" />
            <div className="orbit__track orbit__track--2" />
            <Emblem className="orbit__center" ring />
            <div className="orbit__ring">
              {INGREDIENTS.map((ing) => (
                <div key={ing.slug} className="orbit__item">
                  <img src={`/img/ing/${ing.slug}.png`} alt={ing.name} loading="lazy" />
                  <span>{ing.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
