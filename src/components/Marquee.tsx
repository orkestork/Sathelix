import Emblem from "./Emblem";

type Props = { items: string[]; variant?: "gold" | "olive" };

export default function Marquee({ items, variant = "gold" }: Props) {
  const row = (
    <div className="marquee__item">
      {items.map((t) => (
        <span key={t} style={{ display: "contents" }}>
          <span>{t}</span>
          <Emblem mono />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${variant === "olive" ? "marquee--olive" : ""}`} aria-hidden="true">
      <div className="marquee__track">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
