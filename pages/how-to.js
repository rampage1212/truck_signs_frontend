import Head from "next/head";
import Image from "next/image";
import style from "../styles/Home.module.css";
import NextNavbar from "../components/Navbar";
import HowToComponent from "../components/HowToComponent";

export default function HowTo() {
  return (
    <div className={style.container}>
      <Head>
        <title lang="en-us">How To Truck Signs</title>
        <meta
          name="description"
          content="This is the how-to page to give a guidance of how to apply the adhesive vinyls."
        />
        <link rel="icon" href="/favicon.ico" />

        <link rel="canonical" href="https://truck-signs-frontend-nextjs.vercel.app/how-to/" />

      </Head>

      <main>
        <HowToComponent />
      </main>
    </div>
  );
}
