import './ViewAccount.css';
import { Link } from 'react-router-dom';

function AccountSideBar(){

    return(
        <div className="view-account-left">
            <div className="left-account-div-main">
                <div className="user-account-img-main">
                    <div className="user-account-img">{"S"}</div>
                </div>
                <div className="user-greeting-text"><Link className='user-greeting-text' to='/view-account'>{"Soham Tamhane"}</Link></div>
                <div className="account-info-btn view-account-page-btn"><Link to='/view-account/account-info'>Account Info</Link></div>
                <div className="edit-account-btn view-account-page-btn"><Link to='/view-account/edit'>Edit Account</Link></div>
                <div className="view-orders-btn view-account-page-btn"><Link to={'/view-account/orders'}>View Orders</Link></div>
                <div className="view-wishlist-btn view-account-page-btn"><Link to={'/view-account/wishlist'}>View Wishlist</Link></div>
                {/* <div className="view-cart-btn view-account-page-btn">View Cart</div> */}
                {/* <div className="give-feedback-btn view-account-page-btn">Feedback</div> */}
                <div className="account-sign-out-btn">Sign Out</div>
            </div>
        </div>
    )
}

export default AccountSideBar;