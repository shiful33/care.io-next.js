import Image from "next/image";
import Banner from "../components/home/Banner";
import CardService from "../components/home/CareService";

export default function Home() {
  return (
    <div>
      <section>
        <Banner />
      </section>

      <section>
        <CardService />
      </section>
    </div>
  );
}
