import { useTranslation } from "react-i18next";
import { SiAdidas, SiJordan, SiNewbalance, SiNike, SiPuma } from "react-icons/si";
import shoesImg from "../../assets/shoes1.png";
import clothesImg from "../../assets/clothes1.png";
import accesoriesImg from "../../assets/accesories1.png";

const HomeProduct = () => {
  const { t } = useTranslation("global");

  return (
    <section className="w-full flex justify-center mt-8">
      <div className="w-full max-w-screen-2xl flex lg:flex-row flex-col justify-between lg:h-[55rem]">
        <div className="h-full bg-[rgb(245,245,245)] lg:w-[49%] w-full py-3 pl-8 relative">
          <div className="w-fit px-4 py-2 rounded-3xl bg-white">
            <span className="text-2xl font-medium">2000+ </span>
            {t("homepage.product.items")}
          </div>
          <h2 className="font-bold lg:text-6xl text-4xl my-8">
            {t("homepage.product.shoes.title")}
          </h2>
          <div className="text-2xl relative z-10 flex items-center w-fit hover:opacity-100 mb-8 mt-0 opacity-60  cursor-default">
            <SiNike className="w-[2rem] h-[2rem] mr-2" /> <span>Nike</span>
          </div>
          <div className="text-2xl relative z-10 w-fit flex items-center hover:opacity-100 my-8 opacity-60  cursor-default">
            <SiAdidas className="w-[2rem] h-[2rem] mr-2" /> <span>Adidas</span>
          </div>
          <div className="text-2xl relative z-10 w-fit flex items-center hover:opacity-100 my-8 opacity-60  cursor-default">
            <SiPuma className="w-[2rem] h-[2rem] mr-2" /> <span>Puma</span>
          </div>
          <div className="text-2xl relative z-10 w-fit flex items-center hover:opacity-100 my-8 opacity-60  cursor-default">
            <SiJordan className="w-[2rem] h-[2rem] mr-2" /> <span>Jordan</span>
          </div>
          <div className="text-2xl relative z-10 w-fit flex items-center hover:opacity-100 my-8 opacity-60  cursor-default">
            <SiNewbalance className="w-[2rem] h-[2rem] mr-2" />{" "}
            <span>New Balance</span>
          </div>
          <div className="text-2xl relative z-10 w-fit flex items-center  hover:opacity-100 my-8 opacity-60  cursor-default">
            <span>{t("homepage.product.shoes.all")}</span>
          </div>
          <img
            className="h-[80%] bg-transparent absolute lg:top-44 top-24 right-0 sm:opacity-100 lg:opacity-40 2xl:opacity-100 opacity-40"
            src={shoesImg}
            alt=""
          />
        </div>

        <div className="h-full lg:w-[49%] flex flex-col justify-between">

          <div className="lg:h-[49%] h-full w-full  lg:mt-0 mt-4  bg-[rgb(245,245,245)] py-3 pl-8 relative">
            <div className="w-fit px-4 py-2 rounded-3xl bg-white">
              <span className="text-2xl font-medium">2000+ </span>
              {t("homepage.product.items")}
            </div>
            <h2 className="font-bold lg:text-6xl text-4xl my-8">
              {t("homepage.product.clothes.title")}
            </h2>
            <div className="text-2xl z-10 relative flex items-center w-fit hover:opacity-100 mb-4 mt-0 opacity-60  cursor-default">
              {t("homepage.product.clothes.blazer")}
            </div>
            <div className="text-2xl z-10 relative flex items-center w-fit hover:opacity-100 mb-4 opacity-60  cursor-default">
              {t("homepage.product.clothes.shirt")}
            </div>
            <div className="text-2xl z-10 relative  flex items-center w-fit hover:opacity-100 mb-4 opacity-60  cursor-default">
              {t("homepage.product.clothes.jeans")}
            </div>
            <div className="text-2xl z-10 relative flex items-center w-fit hover:opacity-100 mb-4 opacity-60  cursor-default">
              {t("homepage.product.clothes.jacket")}
            </div>
            <div className="text-2xl z-10 relative flex items-center w-fit hover:opacity-100 mb-4 opacity-60  cursor-default">
              {t("homepage.product.clothes.all")}
            </div>
            <img
              className="h-[80%] bg-transparent absolute top-20 right-4 sm:opacity-100 lg:opacity-40 xl:opacity-100 opacity-40"
              src={clothesImg}
              alt=""
            />
          </div>

          <div className="lg:h-[49%] h-full w-full  lg:mt-0 mt-4  bg-[rgb(245,245,245)] py-3 pl-8 relative">
            <div className="w-fit px-4 py-2 rounded-3xl bg-white">
              <span className="text-2xl font-medium">2000+ </span>
              {t("homepage.product.items")}
            </div>
            <h2 className="font-bold lg:text-6xl text-4xl my-8">
              {t("homepage.product.access.title")}
            </h2>
            <div className="text-2xl z-10 relative flex items-center w-fit hover:opacity-100 mb-4 mt-0 opacity-60  cursor-default">
              {t("homepage.product.access.watch")}
            </div>
            <div className="text-2xl z-10 relative flex items-center w-fit hover:opacity-100 mb-4 opacity-60  cursor-default">
              {t("homepage.product.access.bag")}
            </div>
            <div className="text-2xl z-10 relative  flex items-center w-fit hover:opacity-100 mb-4 opacity-60  cursor-default">
              {t("homepage.product.access.glass")}
            </div>
            <div className="text-2xl z-10 relative flex items-center w-fit hover:opacity-100 mb-4 opacity-60  cursor-default">
              {t("homepage.product.access.necklace")}
            </div>
            <div className="text-2xl z-10 relative flex items-center w-fit hover:opacity-100 mb-4 opacity-60  cursor-default">
              {t("homepage.product.access.all")}
            </div>
            <img
              className="h-[80%] bg-transparent absolute top-20 right-4 sm:opacity-100 lg:opacity-40 xl:opacity-100 opacity-40"
              src={accesoriesImg}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeProduct;
