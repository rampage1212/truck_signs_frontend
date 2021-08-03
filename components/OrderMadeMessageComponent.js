import Link from "next/link";
import Image from "next/image";
import styles from "../styles/OrderMadeMessageComponent.module.css";
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
  Card,
  Alert,
} from "react-bootstrap";
import LogoGrid from "./LogoGrid";
import { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";

const domain = "http://127.0.0.1:8000/";

const OrderMadeMessageComponent = ({ order }) => {
  useEffect(async () => {}, []);

  return (
    <>
      <div className={styles.emailCheckBox}>
        <p className={styles.p}>
          Check your email for the details of your purchase or go to the{" "}
          <Link href="/">
            <a className={styles.a}>Home page</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default OrderMadeMessageComponent;
