import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Layout from "../components/Layout";
import { ProductProvider } from "../context/ProductContext";

function MyApp({ Component, pageProps }) {
  return (
    <ProductProvider>
      <Layout>
        <Head>
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ProductProvider>
  );
}

export default MyApp;
