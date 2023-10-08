import "./ViewAccount.css";
import AccountSideBar from "./AccountSideBar";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../Context";
import WishlistItem from "./WishlistItem/WishlistItem";

function ViewWishlist(){

    const [products, setProducts] = useState("");
    const {loginInfo} = useContext(Context);

    async function getWishlistInfo(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/get-wishlist', {email: loginInfo?.email, role: loginInfo?.role}).then(res=>{
            setProducts(res?.data?.data)
        }).catch(error=>{
            console.log(error?.response?.data?.message)
        })
    }

    useEffect(()=>{
        if(loginInfo?.status){
            getWishlistInfo();
        }
    }, [loginInfo])

    return(
        loginInfo?.status ?
            <div className="view-account-main-div">
                <AccountSideBar/>
                <div className="view-account-right">
                    <div className="view-account-right-main-heading">Your Wishlist</div>
                    <div className="view-account-right-main-div">
                        <div className="account-info-main-div">
                            {
                                products ? 
                                 products?.map((elm)=>(
                                    <WishlistItem getWishlistInfo={getWishlistInfo} key={elm?.slug} slug={elm?.slug} img={elm?.img[0]} title={elm?.title} price={elm?.price}/>
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

export default ViewWishlist;