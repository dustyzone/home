import { VscAccount } from "react-icons/vsc";
import {AiOutlineEdit, AiOutlineHeart} from "react-icons/ai";
import {FiShoppingCart} from "react-icons/fi";
import {MdOutlineFeedback} from "react-icons/md";
import {FaBoxOpen} from "react-icons/fa";
import AccountBox from "./AccountBox";
import "./ViewAccount.css";
import AccountSideBar from "./AccountSideBar";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import { useContext } from "react";

function ViewAccount(){
    
    const {loginInfo} = useContext(Context);

    return(
        loginInfo?.status ?
            <div className="view-account-main-div">
                <AccountSideBar/>
                <div className="view-account-right">
                    <div className="view-account-right-main-heading">Our Account</div>
                    <div className="view-account-right-main-div">
                        <Link to='/view-account/account-info'><AccountBox icon={<VscAccount className="view-account-react-icon"/>} text="Account Info"/></Link>
                        <Link to='/view-account/edit'><AccountBox icon={<AiOutlineEdit className="view-account-react-icon"/>} text="Edit Account"/></Link>
                        <Link to={'/view-account/orders'}><AccountBox icon={<FaBoxOpen className="view-account-react-icon"/>} text="View Orders"/></Link>
                        <Link to={'/view-account/wishlist'}><AccountBox icon={<AiOutlineHeart className="view-account-react-icon"/>} text="View Wishlist"/></Link>
                        {/* <AccountBox icon={<FiShoppingCart className="view-account-react-icon"/>} text="View Cart"/> */}
                        {/* <AccountBox icon={<MdOutlineFeedback className="view-account-react-icon"/>} text="Feedback"/> */}
                    </div>
                </div>
            </div>
        : <div className="not-login-error">Login to View this Page</div>
    )
}

export default ViewAccount;