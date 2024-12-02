import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { getRelatedProduct } from "../../api/product";
import ProductCard from "./ProductCard";

const RelatedProduct = ({id}) => {
    const { t } = useTranslation("global")

    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getRelatedProduct(id)
            setProducts(response?.data)
        }
        fetchProducts()
    }, [id])

    return(
        <section className="w-full h-fit max-w-screen-2xl 2xl:px-0 lg:px-4 mt-0 space-y-8">
            <div className="text-center w-full space-y-2">
                <h2 className="sm:text-2xl text-xl font-medium">{t("product.related.title")}</h2>
                <h1 className="sm:text-4xl text-xl font-bold">{t("product.related.subtitle")}</h1>
            </div>
            <div className="w-full flex flex-row overflow-x-auto space-x-4 md:px-0 px-4">
                {Array.isArray(products) && products?.map((product, index) => (
                    <div key={index} className="w-full min-w-[21rem]">
                        <ProductCard product={product}/>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RelatedProduct