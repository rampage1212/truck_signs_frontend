import Link from "next/link";
import Image from "next/image";
import styles from "../styles/PricesGrid.module.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Button,
  Col,
  Row,
  ControlLabel,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";

const domain = "https://truck-signs-api.herokuapp.com/";

const PricesGrid = () => {
  const [products, setProducts] = useState(null);

  useEffect(async () => {
    await getProducts(setProducts);
  }, []);

  return products == null ? (
    <div></div>
  ) : (
    <Container className={styles.productGridContainer}>
      <Row className={styles.row}>
        {products.map((prod, index) => {
          return (
            <Col
              key={index}
              xs={12}
              sm={12}
              md={6}
              lg={6}
              className={styles.productCol}
            >
                <Link href={`/product/${prod.sample_product_id}/`}>
              <div className={styles.productWrapper}>
                <img src={prod.image} className={styles.productImage}></img>
                <div className={styles.crimsonSpanContainer}>
                  <span className={styles.crimsonSpan}>{prod.title}</span>
                  <span className={styles.crimsonSpanPrice}>${parseFloat(prod.base_price).toFixed(2)}</span>
                </div>
                <p className={styles.p}>{prod.width}'' x {prod.height}''</p>
              </div>
                </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default PricesGrid;

const getProducts = (setProducts) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const products_url = domain + "truck-signs/categories/";
  axios
    .get(products_url, config)
    .then(async (res) => {
      const result = await res.data;
      setProducts(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
