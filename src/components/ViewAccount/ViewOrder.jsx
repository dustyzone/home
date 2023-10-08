import "./ViewAccount.css";
import AccountSideBar from "./AccountSideBar";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../Context";
import ProductItem from "./ProductItem/ProductItem";

function ViewOrder(){

    const [order, setOrder] = useState("");
    const {loginInfo} = useContext(Context);

    async function getOrderInfo(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/order/user-order', {email: loginInfo?.email, role: loginInfo?.role}).then(res=>{
            setOrder(res?.data.data);
        }).catch(error=>{
            console.log(error?.response?.data?.message)
        })
    }

    useEffect(()=>{
        if(loginInfo?.status){
            getOrderInfo();
        }
    }, [loginInfo])

    return(
        loginInfo?.status ?
            <div className="view-account-main-div">
                <AccountSideBar/>
                <div className="view-account-right">
                    <div className="view-account-right-main-heading">Your Orders</div>
                    <div className="view-account-right-main-div">
                        <div className="account-info-main-div">
                            {
                                order ? 
                                 order?.map((product)=>(
                                    <div className="order-product-right-div1">
                                        <div className="account-info-text1"><b>Status: </b> {product.accepted ? "✅Accepted" : "Not Acccepted"} </div>
                                        {
                                            product.accepted ? 
                                            <div className="account-info-text1"><b>Delivery Status: </b> {product.delivered ? "✅Delivered" : "Not Delivered"} </div>
                                            : <></>
                                        }
                                        <div className="account-info-text1"><b>Address: </b> {product.address.name + ": " + product.address.address1 + ", " + product.address.address2 + ", " + product.address.city + ", " + product.address.state + "-" + product.address.pincode + " (" + product.address.mobile + ")"} </div>
                                        <div className="account-info-text1"><b>Total Price: </b> ₹{product.total}/- </div>
                                        {
                                            product.order.map((elm)=>(

                                                <ProductItem slug={elm?.slug} img={elm?.img[0]} title={elm?.title} price={elm?.price} size={elm?.size} quantity={elm?.qty}/>
                                            ))
                                        }
                                    </div>
                                 ))
                                : <div className="not-login-error">Not Orders Found</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        : <div className="not-login-error">Login to View this Page</div>
    )
}

export default ViewOrder;