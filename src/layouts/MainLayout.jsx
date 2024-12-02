import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import { useSidebarStore } from "../states/sidebar";
import Policy from "./Policy";
// import SearchView from "./SearchView";
// import { useUserStorage } from "../states/user";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const { sideBarOpen, searchOpen } = useSidebarStore();
  // const { fetchUserData } = [];
  // useUserStorage()
  useEffect(() => {
    // fetchUserData();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return (
    <>
      <Header />
      {/* <SearchView /> */}
      {sideBarOpen || searchOpen &&
        <div className="w-full h-screen bg-black bg-opacity-80 top-0 left-0 fixed z-30 pointer-events-none overflow-hidden"></div>
      }
      <main className={`${searchOpen || sideBarOpen ? "touch-none pointer-events-none :" : ""}`}>
        {children}
        <ToastContainer />
      </main>
      <Policy />
      <Footer />
    </>
  );
};

export default MainLayout;
