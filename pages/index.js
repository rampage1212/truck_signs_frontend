import Head from "next/head";
import Image from "next/image";
import style from "../styles/Home.module.css";
import NextNavbar from "../components/Navbar";
import HomePage from "../components/HomePage";

export default function Home() {
  return (
    <div className={style.container}>
      <Head>
        <title>Truck Signs</title>
        <meta
          name="description"
          content="A website to buy customizable truck signs which are adhesive vinyls that can contain the company name, origin, DOT
              number, VIN, MC, or KYU numbers as well."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/Athena/Athena.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Bench Nine/BenchNine-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Bench Nine/BenchNine-Light.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Bench Nine/BenchNine-Bold.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Acumin/Acumin.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>

      <main className={style.main}>
        <HomePage />
      </main>
    </div>
  );
}
