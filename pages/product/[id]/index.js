import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import router from "next/router";
import { useRouter } from "next/router";
import ProductVariationComponent from "../../../components/ProductVariationComponent";
import { useProduct } from "../../../context/ProductContext";

const domain = process.env.NEXT_PUBLIC_API_DOMAIN_NAME;

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const {fetchProductByID } = useProduct();

  useEffect(() => {
    if(id != null && id != undefined){
      fetchProductByID(id);
    }
  }, [])

  useEffect(() => {
    if(id != null && id != undefined){
    fetchProductByID(id);
    }
  },[id])


  // NOTE Components
  return id == undefined || id == null ? (
    <div></div>
  ) : (
    <div className={styles.container}>
      <Head>
        <title lang="en-us">Truck Signs Adhesive Vinyl Product</title>
        <meta
          name="description"
          content="In here the adhesive vinal can be customized."
        />
         <meta
          property="og:title"
          content="Truck Signs Adhesive Vinyl Product"
        />
        <meta
          property="og:description"
          content="In here the adhesive vinal can be customized."
        />
        <meta
          property="og:url"
          content={`https://www.signsfortrucks.com/product/${id}/`}
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="canonical"
          href={`https://www.signsfortrucks.com/product/${id}/`}
        />
      </Head>

      <main className={styles.main}>
        <ProductVariationComponent />
      </main>
    </div>
  );
}

