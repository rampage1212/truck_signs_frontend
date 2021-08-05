import Link from "next/link";
import Image from "next/image";
import styles from "../styles/PaymentForm.module.css";
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

const domain = process.env.NEXT_PUBLIC_API_DOMAIN_NAME;

const PaymentForm = ({ order }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [card_num, setCardNum] = useState("");
  const [exp_month, setExpMonth] = useState("");
  const [exp_year, setExpYear] = useState("");
  const [cvc, setCvc] = useState("");

  useEffect(async () => {}, []);

  const body = JSON.stringify({
    order: {
      user_first_name: first_name,
      user_last_name: last_name,
      address1,
      address2,
    },
    card_num,
    exp_month,
    exp_year,
    cvc,
  });

  const makePaymentHandler = async () => {
    await makePayment(body, order.id);
  };

  return order == null ? (
    <div></div>
  ) : (
    <Container className={styles.orderDetailContainer}>
      <Form className={styles.form}>
        <Row>
          <Col className={styles.col} xs={6}>
            <InputGroup className={styles.formGroupLeftCol}>
              {/* <Form.Label className={styles.formLabel}>First Name</Form.Label> */}
              <FormControl
                className={styles.formControl}
                autoFocus
                placeholder="First Name"
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              ></FormControl>
            </InputGroup>
          </Col>

          <Col xs={6}>
            <InputGroup className={styles.formGroupRightCol}>
              {/* <Form.Label className={styles.formLabel}>Address (Optional)</Form.Label> */}
              <FormControl
                className={styles.formControl}
                autoFocus
                placeholder="Last Name"
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              ></FormControl>
            </InputGroup>
          </Col>
        </Row>

        <InputGroup className={styles.formGroup}>
          {/* <Form.Label className={styles.formLabel}>Address</Form.Label> */}
          <FormControl
            className={styles.formControl}
            autoFocus
            placeholder="Address line 1"
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          ></FormControl>
        </InputGroup>

        <InputGroup className={styles.formGroup}>
          {/* <Form.Label className={styles.formLabel}>Address (Optional)</Form.Label> */}
          <FormControl
            className={styles.formControl}
            autoFocus
            placeholder="Address line 2 (optional)"
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          ></FormControl>
        </InputGroup>

        <InputGroup className={styles.cardFormGroup}>
          {/* <Form.Label className={styles.formLabel}>Address (Optional)</Form.Label> */}
          <FormControl
            className={styles.formControl}
            autoFocus
            placeholder="Card Number"
            type="text"
            value={card_num}
            onChange={(e) => setCardNum(e.target.value)}
          ></FormControl>
        </InputGroup>

        <Row>
          <Col className={styles.col} xs={6}>
            <InputGroup className={styles.formGroupLeftCol}>
              {/* <Form.Label className={styles.formLabel}>First Name</Form.Label> */}
              <FormControl
                className={styles.formControl}
                autoFocus
                placeholder="Exp Month"
                type="text"
                value={exp_month}
                onChange={(e) => setExpMonth(e.target.value)}
              ></FormControl>
            </InputGroup>
          </Col>

          <Col xs={6}>
            <InputGroup className={styles.formGroupRightCol}>
              {/* <Form.Label className={styles.formLabel}>Address (Optional)</Form.Label> */}
              <FormControl
                className={styles.formControl}
                autoFocus
                placeholder="Exp Year"
                type="text"
                value={exp_year}
                onChange={(e) => setExpYear(e.target.value)}
              ></FormControl>
            </InputGroup>
          </Col>
        </Row>

        <InputGroup className={styles.formGroup}>
          {/* <Form.Label className={styles.formLabel}>Address (Optional)</Form.Label> */}
          <FormControl
            className={styles.formControl}
            autoFocus
            placeholder="CVC"
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
          ></FormControl>
        </InputGroup>

        <div>
          <p className={styles.priceP}>
            <span className={styles.crimsonSpan}>Total amount:</span> $
            {parseFloat(order.product.total_price).toFixed(2)}
          </p>
        </div>

        <div className={styles.orderNowButtonDiv}>
          <Button
            onClick={(e) => makePaymentHandler()}
            className={styles.orderNowButton}
          >
            MAKE ORDER
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default PaymentForm;

const makePayment = (body, order_id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const make_payment_url = domain + `truck-signs/order-payment/${order_id}/`;
  axios
    .post(make_payment_url, body, config)
    .then(async (res) => {
      const result = await res.data;
      if(result["Result"] == "Success"){
        router.push('/order-made')
      }
    })
    .catch((error) => {
      console.log(error);
      router.push('/order-error')
    });
};
