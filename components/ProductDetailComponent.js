import Link from "next/link";
import Image from "next/image";
import styles from "../styles/ProductDetailComponent.module.css";
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
  Dropdown,
  FormLabel,
  ListGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";

const domain = "http://127.0.0.1:8000/";

const ProductDetailComponent = ({ product, variations }) => {
  const [colors, setColors] = useState(null);
  const [color, setColor] = useState(null);
  const [custom_vars, setCustomVars] = useState(null);
  const [dummy_var, setDummyVar] = useState(null);
  const [lettering_variation_category_id, setLetteringCategoryId] =
    useState(null);

  useEffect(async () => {
    getColors(setColors);
    setColor(product.product_color_default);

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

  return product == null || colors == null || color == null ? (
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
              LorenIpsummm mmmmmm mmmmmmmmm mmmmmmm mmmmmmmmmm mmmmmmmmmmm
              mmmmmmmmmmm mmmmmmmm
            </p>
          </div>
        </Col>
        <Col className={styles.productInfoCol} xs={12} sm={12} md={6} lg={6}>
          <Form>
            {color == null ? (
              <div></div>
            ) : (
              <FormGroup>
                <div className={styles.colorFormWrapper}>
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: color.color_in_hex }}
                  ></div>
                  <div className={styles.dropdownDiv}>
                    <Dropdown className={styles.colorDropdown}>
                      <Dropdown.Toggle
                        variant="outline-primary"
                        id="dropdown-basic"
                        className={styles.dropdownColorToggle}
                      >
                        Color
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
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
                              {col.color_nickname}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </FormGroup>
            )}
            {custom_vars == null ? (
              <div></div>
            ) : (
              <>
                {custom_vars.map((cv, index) => {
                  return (
                    <ListGroup className={styles.colorFormWrapper}>
                      <div className={styles.colorBox}></div>
                      {/* <div className={styles.listGroupItem}> */}
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
                      {/* </div> */}
                    </ListGroup>
                  );
                })}
              </>
            )}

            <InputGroup className={styles.inputGroup}>
              <FormControl
                as="select"
                placeholder="Search"
                className={`mr-2 ${styles.categoryDropdown}`}
                aria-label="Search"
                onChange={(e) =>
                  setLetteringCategoryIdHandler(
                    e.target.value,
                    variations,
                    setLetteringCategoryId
                  )
                }
              >
                <option value={-1}>Add type</option>
                {variations != null ? (
                  variations.map((variation, index) => {
                    return (
                      <option value={index} key={index + 2}>
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
              </FormControl>

              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                onChange={(e) => setDummyVar(e.target.value)}
              />
              <Button
                className={styles.searchButton}
                onClick={(e) => {
                  addLineHandler(e);
                }}
              >
                Add Line
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailComponent;

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
      console.log(result);
      window.localStorage.setItem("product_variation_id", result.id);
      window.localStorage.setItem("latest_customized_product_id", id);
      router.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

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
