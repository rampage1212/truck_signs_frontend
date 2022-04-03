import Head from "next/head";
import Image from "next/image";
import style from "../styles/Home.module.css";
import NextNavbar from "../components/Navbar";
import HomePage from "../components/HomePage";
import { Container } from "react-bootstrap";


export default function Home() {
  return (
    <div className={style.container}>
      <Head>
        <title lang="en-us">Truck Signs Adhesive Vinyls</title>
        <meta
          name="description"
          content="A website to buy customizable truck signs adhesive vinyls that can contain the company name, origin, DOT
              number, VIN, MC, or KYU numbers as well."
        />
        <meta property="og:title" content="Truck Signs Adhesive Vinyls" />
        <meta
          property="og:description"
          content="A website to buy customizable truck signs adhesive vinyls that can contain the company name, origin, DOT
          number, VIN, MC, or KYU numbers as well."
        />
        <meta
          property="og:url"
          content="https://www.signsfortrucks.com/"
        />
        <meta property="og:type" content="website" />

        <link rel="icon" href="/favicon.png" />
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

        <link
          rel="canonical"
          href="https://www.signsfortrucks.com/"
        />
      </Head>

      <main className={style.main}>
        <HomePage />
      </main>
    </div>
  );
}
