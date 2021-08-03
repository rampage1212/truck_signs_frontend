import Link from "next/link";
import Image from "next/image";
import styles from "../styles/LogoGrid.module.css";
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

const LogoGrid = () => {
  const [logos, setLogos] = useState(null);

  useEffect(async () => {
     getLogos(setLogos);
  }, []);

  return logos == null ? (
    <div></div>
  ) : (
    <Container className={styles.logoGridContainer}>
      <Row className={styles.row}>
        {logos.map((log, index) => {
          return (
            <Col
              key={index}
              xs={12}
              sm={12}
              md={6}
              lg={3}
              className={styles.logoCol}
            >
              <img src={log.image} className={styles.logoImage}></img>
              <Link href={`/product/${log.id}/`}>
                <Button size="sm" className={styles.orderLogoButton}>
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

export default LogoGrid;

const getLogos = (setLogos) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const logos_url = domain + "truck-signs/truck-logo-list/";
  axios
    .get(logos_url, config)
    .then(async (res) => {
      const result = await res.data;
      setLogos(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
