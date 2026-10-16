"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reducedMotion } from "@/lib/motion";
import Emblem from "./Emblem";

export default function Footer() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(".cta .hero__sachet", {
        y: 300,
        rotate: 30,
        ease: "none",
        scrollTrigger: { trigger: ".cta__product", start: "top bottom", end: "center center", scrub: 1 },
      });
      gsap.from(".cta .hero__disc", {
        scale: 0.3,
        ease: "none",
        scrollTrigger: { trigger: ".cta__product", start: "top bottom", end: "center center", scrub: 1 },
      });
      gsap.from(".footer__word .ch", {
        yPercent: 100,
        stagger: 0.05,
        ease: "expo.out",
        duration: 1.2,
        scrollTrigger: { trigger: ".footer__word", start: "top 95%" },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="cta" id="pedir">
        <p className="eyebrow" style={{ color: "var(--gold)" }}>
          Batido nutricional 100% vegetal · 33 g
        </p>
        <h2 className="display" style={{ marginTop: 16 }}>
          Entra en <span className="outline">órbita</span>
        </h2>

        <div className="cta__product">
          <div className="hero__disc" />
          <Emblem className="hero__orbit" ring sevens={false} />
          <div className="hero__sachet">
            <img src="/img/sachet.png" alt="Sachet Sathelix" loading="lazy" />
          </div>
        </div>

        <div className="cta__actions">
          <a className="btn" href="#">
            Pedir por WhatsApp
          </a>
          <a className="btn btn--ghost" href="#">
            Puntos de venta
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__cols">
          <div>
            <Emblem ring className="footer__emblem" />
            <p style={{ marginTop: 18, maxWidth: 320, lineHeight: 1.5, color: "rgb(247 243 230 / .7)" }}>
              La sabiduría ancestral de la India y la armonía de la naturaleza, reinterpretadas para una nueva generación
              de nutrición consciente.
            </p>
          </div>
          <div>
            <h4>Explora</h4>
            <ul>
              <li><a href="#orbita">Ingredientes</a></li>
              <li><a href="#nombre">La marca</a></li>
              <li><a href="#ritual">Ritual</a></li>
              <li><a href="#manifiesto">Manifiesto</a></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li><a href="#">WhatsApp</a></li>
              <li><a href="#">Distribuidores</a></li>
              <li><a href="#">hola@sathelix.com</a></li>
            </ul>
          </div>
          <div>
            <h4>Síguenos</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>
          </div>
        </div>

        <p className="footer__word display outline-gold" aria-hidden="true" style={{ overflow: "hidden" }}>
          {"Sathelix".split("").map((c, i) => (
            <span key={i} className="ch" style={{ display: "inline-block" }}>
              {c}
            </span>
          ))}
        </p>

        <div className="footer__legal">
          <span>© 2026 Sathelix® · Inspiración Ayurveda</span>
          <span>Seven elements. One perfect orbit.</span>
        </div>
      </footer>
    </div>
  );
}
