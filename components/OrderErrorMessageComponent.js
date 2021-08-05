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

const domain = process.env.NEXT_PUBLIC_API_DOMAIN_NAME;

const OrderErrorMessageComponent = ({ order }) => {
  useEffect(async () => {}, []);

  return (
    <>
      <div className={styles.emailCheckBox}>
        <p className={styles.p}>
          Something went wrong during the payment. Please check your email for
          more details or go to the{" "}
            <a href='/' className={styles.a}>Home page</a> and try again.
        </p>
      </div>
    </>
  );
};

export default OrderErrorMessageComponent;
