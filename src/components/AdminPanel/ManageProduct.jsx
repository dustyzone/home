import "./AdminPanel.css";
import AccountSideBar from "./AccountSideBar";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../Context";
import Product from "../Products/Product/Product";

function ManageProduct() {

    const { loginInfo } = useContext(Context);
    const { products } = useContext(Context);

    const [product, setProduct] = useState(undefined);

    useEffect(() => {
        setProduct(products)
    }, [products])

    return (
        loginInfo?.status ?
            <div className="view-account-main-div">
                <AccountSideBar />
                <div className="view-account-right">
                    <div className="view-account-right-main-heading">Manage Products</div>
                    <div className="product-collection-div1">
                        {
                            product ?
                                (product.length !== 0) ?
                                    product.map((product) => (
                                        <Product key={product.slug} img={product.img[0]} title={product.title} slug={product.slug} category={product.category} price={product.price} originalPrice={product.originalPrice} />
                                    ))
                                    : <div className="no-products-div">No Products Found</div>
                                : <div className="loading-spinner"></div>
                        }
                    </div>
                </div>
            </div>
            : <div className="not-login-error">Login to View this Page</div>
    )
}

export default ManageProduct;