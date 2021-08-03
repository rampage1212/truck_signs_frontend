import Head from "next/head";
import Image from "next/image";
import style from "../styles/Home.module.css";
import NextNavbar from "../components/Navbar";
import OrderMadeMessageComponent from "../components/OrderMadeMessageComponent";

export default function OrderMade() {
  return (
    <div className={style.container}>
      <Head>
        <title>Truck Sign ordered</title>
        <meta
          name="description"
          content="This page is shown because in payment was produced successfully."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <OrderMadeMessageComponent />
      </main>
    </div>
  );
}
