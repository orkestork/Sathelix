export type Ingredient = {
  slug: string;
  name: string;
  en: string;
  note: string;
  benefit: string;
  tint: string;
};

// Orden del empaque: avena, chía, linaza, quinoa, cacao, canela y marañón.
export const INGREDIENTS: Ingredient[] = [
  {
    slug: "avena",
    name: "Avena",
    en: "Oats",
    note: "Energía que dura",
    benefit: "Carbohidrato complejo y fibra soluble que liberan energía de forma gradual a lo largo de la mañana.",
    tint: "#DFCBB3",
  },
  {
    slug: "chia",
    name: "Chía",
    en: "Chia",
    note: "Omega vegetal",
    benefit: "Pequeña semilla ancestral, fuente vegetal de omega-3 y fibra que aporta saciedad.",
    tint: "#A7B5BE",
  },
  {
    slug: "linaza",
    name: "Linaza",
    en: "Flaxseed",
    note: "Ritmo digestivo",
    benefit: "Fibra y lignanos que acompañan una digestión ligera y un tránsito en equilibrio.",
    tint: "#8B5E3C",
  },
  {
    slug: "quinoa",
    name: "Quinoa",
    en: "Quinoa",
    note: "Proteína andina",
    benefit: "Grano andino con proteína vegetal y todos los aminoácidos esenciales.",
    tint: "#E8D9A8",
  },
  {
    slug: "cacao",
    name: "Cacao",
    en: "Cacao",
    note: "Placer consciente",
    benefit: "Flavonoides antioxidantes y un sabor profundo que convierte la nutrición en ritual.",
    tint: "#6B4430",
  },
  {
    slug: "canela",
    name: "Canela",
    en: "Cinnamon",
    note: "Calidez ayurveda",
    benefit: "Especia cálida de la tradición ayurvédica, aroma que equilibra y redondea la fórmula.",
    tint: "#D97706",
  },
  {
    slug: "maranon",
    name: "Marañón",
    en: "Cashew",
    note: "Cremosidad natural",
    benefit: "Grasas buenas y magnesio que aportan una textura cremosa sin lácteos.",
    tint: "#F2E6CF",
  },
];

export const PROMISES = [
  {
    title: "100% vegetal",
    icon: "leaf",
    text: "Siete ingredientes de origen vegetal y nada más. Lo que ves en la órbita es lo que va en tu vaso.",
  },
  {
    title: "Sin azúcares añadidos",
    icon: "drop",
    text: "El dulzor viene del cacao, la canela y el marañón. Nada de jarabes ni atajos de laboratorio.",
  },
  {
    title: "Sin conservantes",
    icon: "flask",
    text: "Sin aditivos artificiales ni nombres que parezcan una fórmula química. Solo comida real, en polvo.",
  },
  {
    title: "Libre de grasas trans",
    icon: "heart",
    text: "Las grasas que hay son las que la naturaleza puso en la chía, la linaza y el marañón.",
  },
  {
    title: "Bajo en sodio",
    icon: "salt",
    text: "Nutrición completa y equilibrada que cuida tu ritmo, porción tras porción.",
  },
] as const;

// Valores tomados del empaque (por 100 g / por porción de 33 g). Validar con ficha técnica final.
export const NUTRITION = [
  { label: "Energía (kcal)", per100: "384", perServing: "127" },
  { label: "Proteínas (g)", per100: "18,0", perServing: "5,9" },
  { label: "Grasas totales (g)", per100: "8,2", perServing: "2,7" },
  { label: "Grasas saturadas (g)", per100: "1,4", perServing: "0,5", sub: true },
  { label: "Carbohidratos (g)", per100: "54,7", perServing: "18,1" },
  { label: "Azúcares totales (g)", per100: "4,8", perServing: "1,6", sub: true },
  { label: "Fibra dietaria (g)", per100: "10,1", perServing: "3,3" },
  { label: "Sodio (mg)", per100: "120", perServing: "40" },
];

export const NAME_PARTS = [
  {
    word: "SAT",
    tag: "Satélite",
    text: "Órbita, movimiento, conexión y continuidad. Todo gira alrededor de un centro.",
  },
  {
    word: "सत्",
    tag: "Sánscrito",
    text: "Sat: verdad, existencia y autenticidad. Nutrición sin máscaras.",
  },
  {
    word: "7",
    tag: "Siete",
    text: "Siete ingredientes vegetales y una geometría común que los une.",
  },
  {
    word: "HELIX",
    tag: "Hélice",
    text: "Espiral, evolución y los ciclos que sostienen la vida.",
  },
];
