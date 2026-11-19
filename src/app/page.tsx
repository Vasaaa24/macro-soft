import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Offer } from "@/components/sections/Offer";
import { Partners } from "@/components/sections/Partners";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main id="obsah" tabIndex={-1} className="outline-none">
        <Hero />
        <Offer />
        <Services />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
