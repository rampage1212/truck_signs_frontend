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

const domain = "http://127.0.0.1:8000/";

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
              className={styles.logoCol}
            >
              <img src={prod.image} className={styles.productImage}></img>
              <Link href={`/product/${prod.id}/`}>
                <Button size="sm" className={styles.orderProductButton}>
                  ORDER NOW
                </Button>
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

  const products_url = domain + "truck-signs/products/";
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
