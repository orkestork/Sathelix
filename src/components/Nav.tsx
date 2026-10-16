"use client";

import { useEffect, useState } from "react";
import Emblem from "./Emblem";

const LINKS = [
  { href: "#orbita", label: "Ingredientes" },
  { href: "#nombre", label: "La marca" },
  { href: "#ritual", label: "Ritual" },
  { href: "#manifiesto", label: "Manifiesto" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
        <a href="#top" className="nav__brand" aria-label="Sathelix, inicio" onClick={() => setOpen(false)}>
          <Emblem ring />
          <span className="nav__word">Sathelix</span>
        </a>
        <div className="nav__actions">
          <a href="#pedir" className="btn" onClick={() => setOpen(false)}>
            Pedir ahora
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <Emblem className="menu__emblem" mono />
        <p className="eyebrow" style={{ color: "var(--night)", marginBottom: 20 }}>
          Seven elements · One perfect orbit
        </p>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="menu__link display" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
    </>
  );
}
