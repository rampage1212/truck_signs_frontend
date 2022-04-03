import Head from "next/head";
import Image from "next/image";
import style from "../styles/Home.module.css";
import NextNavbar from "../components/Navbar";
import HowToComponent from "../components/HowToComponent";

export default function HowTo() {
  return (
    <div className={style.container}>
      <Head>
        <title lang="en-us">How To Apply Truck Signs Adhesive Vinyls</title>
        <meta
          property="og:title"
          content="How To Apply Truck Signs Adhesive Vinyls"
        />
        <meta
          property="og:description"
          content="This is the how-to page to give a guidance of how to apply the adhesive vinyls."
        />
        <meta
          property="og:url"
          content="https://www.signsfortrucks.com/how-to/"
        />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="This is the how-to page to give a guidance of how to apply the adhesive vinyls."
        />
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="canonical"
          href="https://www.signsfortrucks.com/how-to/"
        />
      </Head>

      <main>
        <HowToComponent />
      </main>
    </div>
  );
}
