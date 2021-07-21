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


const ProductDetailComponent = ({product}) => {


  useEffect(async () => {
  }, []);

  return product == null ? (
    <div></div>
  ) : (
    <Container className={styles.logoGridContainer}>
      {product.title}
    </Container>
  );
};

export default ProductDetailComponent;
