import "./Checkout.css";
import OrderItem from "./OrderItem/OrderItem";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productImg from "../../assets/product1.png";
import { Context } from "../../Context";
import axios from "axios";

function Checkout() {

    const {loginInfo, cart, getCartDetailsFunc} = useContext(Context);
    const [user, setUser] = useState("");

    async function accountInfo(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/info', {email: loginInfo?.email, role: loginInfo?.role}).then(res=>{
            setUser(res?.data.data);
        }).catch(error=>{
            console.log(error?.response?.data?.message)
        })
    }

    useEffect(()=>{
        if(loginInfo?.status){
            accountInfo();
        }
    }, [loginInfo])

    const [subTotal, setSubTotal] = useState(0);
    const [delivery, setDelivery] = useState(50);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [add1, setAdd1] = useState("");
    const [add2, setAdd2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [mobile, setMobile] = useState("");

    async function emptyCartFunc(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/empty-cart', {email: loginInfo.email, role: loginInfo.role}).then(res=>{
            getCartDetailsFunc();
            navigate('/payment-success');
        }).catch(error=>{
            toast.error(error?.response?.data?.message, {
                position: "bottom-right"
            })
        })
    }

    async function proceedToPayment(){
        if(name==="" || add1==="" || add2==="" || city==="" || state==="" || pinCode==="" || mobile===""){
            toast.error("Please Fill All the Details", {
                position: "bottom-right"
            })
        }
        else{
            const order = {
                order: cart,
                total: subTotal + delivery,
                address: {
                    name: name,
                    address1: add1,
                    address2: add2,
                    city: city,
                    state: state,
                    pincode: pinCode,
                    mobile: mobile
                },
                email: loginInfo.email,
                accepted: false,
                delivered: false
            }
            await axios.post(process.env.REACT_APP_BASE_URL+"/order/create-order", {
                order: order.order,
                total: order.total,
                address: order.address,
                email: order.email,
                accepted: order.accepted,
                delivered: order.delivered,
                role: loginInfo.role
            }).then(res=>{
                emptyCartFunc();
            }).catch(error=>{
                toast.error(error?.response?.data?.message, {
                    position: "bottom-right"
                })
            })
        }
    }

    useEffect(()=>{
        setName(user.name);
        setAdd1(user.address1);
        setAdd2(user.address2);
        setCity(user.city);
        setState(user.state);
        setPinCode(user.pincode);
        setMobile(user.mobile);
    })

    useEffect(()=>{
        if(cart){
            let total = 0;
            cart.map((elm)=>{
                total = total + (elm.price*elm.qty);
            })
            setSubTotal(total);
        }
    }, [user, cart])



    return (
        <>
            {
                loginInfo?.status ?

            <div className="checkout-page-main-div">
                <div className="checkout-sections">
                    <div className="checkout-section-heading">Order Summary:</div>
                    <div className="checkout-section-box">
                            {/* <div className="empty-cart-div">Your Cart is Empty</div> */}
                            {
                                cart.map((product)=>(
                                    <OrderItem key={product.title+product.size+product.qty} img={product.img} title={product.title} price={product.price} size={product.size} quantity={product.qty} />
                                ))
                            }
                        <div className="checkout-section-subheading-group">
                            <div className="checkout-section-subheading">
                                Sub Total: ₹{subTotal}/-
                            </div>
                            <div className="checkout-section-subheading">
                                Delivery Charges: ₹{delivery}/-
                            </div>
                            <div className="checkout-section-subheading grand-total-text">
                                Grand Total: <span>₹{subTotal + delivery}/-</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkout-sections">
                    <div className="checkout-section-heading">Delivery Address:</div>
                        <div className="add-address-page-main-div">
                            <div className="main1-field-div">
                                <div className="field-contain-div">
                                    <label htmlFor="custEmail">Name: </label>
                                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" />
                                </div>
                                <div className="field-contain-div">
                                    <label htmlFor="custCreatePass">Address Line 1: </label>
                                    <input onChange={(e) => setAdd1(e.target.value)} value={add1} type="text" />
                                </div>
                                <div className="field-contain-div">
                                    <label htmlFor="custCreatePass">Address Line 2: </label>
                                    <input onChange={(e) => setAdd2(e.target.value)} value={add2} type="text" />
                                </div>
                                <div className="field-contain-div">
                                    <label htmlFor="custCreatePass">City: </label>
                                    <input onChange={(e) => setCity(e.target.value)} value={city} type="text" />
                                </div>
                                <div className="field-contain-div">
                                    <label htmlFor="custCreatePass">State: </label>
                                    <input onChange={(e) => setState(e.target.value)} value={state} type="text" />
                                </div>
                                <div className="field-contain-div">
                                    <label htmlFor="custCreatePass">Pin Code: </label>
                                    <input onChange={(e) => setPinCode(e.target.value)} value={pinCode} type="number" />
                                </div>
                                <div className="field-contain-div">
                                    <label htmlFor="custCreatePass">Mobile Number: </label>
                                    <input onChange={(e) => setMobile(e.target.value)} value={mobile} type="number" />
                                </div>
                            </div>
                    </div>
                </div>
                <div className="checkout-sections select-payment-option">
                    <div className="checkout-section-heading select-payment-option-heading">Payment Option:</div>
                    <div className="checkout-section-box select-payment-option-box">
                        <div className="payment-option-text"><input type="radio" id="cod-payment" name="payment-method" value="cod" /> <label htmlFor="cod-payment">Cash on Delivery (COD)</label></div>
                        <div className="payment-option-text"><input type="radio" id="upi-payment" name="payment-method" value="upi" /> <label htmlFor="upi-payment">UPI Payment</label></div>
                        <div className="checkout-btn-group">
                            <button onClick={proceedToPayment} className="add-new-address-btn">Proceed To Payment</button>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
            : <div className="not-login-error">Login to View this Page</div> 
            }
        </>
    )
}

export default Checkout;