import "react-range-slider-input/dist/style.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import { IoIosClose } from "react-icons/io";
import RangeSlider from "react-range-slider-input";
// import { formatPrice } from "../../utils/format";
// import { useProductStore } from "../../states/products";
import { useSidebarStore } from "../../states/sidebar";

const OptionsFilter = ({ item, index, type }) => {
  // const { filterChange, filter } = useProductStore();
  // const handleFilter = () => {
  //   filterChange({ [type]: item?.value });
  // };

  return (
    <li className="flex items-center mt-2">
      <input
        type="radio"
        name={type}
        className="mr-2 w-[1rem] h-[1rem] border-[rgb(245,245,245)] accent-[rgb(62,24,0)]"
        // onClick={() => handleFilter()}
        // checked={filter?.[type] == item?.value}
      />
      <label className="lg:text-xl opacity-50 font-bold">{item?.name}</label>
    </li>
  );
};

const ColorFilter = ({ color }) => {
  // const { filterChange, filter } = useProductStore();
  const handleFilterColor = () => {
    // filterChange({ color: color });
  };

  return (
    <li
      className="cursor-pointer first:mt-4 mt-2 flex items-center"
      onClick={handleFilterColor}
    >
      <div
        className={`lg:w-[2rem] lg:h-[2rem] w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-[50%]
       bg-white border-[1px]`}
      //  style={{borderColor: color == filter?.color ? color : "rgb(230,230,230)"}}
      >
        <div
          className={`lg:w-[1.5rem] lg:h-[1.5rem] w-[1rem] h-[1rem] rounded-[50%]`}
          style={{ backgroundColor: color }}
        ></div>
      </div>
      <span className="lg:text-xl ml-2 font-medium capitalize">{color}</span>
    </li>
  );
};

