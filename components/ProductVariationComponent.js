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
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const domain = process.env.NEXT_PUBLIC_API_DOMAIN_NAME;

const ProductVariationComponent = ({ product }) => {
    const [colors, setColors] = useState(null);
    const [color, setColor] = useState(null);
    const [company_name, setCompanyName] = useState(null);
    const [dot_number, setDotNumber] = useState(null);
    const [mc_number, setMcNumber] = useState(null);
    const [company_location, setCompanyLocation] = useState(null);
    const [vim_number, setVimNumber] = useState(null);
    const [truck_number, setTruckNumber] = useState(null);
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");

    useEffect(async () => {
        getColors(setColors);
        setColor(product.product_color_default);
        window.scrollTo(0, 0);
    }, []);





    const createOrderHandler = async () => {
        if (!(String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ))) {
            alert("Please enter a valid email");
        }
        else {
            const color_id = color == null ? -1 : color.id;
            const body = JSON.stringify({
                product_color_id: color_id,
                order: {
                    user_email: email,
                    comment,
                },
                lettering_items: [
                    { title: "Company Name", text: company_name },
                    { title: "DOT Number", text: dot_number },
                    { title: "MC Number", text: mc_number },
                    { title: "Company Location", text: company_location },
                    { title: "VIM Number", text: vim_number },
                    { title: "Truck Number", text: truck_number }
                ]


            });
            await createOrder(product.id, body);
        }
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
                                alt="Truck Sign Vinyl Product"
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
                            pre-spaced and ready to apply. The decal will meet US DOT
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

                        <div className={styles.productDivAdd}>
                            <InputGroup className={styles.inputGroupAdd}>

                                <FormControl
                                    type="text"
                                    placeholder="Company Name"
                                    className={`mr-2 ${styles.categoryAddLettering}`}
                                    value={company_name}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />

                            </InputGroup>

                            <InputGroup className={styles.inputGroupAdd}>

                                <FormControl
                                    type="text"
                                    placeholder="DOT Number"
                                    className={`mr-2 ${styles.categoryAddLettering}`}
                                    onChange={(e) => setDummyVar(e.target.value)}
                                />

                            </InputGroup>

                            <InputGroup className={styles.inputGroupAdd}>

                                <FormControl
                                    type="text"
                                    placeholder="MC Number"
                                    className={`mr-2 ${styles.categoryAddLettering}`}
                                    onChange={(e) => setDummyVar(e.target.value)}
                                />

                            </InputGroup>

                            <InputGroup className={styles.inputGroupAdd}>

                                <FormControl
                                    type="text"
                                    placeholder="Company Location"
                                    className={`mr-2 ${styles.categoryAddLettering}`}
                                    onChange={(e) => setDummyVar(e.target.value)}
                                />

                            </InputGroup>

                            <InputGroup className={styles.inputGroupAdd}>

                                <FormControl
                                    type="text"
                                    placeholder="VIN Number"
                                    className={`mr-2 ${styles.categoryAddLettering}`}
                                    onChange={(e) => setDummyVar(e.target.value)}
                                />

                            </InputGroup>

                            <InputGroup className={styles.inputGroupAdd}>

                                <FormControl
                                    type="text"
                                    placeholder="Truck Number"
                                    className={`mr-2 ${styles.categoryAddLettering}`}
                                    onChange={(e) => setDummyVar(e.target.value)}
                                />

                            </InputGroup>
                        </div>
                    </Form>

                    <Form className={styles.orderInfoForm}>
                        <div className={styles.productDivAdd}>
                            <InputGroup className={styles.formGroup}>
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

                                <FormControl
                                    className={`${styles.formControl} ${styles.emailFormControl}`}
                                    autoFocus
                                    placeholder="Email"
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

export default ProductVariationComponent;

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
const createOrder = async (product_id, body) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };



    const create_order_url = domain + `truck-signs/order/${product_id}/create/`;
    axios
        .post(create_order_url, body, config)
        .then(async (res) => {
            const result = await res.data["Result"];
            window.localStorage.removeItem("product_id");
            router.push(`/order/${result.id}`);
        })
        .catch((error) => {
            console.log(error);
        });
};