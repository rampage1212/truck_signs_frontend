import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Footer.module.css";
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

const Footer = () => {

  return (
    <footer className={styles.footer}>
      <Row>
        <Col xs={12} md={6} lg={4} className={styles.footerColCenter}>
          <p>This is the footer</p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;