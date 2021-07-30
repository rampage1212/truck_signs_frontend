import Link from "next/link";
import Image from "next/image";
import styles from "../styles/ProductDetailComponent.module.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Form,
  Select,
  FormControl,
  FormGroup,
  InputGroup,
  Button,
  Col,
  Row,
  ControlLabel,
  Dropdown,
  FormLabel,
  ListGroup,
  Icon,
  DropdownButton,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";
import { faTimes, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const domain = "https://truck-signs-api.herokuapp.com/";

const ProductDetailComponent = ({ product, variations }) => {
  const [colors, setColors] = useState(null);
  const [color, setColor] = useState(null);
  const [custom_vars, setCustomVars] = useState(null);
  const [dummy_var, setDummyVar] = useState(null);
  const [lettering_variation_category_id, setLetteringCategoryId] =
    useState(null);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [amount, setAmount] = useState(1);

  useEffect(async () => {
    getColors(setColors);
    setColor(product.product_color_default);
    setAmount(1);

    const var_id = window.localStorage.getItem("product_variation_id");
    const product_id = window.localStorage.getItem(
      "latest_customized_product_id"
    );
    if (
      var_id != undefined &&
      var_id != null &&
      product_id != undefined &&
      product_id != null
    ) {
      try {
        if (product.id == product_id) {
          getCustomVars(var_id, setCustomVars);
        }
      } catch {}
    }
  }, []);

  const addLineHandler = async (e) => {
    await addLine(product.id, dummy_var, lettering_variation_category_id);
  };

  const deleteLetteringVariationHandler = async (lettering_id) => {
    await deleteLetteringVariation(lettering_id);
  };

  const createOrderHandler = async () => {
    const color_id = color == null ? -1 : color.id;
    await createOrder(color_id, amount, email, comment);
  };

  return product == null || colors == null ? (
    <div></div>
  ) : (
    <Container className={styles.productGrid}>
      <Row className={styles.productRow}>
        <Col className={styles.productImageCol} xs={12} sm={12} md={6} lg={6}>
          <div className={styles.productImageColWrapper}>
            <div className={styles.productImageDiv}>
              <img
                className={styles.productImage}
                src={product.detail_image}
              ></img>
            </div>
            <p className={styles.vinylInfo}>
              Signs are easy to apply, die-cut from a durable 24 inch by 14
              inch, 9 year, outdoor adhesive vinyl. Company name, origin, DOT
              number, VIN, MC, or KYU numbers comes on one, ready to apply
              sheet. The color you choose is the color of the lettering. There
              is no clear background as these are die-cut lettering that is
              pre-spaced and ready to apply. The decal will meet USDOT
              regulations for compliance.
            </p>
            <p className={styles.vinylInfo}>
              For hightest visibility we recommend use contrast colors, sign
              with background. All products are made and produced in the USA. If
              you have any questions prior to purchasing, please contact us.
            </p>
          </div>
        </Col>
        <Col className={styles.productInfoCol} xs={12} sm={12} md={6} lg={6}>
          <Form>
            {color == null ? (
              <div></div>
            ) : (
              <div className={styles.productDiv}>
                <FormGroup>
                  <div className={styles.colorFormWrapper}>
                    <div
                      className={styles.colorBox}
                      style={{ backgroundColor: color.color_in_hex }}
                    ></div>
                    <div className={styles.dropdownDiv}>
                      <Dropdown className={`span3 ${styles.colorDropdown}`}>
                        <Dropdown.Toggle
                          variant="outline-primary"
                          id="dropdown-basic"
                          className={styles.dropdownColorToggle}
                          drop="end"
                        >
                          Color
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.dropdownMenu}>
                          {colors.map((col, index) => {
                            const color_in_hex = col.color_in_hex;
                            return (
                              <Dropdown.Item
                                className={styles.dropdownItemColor}
                                style={{
                                  backgroundColor: color_in_hex,
                                  color: color_in_hex,
                                }}
                                key={index}
                                onSelect={(e) => {
                                  setColor(col);
                                }}
                              >
                                {"-"}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </FormGroup>
              </div>
            )}
            {custom_vars == null ? (
              <div></div>
            ) : (
              <>
                {custom_vars.map((cv, index) => {
                  return (
                    <div key={index} className={styles.productDiv}>
                      <ListGroup className={styles.colorFormWrapper}>
                        <div className={styles.deleteBox}>
                          <div
                            onClick={(e) =>
                              deleteLetteringVariationHandler(cv.id)
                            }
                            className={styles.xTimesIconBox}
                          >
                            <FontAwesomeIcon
                              className={styles.xTimesIcon}
                              size="2x"
                              icon={faTimes}
                            />
                          </div>
                        </div>
                        <ListGroup horizontal className={styles.listGroupItem}>
                          <ListGroup.Item className={styles.spanListGroupItem}>
                            <span className={styles.crimsonSpan}>
                              {cv.lettering_item_category.title}:
                            </span>{" "}
                          </ListGroup.Item>
                          <ListGroup.Item className={styles.pListGroupItem}>
                            <p className={styles.variationsP}>{cv.lettering}</p>
                          </ListGroup.Item>
                        </ListGroup>
                      </ListGroup>
                    </div>
                  );
                })}
              </>
            )}

            {custom_vars == null ||
            custom_vars.length <
              product.category.max_amount_of_lettering_items ? (
              <div className={styles.productDivAdd}>
                <InputGroup className={styles.inputGroup}>
                  <div className={styles.dummyDeleteBox}></div>
                  <select
                    className={`form-select ${styles.categoryDropdown}`}
                    aria-label="Default select example"
                    as="select"
                    onChange={(e) =>
                      setLetteringCategoryIdHandler(
                        e.target.value,
                        variations,
                        setLetteringCategoryId
                      )
                    }
                  >
                    <option value={-1} default>
                      Add Type
                    </option>
                    {variations != null ? (
                      variations.map((variation, index) => {
                        return (
                          <option
                            value={index}
                            key={index + 2}
                            className={styles.option}
                          >
                            {variation.title}
                          </option>
                        );
                      })
                    ) : (
                      <>
                        {" "}
                        <option>No categories</option>
                      </>
                    )}
                  </select>

                  <FormControl
                    type="search"
                    placeholder="Line of lettering ... "
                    className={`mr-2 ${styles.categoryAddLettering}`}
                    aria-label="Search"
                    onChange={(e) => setDummyVar(e.target.value)}
                  />
                  <Button
                    className={styles.searchButton}
                    onClick={(e) => {
                      addLineHandler(e);
                    }}
                  >
                    +
                  </Button>
                </InputGroup>
              </div>
            ) : (
              <div></div>
            )}

            <InputGroup className={`${styles.formGroupSpan} ${styles.amountFormControlExtra}`}>
              <div className={styles.dummyDeleteBox}></div>
              <InputGroup.Text className={styles.inputGroupText}>Amount</InputGroup.Text>
              <FormControl
                className={`${styles.formControl} ${styles.emailFormControl} ${styles.amountFormControl}`}
                autoFocus
                placeholder="Amount ..."
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              ></FormControl>
            </InputGroup>
          </Form>
          <Form className={styles.orderInfoForm}>
            <div className={styles.productDivAdd}>
              <InputGroup className={styles.formGroup}>
                <div className={styles.dummyDeleteBox}></div>
                <FormControl
                  className={`${styles.formControl} ${styles.commentFormControl}`}
                  autoFocus
                  as="textarea"
                  placeholder="Comments ..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></FormControl>
              </InputGroup>

              <InputGroup className={styles.formGroup}>
                {/* <Form.Label className={styles.formLabel}>Email</Form.Label> */}
                <div className={styles.dummyDeleteBox}></div>
                <FormControl
                  className={`${styles.formControl} ${styles.emailFormControl}`}
                  autoFocus
                  placeholder="Email ..."
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></FormControl>
              </InputGroup>
            </div>
            <div className={styles.orderNowButtonDiv}>
              <Button
                onClick={(e) => {
                  createOrderHandler();
                }}
                className={styles.orderNowButton}
              >
                ORDER NOW
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailComponent;

// NOTE helpers

// LINK
const getColors = (setColors) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const product_colors_url = domain + "truck-signs/product-color/";
  axios.get(product_colors_url, config).then(async (res) => {
    const result = await res.data;
    setColors(result);
  });
};

// LINK
const addLine = async (id, variation, lettering_variation_category_id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const product_variation_id = window.localStorage.getItem(
    "product_variation_id"
  );

  const body = JSON.stringify({
    product_id: id,
    product_variation_id,
    product_variation_lettering: { lettering: variation },
    lettering_item_category_id: lettering_variation_category_id,
  });

  const lettering_var_create_url =
    domain + "truck-signs/product-lettering/create/";
  axios
    .post(lettering_var_create_url, body, config)
    .then(async (res) => {
      const result = await res.data["Result"];
      window.localStorage.setItem("product_variation_id", result.id);
      window.localStorage.setItem("latest_customized_product_id", id);
      router.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

// LINK
const getCustomVars = (id, setCustomVars) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const product_custom_vars_url =
    domain + `truck-signs/product-variation-retrieve/${id}/`;
  axios
    .get(product_custom_vars_url, config)
    .then(async (res) => {
      const result = await res.data;
      setCustomVars(result.all_lettering_items);
    })
    .catch((error) => {
      console.log(error);
    });
};

// LINK
const setLetteringCategoryIdHandler = (
  value,
  variations,
  setLetteringCategoryId
) => {
  try {
    setLetteringCategoryId(variations[value].id);
  } catch {
    setLetteringCategoryId(-1);
  }
};

// LINK
const deleteLetteringVariation = async (lettering_var_id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const lettering_var_url =
    domain + `truck-signs/product-lettering/${lettering_var_id}/delete/`;
  axios
    .delete(lettering_var_url, config)
    .then(async (res) => {
      const result = await res.data;
      router.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

// LINK
const createOrder = async (product_color_id, amount, email, comment) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const new_amount = parseInt(amount)

  const id = window.localStorage.getItem("product_variation_id");

  const body = JSON.stringify({
    product_color_id,
    amount: new_amount,
    order: {
      user_email: email,
      comment,
    },
  });

  const create_order_url = domain + `truck-signs/order/${id}/create/`;
  axios
    .post(create_order_url, body, config)
    .then(async (res) => {
      const result = await res.data["Result"];
      window.localStorage.removeItem("latest_customized_product_id");
      window.localStorage.removeItem("product_variation_id");
      router.push(`/order/${result.id}`);
    })
    .catch((error) => {
      console.log(error);
    });
};
