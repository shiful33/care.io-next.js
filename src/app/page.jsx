import Image from "next/image";
import Banner from "../components/home/Banner";
import CardService from "../components/home/CareService";
import WhyChooseUs from "../components/home/WhyChooseUs";
import StatsSection from "../components/home/StatsSection";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import Contact from "../components/home/Contact";
import NewsLetter from "../components/home/NewsLetter";

export default function Home() {
  return (
    <main>
      <section>
        <Banner />
      </section>

      <section>
        <CardService />
      </section>
        
      <section>
        <WhyChooseUs />
      </section>

      <section>
        <StatsSection />
      </section>

      <section>
        <Testimonials />
      </section>

      <section>
        <FAQ />
      </section>

      <section>
        <Contact />
      </section>

      <section>
        <NewsLetter />
      </section>
    </main>
  );
}
