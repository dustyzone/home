import "./Banner.css";

import productImg1 from "../../../assets/Banner_Images/p1.png";
import productImg2 from "../../../assets/Banner_Images/p2.png";

import {useNavigate} from "react-router-dom";

function Banner(){

    const navigate = useNavigate();

    return(
        <div className="banner-main-div">
            <div className="banner-left">
                <img src={productImg1} alt="" className="banner-image banner-p1"/>
            </div>
            <div className="banner-center">
                <div className="banner-heading">
                    Best Anime Collections
                </div>
                <div className="responsive-banner-btn">
                    <span className="shop-now-btn" onClick={()=>navigate('/category/anime')}>
                        Shop Now
                    </span>
                </div>
            </div>
            <div className="banner-right">
                <img src={productImg2} alt="" className="banner-image banner-p2"/>
            </div>
        </div>
    )
}

export default Banner;