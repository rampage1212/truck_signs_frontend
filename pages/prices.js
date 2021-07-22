import Head from "next/head";
import Image from "next/image";
import style from "../styles/Home.module.css";
import NextNavbar from "../components/Navbar";
import PricesGrid from "../components/PricesGrid";

export default function Home() {
  return (
    <div className={style.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PricesGrid />
      </main>
    </div>
  );
}
