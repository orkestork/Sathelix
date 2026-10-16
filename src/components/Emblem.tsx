import { useId } from "react";

type Props = {
  className?: string;
  /** muestra el anillo de puntos y la circunferencia exterior */
  ring?: boolean;
  /** monocromo (usa currentColor) para iconos pequeños */
  mono?: boolean;
  /** dibuja los siete sietes (false = solo anillo) */
  sevens?: boolean;
};

// Un "7": barra superior + diagonal. Se repite 7 veces alrededor del eje.
const SEVEN = "M-16 -74 L22 -74 L2 -30";

/** Emblema orbital de Sathelix: siete sietes girando alrededor de un centro. */
export default function Emblem({ className, ring = false, mono = false, sevens = true }: Props) {
  const id = useId().replace(/:/g, "");
  const gold = `g-${id}`;
  const olive = `o-${id}`;

  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true">
      {!mono && (
        <defs>
          <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F1DDA8" />
            <stop offset="1" stopColor="#B88F4E" />
          </linearGradient>
          <linearGradient id={olive} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B9CC7A" />
            <stop offset="1" stopColor="#5E7531" />
          </linearGradient>
        </defs>
      )}

      {ring && (
        <g className="emblem-ring" fill={mono ? "currentColor" : "#C9A96B"}>
          <circle r="94" fill="none" stroke={mono ? "currentColor" : "#C9A96B"} strokeOpacity=".35" strokeWidth=".6" />
          {Array.from({ length: 49 }, (_, i) => {
            const a = (i / 49) * Math.PI * 2;
            const big = i % 7 === 0;
            return <circle key={i} cx={(Math.cos(a) * 86).toFixed(2)} cy={(Math.sin(a) * 86).toFixed(2)} r={big ? 2.2 : 0.9} opacity={big ? 1 : 0.6} />;
          })}
        </g>
      )}

      {sevens && (
        <g className="emblem-sevens">
          {Array.from({ length: 7 }, (_, i) => (
            <path
              key={i}
              className="emblem-seven"
              d={SEVEN}
              transform={`rotate(${(360 / 7) * i})`}
              fill="none"
              stroke={mono ? "currentColor" : `url(#${i % 2 === 0 ? olive : gold})`}
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>
      )}
      {sevens && <circle r="5" fill={mono ? "currentColor" : "#C9A96B"} />}
    </svg>
  );
}
