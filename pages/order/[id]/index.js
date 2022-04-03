import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import router from "next/router";
import { useRouter } from "next/router";
import PaymentForm from "../../../components/PaymentForm";

const domain = process.env.NEXT_PUBLIC_API_DOMAIN_NAME;

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
        <title lang="en-us">Truck Signs Adhesive Vinyl Order</title>
        <meta
          name="description"
          content="Here is the order of the truck sign."
        />
        <meta
          property="og:title"
          content="Truck Signs Adhesive Vinyl Order"
        />
        <meta
          property="og:description"
          content="Here is the order of the truck sign."
        />
        <meta
          property="og:url"
          content={`https://www.signsfortrucks.com/order/${order.id}/`}
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="canonical"
          href={`https://www.signsfortrucks.com/order/${order.id}/`}
        />
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
