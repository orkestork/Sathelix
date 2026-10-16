import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Inter_Tight, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const sans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sathelix — Seven elements. One perfect orbit.",
  description:
    "Batido nutricional 100% vegetal de inspiración ayurveda: avena, chía, linaza, quinoa, cacao, canela y marañón en una sola órbita. Natural energy. Total nutrition.",
};

export const viewport: Viewport = {
  themeColor: "#0d110a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable} ${serif.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
