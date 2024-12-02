import { useEffect, useState } from "react";
import HomeBanner from "../components/home/HomeBanner";
import HomeProduct from "../components/home/HomeProduct";
import HomeHotProduct from "../components/home/HomeHotProduct";
import HomeFollow from "../components/home/HomeFollow";

const HomePage = () => {
    const [lastSeenProduct, setLastSeenProduct] = useState(null);
    useEffect(() => {
        const lastSeenProduct = JSON.parse(localStorage.getItem('lastSeenProducts') || '[]');
        setLastSeenProduct(lastSeenProduct);
    }, []);
    return (
        <div>
            <HomeBanner />
            <HomeProduct />
            <HomeHotProduct />
            {/* <HomeFollow/>  */}
            {/* {lastSeenProduct?.length && <HomeSuggest listProductId={lastSeenProduct}/>} */}
        </div>
    )
};

export default HomePage;