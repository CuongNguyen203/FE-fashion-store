import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import backgroundImg from "../../assets/background.png"
import fashionNista from "../../assets/banner-img.png"

const HomeBanner = () => {

    const { t } = useTranslation("global");

    return (
        <section className="w-full relative">
            <img className="w-full lg:max-h-[40rem] min-h-[30rem] sm:max-h-[18rem]" src={backgroundImg} alt="" />
            <div className="absolute left-0 top-0 h-full w-full flex justify-center ">
                <div className="lg:container max-w-screen-2xl flex lg:flex-row justify-between items-center h-full sm:pt-10 pt-12">
                    <div className="mx-10 flex flex-col text-white lg:items-start lg:text-start text-center items-center lg:max-w-[54%] w-full pl-3 lg:pt-0 sm:pt-12">
                        <h1 className="xl:text-6xl lg:text-5xl sm:text-4xl text-2xl font-bold">{t("homepage.banner.title")}</h1>
                        <p className="xl:text-2xl sm:text-xl mt-8 opacity-50">{t("homepage.banner.description")}</p>
                        <Link to="/products">
                        <button className="bg-[rgb(62,24,0)] w-[16rem] px-4 py-6 mt-8 flex items-center justify-center font-medium">
                            {t("homepage.banner.button")}
                            <AiOutlineArrowRight className="mt-1 ml-3 color-white font-bold"/>
                        </button>
                        </Link>
                    </div>
                    <img className="lg:h-full lg:w-auto lg:max-h-full lg:block hidden" src={fashionNista} alt="" />
                </div>
            </div>
        </section>
    )
}

export default HomeBanner;