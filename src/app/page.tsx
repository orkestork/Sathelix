import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import Promises from "@/components/Promises";
import Orbit from "@/components/Orbit";
import NameStory from "@/components/NameStory";
import Ritual from "@/components/Ritual";
import Manifesto from "@/components/Manifesto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee items={["100% vegetal", "Inspiración ayurveda", "7 ingredientes", "Natural energy", "Total nutrition"]} />
        <Marquee
          variant="olive"
          items={["Avena", "Chía", "Linaza", "Quinoa", "Cacao", "Canela", "Marañón"]}
        />
        <Statement />
        <Promises />
        <Orbit />
        <NameStory />
        <Ritual />
        <Manifesto />
      </main>
      <Footer />
    </>
  );
}
