import Head from "next/head";
import Image from "next/image";
import style from "../styles/Home.module.css";
import NextNavbar from "../components/Navbar";
import PricesGrid from "../components/PricesGrid";

export default function Home() {
  return (
    <div className={style.container}>
      <Head>
        <title lang="en-us">Prices at Truck Signs Website</title>
        <meta
          name="description"
          content="Prices of all products to buy at Truck Signs website."
        />
        <link rel="icon" href="/favicon.ico" />

        <link rel="canonical" href="https://truck-signs-frontend-nextjs.vercel.app/prices/" />

      </Head>

      <main>
        <PricesGrid />
      </main>
    </div>
  );
}
