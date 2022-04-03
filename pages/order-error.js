import Head from "next/head";
import Image from "next/image";
import style from "../styles/Home.module.css";
import NextNavbar from "../components/Navbar";
import OrderErrorMessageComponent from "../components/OrderErrorMessageComponent";

export default function OrderError() {
  return (
    <div className={style.container}>
      <Head>
        <title lang="en-us">Truck Signs Adhesive Vinyls Error at payment</title>
        <meta
          name="description"
          content="This page is shown because an error in payment was produced."
        />
        <meta
          property="og:title"
          content="Truck Signs Adhesive Vinyls Error at payment"
        />
        <meta
          property="og:description"
          content="This page is shown because an error in payment was produced."
        />
        <meta
          property="og:url"
          content="https://www.signsfortrucks.com/order-error/"
        />
        <meta property="og:type" content="website" />

        <link rel="icon" href="/favicon.ico" />

        <link
          rel="canonical"
          href="https://www.signsfortrucks.com/order-error/"
        />
      </Head>

      <main>
        <OrderErrorMessageComponent />
      </main>
    </div>
  );
}
