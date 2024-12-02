import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { useSidebarStore } from "../../states/sidebar";
import noProducts from "../../assets/no-products.jpg"
import ProductCard from "../product_detail/ProductCard";
import { getAllProducts } from "../../api/product";
// import { formatFilterPrice } from "../../utils/format";

const ProductData = () => {
  const { t } = useTranslation("global");
  const handleCloseFilter = (key) => {
    // filterChange({ [key]: null });
  };
  const handleClearFilter = () => {
    const filterClear = Object.fromEntries(
      // Object.keys(filter).map((key) => [key, null])
    );
    // filterChange(filterClear);
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setProducts( await getAllProducts());
    }
    fetchData();
  }, [])
  // const { products, getAllProducts, sortAlphaProducts,
  //   filter, filterChange, filterLoading,
  // } = useProductStore()

  const handleSort = (sortValue) => {
    if (sortValue == "default") {
      // getAllProducts()
      return
    }
    // sortAlphaProducts()
  }

  const { toggleFilterBar } = useSidebarStore()
  const [active, setActive] = useState(12)

  return (
    <section className="w-full h-fit">
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center pb-4">
        {/* <p className="sm:text-2xl font-medium">
          {t("products.show")} {products?.length ? "1 -" : ""} {active} {t("products.of")} {products?.length}{" "}
          {t("products.result")}
        </p> */}
        <div className="flex flex-row items-center sm:text-2xl sm:mt-0 mt-2">
          <span className="sm:block hidden">{t("products.sort.title")}</span>
          <select
            name="sort"
            className="border-2 px-4 sm:ml-2 ml-0 py-1 font-medium"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="default">{t("products.sort.default")}</option>
            <option value="alphabet">{t("products.sort.alpha")}</option>
          </select>
        </div>
      </div>

      <div
        className={`w-full sm:flex-row sm:flex-nowrap 
        relative flex-col
        flex-wrap space-x-2 sm:items-center mb-4 flex`}
      // ${Object.values(filter).some((value) => value !== null)? 
      //   "flex"
      //     : "lg:hidden flex"
      //   }`}
      >
        {/* <h2 className="text-2xl font-semibold min-w-[130px] lg:block hidden">
          {t("products.active")}
        </h2>
        <div className="lg:hidden block">
          <CiFilter
            className="sm:w-[2.5rem] h-[1.5rem] w-[1.5rem] sm:h-[2.5rem] text-[rgb(62,24,0) font-bold] cursor-pointer"
            onClick={toggleFilterBar}
          />
        </div> */}

        <div className="sm:w-[80%] w-full flex sm:overflow-x-auto sm:flex-nowrap flex-wrap sm:whitespace-nowrap  scrollbar">
          {
            //
            Object.entries([]).map(([key, value], i) => (
              <div
                key={key}
                className={`sm:text-2xl text-[rgb(62,24,0)] font-medium capitalize w-fit py-3 px-4 
                sm:mt-0 mt-2
                items-center bg-[rgb(244,189,98)] mr-3 ${value != null ? "flex" : "hidden"
                  }`}
              >
                {/* {key == "price" ? formatFilterPrice(value) : value} */}

                {value}

                <IoClose
                  className="mt-[2px] ml-3 cursor-pointer"
                  onClick={() => handleCloseFilter(key)}
                />
              </div>
            ))}
        </div>
        {/* <p className="sm:text-2xl text-[rgb(62,24,0)] underline  sm:static absolute top-0 right-0 font-medium cursor-pointer min-w-[120px] text-end" onClick={handleClearFilter}>
          {t("products.clear")}
        </p> */}
      </div>

      <div className="w-full h-full" id="product-list-container">
        {products?.length
          // ? (!filterLoading ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:gap-6 gap-4">
          ? (true ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:gap-6 gap-4">

            {Array.isArray(products) && products?.slice(0, active)?.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
          </div> : <div className="w-full h-full min-h-[40rem] flex justify-center items-center">
          </div>)
          : (<div className="w-full flex flex-col justify-center sm:min-h-[20rem] items-center">
            <img className="max-w-[20rem] max-h-[10rem]" src={noProducts} alt="" />
            <p className="sm:text-2xl text-sm font-medium text-center text-[rgb(62,24,0)]">{t("no-products")}</p>
          </div>)
        }
      </div>
    </section>
  );
};

export default ProductData;