const ProductsFilter = () => {
  const { t } = useTranslation("global");
  const gender = [
    {
      name: t("products.filter.gender.men"),
      value: "male",
    },
    {
      name: t("products.filter.gender.women"),
      value: "female",
    },
    {
      name: t("products.filter.gender.kid"),
      value: "kid",
    },
  ];

  const category = [
    {
      name: t("products.filter.category.shoe"),
      value: "shoes",
    },
    {
      name: t("products.filter.category.clothes"),
      value: "clothes",
    },
    {
      name: t("products.filter.category.accessories"),
      value: "accessories",
    },
  ];

  const brands = [
    {
      name: "Nike",
      value: "nike",
    },
    {
      name: "Adidas",
      value: "adidas",
    },
    {
      name: "Puma",
      value: "puma",
    },
    {
      name: "Jordan",
      value: "jordan",
    },
    {
      name: "New Balance",
      value: "new balance",
    },
    {
      name: t("products.filter.category.other"),
      value: "other",
    },
  ];

  const clothesSize = [
    {
      name: "S",
      value: "s",
    },
    {
      name: "M",
      value: "m",
    },
    {
      name: "L",
      value: "l",
    },
    {
      name: "XL",
      value: "XL",
    },
    {
      name: "XXL",
      value: "XXL",
    },
  ];
  const shoeSize = [
    {
      name: "36",
      value: 36,
    },
    {
      name: "37",
      value: 37,
    },
    {
      name: "38",
      value: 38,
    },
    {
      name: "39",
      value: 39,
    },
  ];
  const colors = ["black", "green", "blue", "red"];
  const [priceFilter, setPriceFilter] = useState([0, 10000]);
  // const { filter, filterChange } = useProductStore();

  const handlePrice = debounce((price) => {
    setPriceFilter(price);
    filterChange({ price: price });
  }, 100);

  const { closeFilterBar } = useSidebarStore();

  return (
    <>
      <section className="2xl:pl-0 pl-2 lg:pr-0 pr-2 lg:overflow-y-hidden overflow-y-auto lg:static relative">
        <h2 className="lg:text-3xl text-xl font-semibold lg:pb-4 lg:pt-0 pb-2 pt-2 border-b-[rgb(230,230,230)] border-b-2">
          {t("products.filter.title")}
          <IoIosClose
            className="lg:hidden w-[2rem] h-[2rem] absolute top-2 right-2 cursor-pointer"
            onClick={closeFilterBar}
          />
        </h2>
        {/* gender category */}
        <section className="py-4 border-b-[rgb(230,230,230)] border-b-2">
          <h2 className="lg:text-3xl text-lg font-medium">
            {t("products.filter.gender.title")}
          </h2>
          <ul
            className="list-none mt-2 
        max-h-[14rem] overflow-y-auto overflow-x-hidden whitespace-nowrap
        scrollbar"
          >
            {gender.map((item, index) => (
              <OptionsFilter key={index} item={item} type="gender" />
            ))}
          </ul>
        </section>

        {/* filter category */}
        <section className="py-4 border-b-[rgb(230,230,230)] border-b-2">
          <h2 className="lg:text-3xl text-lg font-medium">
            {t("products.filter.category.title")}
          </h2>
          <ul
            className="list-none mt-2
        max-h-[14rem] overflow-y-auto overflow-x-hidden whitespace-nowrap
        scrollbar"
          >
            {category.map((item, index) => (
              <OptionsFilter key={index} item={item} type="category" />
            ))}
          </ul>
        </section>

        {/* Brand  */}
        <section className="py-4 border-b-[rgb(230,230,230)] border-b-2">
          <h2 className="lg:text-3xl text-lg font-medium">{t("products.filter.brand")}</h2>
          <ul
            className="list-none mt-2 
        max-h-[14rem] overflow-y-auto overflow-x-hidden whitespace-nowrap
        scrollbar
        "
          >
            {brands.map((item, index) => (
              <OptionsFilter key={index} item={item} type="brand" />
            ))}
          </ul>
        </section>

        {/* Price  */}
        <section className="pt-4 pb-6 border-b-[rgb(230,230,230)] border-b-2">
          <h2 className="lg:text-3xl text-lg font-medium mb-4">
            {t("products.filter.price")}
          </h2>
          <span className="lg:text-xl font-bold opacity-50">
            {/* {formatPrice(priceFilter[0])} - {formatPrice(priceFilter[1])} */}
          </span>
          <RangeSlider
            min={0}
            max={100000}
            step={50}
            onInput={(value) => {
              handlePrice(value);
            }}
            defaultValue={priceFilter}
            className="mt-4 text-[rgb(223,176,42)]"
          />
        </section>

        {/*Size*/}
        <section
          // className={`py-4 border-b-[rgb(230,230,230)] border-b-2 ${
          //   filter?.category === "shoes" || filter?.category === "clothes"
          //     ? "block"
          //     : "hidden"
          // }`}
        >
          <h2 className="lg:text-3xl text-lg font-medium">{t("products.filter.size")}</h2>
          <ul
            className="list-none mt-2 
        max-h-[14rem] overflow-y-auto overflow-x-hidden whitespace-nowrap
        scrollbar"
          >
            {/* {filter.category === "shoes"
              ? shoeSize.map((item, index) => (
                  <OptionsFilter key={index} item={item} type="size" />
                ))
              : clothesSize.map((item, index) => (
                  <OptionsFilter key={index} item={item} type="size" />
                ))} */}
          </ul>
        </section>

        {/* color  */}
        <section className="pt-4 pb-6 border-b-[rgb(230,230,230)] border-b-2">
          <h2 className="lg:text-3xl text-lg font-medium mb-4">
            {t("products.filter.color")}
          </h2>
          <ul className="list-none">
            {colors.map((color, index) => (
              <ColorFilter color={color} key={index} />
            ))}
          </ul>
        </section>
      </section>

      <button 
        className="lg:hidden block py-2 w-full bg-[rgb(62,24,0)] text-white font-bold text-xl"
        onClick={closeFilterBar}
        >
        {t("products.filter.done")}
      </button>
    </>
  );
};
export default ProductsFilter;
