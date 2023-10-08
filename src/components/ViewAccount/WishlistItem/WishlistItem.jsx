import "./ProductItem.css";
import {IoMdCloseCircle} from "react-icons/io";
import { Context } from "../../../Context";
import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function WishlistItem({slug, img, title, price, getWishlistInfo}){

    const {loginInfo} = useContext(Context);

    async function removeCartItemFunc(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/auth/del-wishlist', {email: loginInfo.email, role: loginInfo.role, slug}).then(res=>{
            getWishlistInfo();
        }).catch(error=>{
            console.log(error?.response?.data?.message);
        })
    }

    return(
        <div className="cart-item-main-div">
            <Link to={`/product/${slug}`}>
                <img src={process.env.REACT_APP_FILE_URL+img} alt="p-img" className="cart-pimg"/>
            </Link>
            <div className="cart-item-details">
                <Link to={`/product/${slug}`}>
                    <div className="cart-item-pname">{title}</div>
                </Link>
                <div className="cart-item-pPrice">₹{price}/-</div>
                <IoMdCloseCircle onClick={removeCartItemFunc} className="remove-item-icon"/>
            </div>

        </div>
    )
}

export default WishlistItem;