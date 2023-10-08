import "./AdminPanel.css";
import { Link } from "react-router-dom";

function AccountSideBar(){
    return(
        <div className="view-account-left">
            <div className="left-account-div-main">
                <div className="user-account-img-main">
                    <div className="user-account-img">{"S"}</div>
                </div>
                <div className="user-greeting-text"><Link className='user-greeting-text' to='/admin-panel'>{"Soham Tamhane"}</Link></div>
                <div className="account-info-btn view-account-page-btn"><Link to='/admin-panel/manage-users'>Manage Users</Link></div>
                <div className="edit-account-btn view-account-page-btn"><Link to='/admin-panel/view-orders'>View Orders</Link></div>
                <div className="view-orders-btn view-account-page-btn"><Link to={'/admin-panel/add-product'}>Add Products</Link></div>
                <div className="view-wishlist-btn view-account-page-btn"><Link to={'/admin-panel/manage-products'}>Manage Products</Link></div>
                <div className="account-sign-out-btn">Sign Out</div>
            </div>
        </div>
    )
}

export default AccountSideBar;