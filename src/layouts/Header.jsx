import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RiSearch2Line } from "react-icons/ri";
import { AiOutlineArrowLeft, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useSidebarStore } from "../states/sidebar";
import vnIcon from "../assets/vn.jpg"
import usIcon from "../assets/us.jpg"
import logo from "../assets/logo.png"

const Header = () => {
  const [changeLanguage, setChangeLanguage] = useState(false);
  const { t, i18n } = useTranslation("global");
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const { sideBarOpen, toggleSideBar, closeSideBar, toggleSearch } = useSidebarStore();
  // const { filterChange } = useProductStore()
  const navigation = useNavigate()
  const handleNav = (filter) => {
    // if (filter == "accesories") {
    //   filterChange({ category: "accessories" });
    // }
    // else filterChange({ gender: filter });
    navigation("/products");
    closeSideBar();
  }

  return (
    <header>
      <div className="w-full bg-white sm:max-h-[5rem] max-h-[4rem] flex justify-center z-50 fixed shadow-2xl">
        <nav className="container w-full max-w-screen-2xl flex justify-between items-center flex-row">
          <div className="w-1/3 min-w-[7.5rem] px-2 flex items-center justify-start space-x-3 cursor-pointer lg:hidden">
            <RxHamburgerMenu
              className="w-[1.5rem] h-[1.5rem] font-medium "
              onClick={() => toggleSideBar()}
            />
            <RiSearch2Line className="w-[1.5rem] h-[1.5rem] font-medium" onClick={toggleSearch} />
          </div>
          <div className="w-[10rem] flex items-center overflow-hidden justify-start hover:cursor-pointer">
            <Link to="/">
              <img src={logo} className="sm:w-[10rem] sm:max-h-none max-h-[5rem] sm:scale-100 scale-[1.2]" />
            </Link>
          </div>
          <div
            className={`lg:w-2/3 lg:flex lg:static lg:justify-around lg:mb-1 lg:h-auto
                lg:shadow-none lg:p-0 shadow w-[20rem] absolute sm:top-[5rem] top-[56px] left-0 z-10 h-[52rem] transition-all
                 bg-white ${sideBarOpen ? "block h-screen sm:w-[20rem] w-screen" : "hidden"}`}
          >
            <div
              className={`text-lg hover:cursor-pointer lg:py-0 p-2 text-white font-bold bg-[rgb(227,191,54)] 
                ${sideBarOpen ? "block" : "hidden"} text-center relative`}
            >
              <AiOutlineArrowLeft
                className="absolute top-[14px]"
                onClick={() => closeSideBar()}
              />
              {t("header.category")}
            </div>

            <Link to="/products" onClick={closeSideBar}>
              <div className="text-lg font-medium hover:cursor-pointer lg:p-4  p-2 hover:text-[rgb(219,168,44)]">
                {t("header.shop")}
              </div>
            </Link>

            <div className="text-lg font-medium hover:cursor-pointer lg:p-4  p-2 hover:text-[rgb(219,168,44)]"
              onClick={() => handleNav("female")}
            >
              {t("header.women")}
            </div>
            <div className="text-lg font-medium hover:cursor-pointer lg:p-4  p-2 hover:text-[rgb(219,168,44)]"
              onClick={() => handleNav("male")}
            >
              {t("header.men")}
            </div>
            <div className="text-lg font-medium hover:cursor-pointer lg:p-4  p-2 hover:text-[rgb(219,168,44)]"
              onClick={() => handleNav("kid")}
            >
              {t("header.kid")}
            </div>
            <div className="text-lg font-medium hover:cursor-pointer  lg:p-4 p-2 hover:text-[rgb(219,168,44)]"
              onClick={() => handleNav("accesories")}
            >
              {t("header.accessories")}
            </div>
            <div className="text-lg font-medium hover:cursor-pointer  lg:p-4 p-2 hover:text-[rgb(219,168,44)]">
              {t("header.about")}
            </div>
            <div className="text-lg font-medium hover:cursor-pointer lg:p-4  p-2 hover:text-[rgb(219,168,44)]">
              {t("header.contact")}
            </div>
          </div>
          <div className="lg:w-1/6 sm:w-1/4 md:min-w-[8rem] flex items-center justify-end">

            <div className="w-1/5 lg:flex hidden items-center justify-start cursor-pointer sm:mx-0"
              // onClick={toggleSearch}
            >
              <RiSearch2Line className="w-[1.5rem] h-[1.5rem] font-medium" />
            </div>

            <Link className="sm:w-1/5 w-[2rem] sm:mx-0 mx-1" to="/cart">
              <div className="w-full flex items-center sm:justify-start justify-center cursor-pointer">
                <AiOutlineShoppingCart className="w-[1.5rem] h-[1.5rem] font-medium" />
              </div>
            </Link>
            <Link className="sm:w-1/5 w-[2rem]" to='/account'>
              <div className="flex items-center sm:justify-start justify-center cursor-pointer sm:mx-0 ">
                <IoPersonOutline className="w-[1.5rem] h-[1.5rem] font-medium" />
              </div>
            </Link>
            <div
              className="sm:w-[52px] w-[40px] flex items-center cursor-pointer relative"
              onClick={() => setChangeLanguage(!changeLanguage)}
            >
              {i18n.language == "vn" ? (
                <img
                className="w-[40px]"                  
                src={vnIcon}
                  alt="vn_language"
                />
              ) : (
                <img
                  className="w-[40px]"
                  src={usIcon}
                  alt="en_language"
                />
              )}
              {changeLanguage && (
                <div className="absolute shadow w-36 top-10 right-1 rounded-xl transition-transform z-20 bg-white">
                  <div
                    className="flex row items-center px-1 py-1 hover:bg-[rgb(237,244,254)] rounded-t-xl"
                    onClick={() => handleChangeLanguage("vn")}
                  >
                    <img
                      className="w-[25px]"
                      src={vnIcon}
                      alt="vn_language"
                    />
                    <span className="font-semibold">
                      {t("header.language.vn")}
                    </span>
                  </div>
                  <div
                    className="flex row items-center px-1 py-1 rounded-b-xl hover:bg-[rgb(237,244,254)]"
                    onClick={() => handleChangeLanguage("en")}
                  >
                    <img
                      className="w-[25px]"
                      src={usIcon}
                      alt="vn_language"
                    />
                    <span className="font-semibold">
                      {t("header.language.en")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
