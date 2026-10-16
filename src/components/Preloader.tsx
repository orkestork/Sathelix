"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Emblem from "./Emblem";
import { LOADED_EVENT } from "@/lib/motion";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const finish = () => {
        document.documentElement.style.overflow = "";
        window.dispatchEvent(new Event(LOADED_EVENT));
        (window as unknown as { __sathelixLoaded?: boolean }).__sathelixLoaded = true;
        setDone(true);
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finish();
        return;
      }

      document.documentElement.style.overflow = "hidden";
      const sevens = gsap.utils.toArray<SVGPathElement>(".loader .emblem-seven");
      const counter = { v: 0 };
      const num = root.current!.querySelector(".loader__num")!;

      gsap.set(sevens, { strokeDasharray: 140, strokeDashoffset: 140 });
      gsap.set(".loader .emblem-ring", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });

      gsap
        .timeline({ onComplete: finish })
        .to(sevens, { strokeDashoffset: 0, duration: 0.55, stagger: 0.14, ease: "power2.out" })
        .to(
          counter,
          {
            v: 7,
            duration: 0.55 + 0.14 * 6,
            ease: "none",
            onUpdate: () => (num.textContent = `0${Math.round(counter.v)}`),
          },
          0,
        )
        .to(".loader .emblem-ring", { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" }, "-=0.3")
        .to(".loader__emblem", { rotate: 360 / 7, duration: 0.8, ease: "power3.inOut" }, "-=0.2")
        .to(".loader__count", { opacity: 0, y: 20, duration: 0.4 }, "<")
        .to(".loader__emblem", { scale: 0.2, opacity: 0, duration: 0.5, ease: "power3.in" })
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, "-=0.15");
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="loader" style={{ clipPath: "inset(0 0 0% 0)" }}>
      <div className="loader__emblem">
        <Emblem ring />
      </div>
      <div className="loader__count">
        <span className="eyebrow" style={{ color: "var(--sand)" }}>
          Seven elements.
          <br />
          One perfect orbit.
        </span>
        <span className="loader__num display outline-gold">00</span>
      </div>
    </div>
  );
}
