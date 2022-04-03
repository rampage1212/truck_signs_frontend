import axios from "axios";
import { createContext } from "react";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

const domain = process.env.NEXT_PUBLIC_API_DOMAIN_NAME;

const ProductContext = createContext();


export const getCurrentProduct = async () => {
    const product_id = window.localStorage.getItem("product_id");
    
    if (product_id != undefined) {
        
        const product_url = `${domain}truck-signs/product-detail/${product_id}/`;
        
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        return await axios
            .get(product_url, config)
            .then(async (response) => {
                if (response.data) {
                    const res = await response.data;
                    console.log(res.data)
                    return { status: "PRODUCT", product: res };
                } else {
                    return { status: "NO_PRODUCT_FOUND", product: null };
                }
            })
            .catch((err) => {

                return { status: "NO_PRODUCT_FOUND", product: null };
            });
    } else {
        return { status: "NO_PRODUCT_FOUND", product: null };
    }
};



export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [product_id, setProductID] = useState(null);

    const router = useRouter();

    useEffect(() => {

        async function FetchProduct() {
            const temp_product = await getCurrentProduct()
            setProduct(temp_product['product']);
            if (temp_product['product'] != null){
                const temp_product_id = window.localStorage.getItem("product_id"); 
                if(temp_product_id == null || temp_product_id == undefined || temp_product_id != temp_product['product'].id){
                    setProductID(temp_product['product'].id);
                }

            }
        }

        try {
            FetchProduct()
        }
        catch {
            console.log("No product");
        }

    }, []);


    useEffect(() => {
        async function FetchProduct() {
            const temp_product = await getCurrentProduct()
            setProduct(temp_product['product']);
            if (temp_product['product'] != null){
                setProductID(temp_product['product'].id);
            }
        }
        if(product_id != null){
            console.log(product_id);
            FetchProduct();
        }
    }, [product_id])

    const fetchProductByID = (id) => {
        if(id != null){
            window.localStorage.setItem("product_id", id);
        }
    }



    return (
        <ProductContext.Provider value={{ product, product_id, fetchProductByID }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => useContext(ProductContext);
export const ProductConsumer = ProductContext.Consumer;