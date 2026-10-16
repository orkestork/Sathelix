// Iconos de línea en el estilo del empaque (trazo crema, tachado diagonal opcional)
type P = { name: string };

const paths: Record<string, React.ReactNode> = {
  leaf: (
    <>
      <path d="M8 34C8 18 20 8 36 6c0 16-9 28-24 28" />
      <path d="M8 34 24 18" />
    </>
  ),
  drop: (
    <>
      <path d="M20 6s-10 12-10 19a10 10 0 0 0 20 0C30 18 20 6 20 6Z" />
      <path d="M6 34 34 6" />
    </>
  ),
  flask: (
    <>
      <path d="M15 6h10M17 6v10L8 32a2 2 0 0 0 2 3h20a2 2 0 0 0 2-3l-9-16V6" />
      <path d="M6 34 34 6" />
    </>
  ),
  heart: (
    <>
      <path d="M20 33S6 24 6 15a7 7 0 0 1 14-2 7 7 0 0 1 14 2c0 9-14 18-14 18Z" />
      <path d="M13 20h5l2-4 3 8 2-4h3" />
    </>
  ),
  salt: (
    <>
      <path d="M13 14h14l-2 20H15Z" />
      <path d="M14 14c0-5 3-8 6-8s6 3 6 8" />
      <circle cx="18" cy="10" r=".8" />
      <circle cx="22" cy="10" r=".8" />
      <path d="M6 34 34 6" />
    </>
  ),
};

export default function Icon({ name }: P) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
