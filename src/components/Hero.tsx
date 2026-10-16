"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, onLoaded, reducedMotion } from "@/lib/motion";

// posición (% del escenario), tamaño (vw), profundidad para parallax, giro base
const FLOATS = [
  { slug: "avena", x: 66, y: 4, w: 13, depth: 1.2, r: 14 },
  { slug: "cacao", x: 21, y: 44, w: 12, depth: 1.6, r: -10 },
  { slug: "canela", x: 64, y: 62, w: 15, depth: 1.4, r: -18 },
  { slug: "maranon", x: 28, y: 10, w: 9, depth: 0.9, r: 20 },
  { slug: "chia", x: 4, y: 70, w: 14, depth: 2.4, r: 0, blur: true },
  { slug: "quinoa", x: 84, y: 30, w: 12, depth: 2.2, r: 0, blur: true },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const floats = q(".float");

      if (reducedMotion()) return;

      // estado inicial (antes del preloader)
      gsap.set(q(".hero__title .line > span"), { yPercent: 110 });
      gsap.set(q(".hero__sachet"), { y: 260, rotate: 14, opacity: 0 });
      gsap.set(q(".hero__disc"), { scale: 0 });
      gsap.set(floats, { scale: 0, opacity: 0 });
      gsap.set(q(".hero__rail, .hero__cta, .hero__badge"), { opacity: 0 });

      const intro = () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(q(".hero__title .line > span"), { yPercent: 0, duration: 1.3, stagger: 0.09 })
          .to(q(".hero__disc"), { scale: 1, duration: 1.4 }, 0.25)
          .to(q(".hero__sachet"), { y: 0, rotate: -4, opacity: 1, duration: 1.5, ease: "back.out(1.1)" }, 0.35)
          .to(floats, { scale: 1, opacity: 1, duration: 1.1, stagger: 0.07, ease: "back.out(1.8)" }, 0.6)
          .to(q(".hero__rail, .hero__cta, .hero__badge"), { opacity: 1, duration: 1 }, 0.9);

        // flotación continua
        floats.forEach((el, i) => {
          gsap.to(el.querySelector("img"), {
            y: i % 2 ? 16 : -16,
            rotate: `+=${i % 2 ? 6 : -6}`,
            duration: 3 + i * 0.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      };
      const off = onLoaded(intro);

      // parallax con el mouse
      const movers = floats.map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" }),
        d: Number(el.dataset.depth),
      }));
      const sx = gsap.quickTo(q(".hero__sachet"), "x", { duration: 1.4, ease: "power3" });
      const sr = gsap.quickTo(q(".hero__sachet"), "rotationY", { duration: 1.4, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => {
          m.x(nx * 50 * m.d);
          m.y(ny * 36 * m.d);
        });
        sx(nx * 18);
        sr(nx * 16);
      };
      window.addEventListener("pointermove", onMove);

      // scroll: el sachet sube y gira, los ingredientes se dispersan
      const st = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      st.to(q(".hero__sachet img"), { yPercent: -18, rotate: 10, scale: 0.92, ease: "none" }, 0)
        .to(q(".hero__disc"), { scale: 1.25, ease: "none" }, 0)
        .to(q(".hero__title"), { yPercent: -30, opacity: 0.2, ease: "none" }, 0);
      floats.forEach((el) => {
        st.to(el, { yPercent: -120 * Number(el.dataset.depth), ease: "none" }, 0);
      });

      return () => {
        off();
        window.removeEventListener("pointermove", onMove);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero" id="top">
      <h1 className="hero__title display">
        <span className="line">
          <span className="outline">Seven elements.</span>
        </span>
        <span className="line">
          <span>One perfect orbit</span>
        </span>
      </h1>

      <div className="hero__stage">
        <div className="hero__rail">
          <span className="eyebrow">Fórmula N.º 07</span>
          <span className="dash" />
          <span className="dash" />
          <span className="eyebrow">Batido nutricional 100% vegetal</span>
        </div>

        <div className="hero__disc" />

        <div className="hero__sachet" style={{ perspective: 800 }}>
          <img src="/img/sachet.png" alt="Sachet Sathelix, batido nutricional 100% vegetal con 7 ingredientes" />
        </div>

        {FLOATS.map((f) => (
          <div
            key={f.slug}
            className={`float ${f.blur ? "float--blur" : ""}`}
            data-depth={f.depth}
            style={{ left: `${f.x}%`, top: `${f.y}%`, width: `${f.w}vw`, rotate: `${f.r}deg` }}
          >
            <img src={`/img/ing/${f.slug}.png`} alt="" />
          </div>
        ))}

        <svg className="hero__badge" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1" />
          <text fill="currentColor" style={{ font: "700 17px var(--font-sans)", letterSpacing: "0.32em" }}>
            <textPath href="#badge-circle">NATURAL ENERGY · TOTAL NUTRITION ·</textPath>
          </text>
          <g transform="translate(100 100) scale(.36)">
            <path d="M0 -60 C 40 -40 40 30 0 60 C -40 30 -40 -40 0 -60 Z" fill="currentColor" />
            <path d="M0 -40 L0 50" stroke="#0d110a" strokeWidth="5" />
          </g>
        </svg>

        <div className="hero__cta">
          <a href="#pedir" className="btn">
            Quiero mi Sathelix
          </a>
        </div>
      </div>
    </section>
  );
}
