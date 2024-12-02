import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "../product_detail/ProductCard";
import { getHotProducts } from "../../api/product";

const HomeHotProduct = () => {
  const { t } = useTranslation("global");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setProducts(await getHotProducts());
    }
    fetchData();
  }, [])

  return (
    <section className="w-full flex justify-center p-8">
      <div className="w-full max-w-screen-2xl">
        <div className="flex lg:flex-row flex-col justify-between lg:items-end 2xl:px-0 px-2">
          <div className="h-fit w-full">
            <div className="w-full flex flex-row justify-between items-center mt-2">
              <h1 className="sm:text-4xl sm:mb-0 text-3xl mb-3 font-bold">
                {t("homepage.top-sell.description")}
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full flex lg:flex-wrap flex-row justify-between md:mt-4 mt-8 2xl:px-0 md:px-2 px-2
            lg:overflow-hidden overflow-x-auto whitespace-nowrap scrollbar">
          {products?.map((product, index) => (
            <div key={index} className="inline-block lg:w-[23%] lg:min-w-[320px] md:min-w-[400px] min-w-[360px] mr-3 md:mr-8 lg:mt-8 lg:mr-2 last:mr-0 ">
              <ProductCard product={product} />
            </div>
          ))
          }
        </div>
      </div>
    </section>
  );
};

export default HomeHotProduct;
