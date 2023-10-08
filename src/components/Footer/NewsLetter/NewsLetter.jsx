import "./NewsLetter.css";

import {BsFacebook, BsTwitter, BsLinkedin} from "react-icons/bs";
import {BiLogoInstagramAlt} from "react-icons/bi";

function NewsLetter(){
    return(
        <div className="special-offer-section-div">
            <div>
                <div className="special-offer-heading">Get Updated with our Special Offers</div>
                <div className="special-offer-text">Get Email of Special Offers and Discount </div>
                <div className="email-input-div">
                    <input type="text" placeholder="Your Email id" className="email-input" />
                    <a href="#" className="send-email-btn">→</a>
                </div>
                <div className="social-media-icons-div">
                    <BsFacebook className="social-media-icons"/>
                    <BiLogoInstagramAlt className="social-media-icons"/>
                    <BsTwitter className="social-media-icons"/>
                    <BsLinkedin className="social-media-icons"/>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter;