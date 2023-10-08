import "./Home.css";
import Banner from "../Home/Banner/Banner";
import Category from "./Category/Category";
import Advertisement from "./Advertisement/Advertisement";
import Products from "../Products/Products";
import NewsLetter from "../Footer/NewsLetter/NewsLetter";
import { useEffect, useContext, useState } from "react";
import { Context } from "../../Context";

function Home(){
    
    const {products} = useContext(Context);

    const [newArrival, setNewArrivals] = useState(undefined);
    const [anime, setAnime] = useState(undefined);
    const [marvel, setMarvel] = useState(undefined);
    const [gym, setGym] = useState(undefined);

    useEffect(()=>{
        setNewArrivals(products?.filter((product)=>{
            return product?.newArrival===true;
        }))
        setAnime(products?.filter((product)=>{
            return product?.category==="Anime";
        }))
        setMarvel(products?.filter((product)=>{
            return product?.category==="Marvel";
        }))
        setGym(products?.filter((product)=>{
            return product?.category==="Gym";
        }))
    }, [products])

    return(
        <div className="home">
                <>
                    <Banner/>
                    <Products products={newArrival} title="New Arrivals"/> 
                    <Category />
                    <Products products={anime} title="Anime Merchandise"/>
                    <Advertisement text="Refer and Earn Dusty Coins"/>
                    <Products products={marvel} title="Marvel Merchandise"/>
                    <Advertisement text="Create Account to Get 100 Dusty Coins"/>
                    <Products products={gym} title="Gym Merchandise"/>
                    <NewsLetter/>
                </>
                {/* : 
                <div className="loader-main-div"><div className="loading-spinner"></div></div>  */}
        </div>
    )
}

export default Home;