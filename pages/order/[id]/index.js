import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductDetailComponent from "../../../components/ProductDetailComponent";
import router from "next/router";
import { useRouter } from "next/router";
import PaymentForm from "../../../components/PaymentForm";

const domain = "http://127.0.0.1:8000/";

export default function OrderDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);

  // NOTE Init
  useEffect(async () => {
    // LINK product variation details

    var order_id = null;
    if (id != undefined && id != null) {
      window.localStorage.setItem("order_id", id);
      order_id = id;
    } else {
      order_id = window.localStorage.getItem("order_id");
    }

    await getOrder(order_id, setOrder);
  }, []);

  // NOTE Components
  return order == undefined || order == null ? (
    <div></div>
  ) : (
    <div className={styles.container}>
      <Head>
        <title>Truck Signs Order</title>
        <meta name="description" content="Here is the order of the truck sign." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PaymentForm order={order} />
      </main>
    </div>
  );
}

// NOTE Helpers

const getOrder = async (id, setOrder) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const order_url = domain + `truck-signs/order/${id}/retrieve/`;
  axios
    .get(order_url, config)
    .then(async (res) => {
      const product = await res.data;
      setOrder(product);
    })
    .catch((error) => {
      console.log(error);
    });
};
