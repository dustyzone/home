import "./ProductItem.css";
import {IoMdCloseCircle} from "react-icons/io";
import { Context } from "../../../Context";
import { useContext } from "react";
import axios from "axios";

function ProductItem({slug, img, title, price, size, quantity}){

    return(
        <div className="cart-item-main-div">
            <img src={img} alt="p-img" className="cart-pimg"/>
            <div className="cart-item-details">
                <div className="cart-item-pname">{title}</div>
                <div className="cart-item-pPrice">₹{price}/-</div>
                <div className="cart-item-pSize">Size: {size}</div>
                <div className="cart-item-quantity-btn-div">
                    {/* <button value="-" className="item-count-btn">-</button> */}
                    <div className="cart-item-quantity-text">Qty: {quantity}</div>
                    {/* <button value="+" className="item-count-btn">+</button> */}
                </div>
                {/* <IoMdCloseCircle onClick={removeCartItemFunc} className="remove-item-icon"/> */}
            </div>

        </div>
    )
}

export default ProductItem;