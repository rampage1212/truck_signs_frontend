import Head from "next/head";
import Image from "next/image";
import style from "../styles/Home.module.css";
import NextNavbar from "../components/Navbar";
import OrderMadeMessageComponent from "../components/OrderMadeMessageComponent";

export default function OrderMade() {
  return (
    <div className={style.container}>
      <Head>
        <title lang="en-us">Truck Sign Adhesive Vinyl ordered</title>
        <meta
          name="description"
          content="This page is shown because in payment was produced successfully."
        />
        <meta
          property="og:title"
          content="Truck Sign Adhesive Vinyl ordered"
        />
        <meta
          property="og:description"
          content="This page is shown because in payment was produced successfully."
        />
        <meta
          property="og:url"
          content="https://www.signsfortrucks.com/order-made/"
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="canonical" href="hhttps://www.signsfortrucks.com/order-made/" />

      </Head>

      <main>
        <OrderMadeMessageComponent />
      </main>
    </div>
  );
}
