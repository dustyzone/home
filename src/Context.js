import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = createContext();

const AppContext = ({children}) => {

    const [loginInfo, setLoginInfo] = useState({status: false});
    const [products, setProducts] = useState(undefined);
    const [cart, setCart] = useState(undefined)

    async function getAllProducts(){
        await axios.get(process.env.REACT_APP_BASE_URL+"/product/get-all").then(res=>{
            setProducts(res?.data?.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    async function getCartDetailsFunc(){
        await axios.post(process.env.REACT_APP_BASE_URL+"/auth/get-cart", {email: loginInfo.email, role: loginInfo.role}).then(res=>{
            setCart(res?.data?.data?.cart);
        }).catch(error=>{
            console.log(error?.response?.data?.message)
        })
    }

    useEffect(()=>{
        getAllProducts();
    }, [])

    return(
        <Context.Provider value={{
            loginInfo, setLoginInfo,
            products, setProducts, getAllProducts,
            cart, setCart, getCartDetailsFunc
        }}>
            {children}
        </Context.Provider>
    )
}
export default AppContext;