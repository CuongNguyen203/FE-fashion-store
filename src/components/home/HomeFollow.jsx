import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {FaChevronLeft,FaChevronRight,FaFacebook,FaInstagram,FaTiktok} from "react-icons/fa6";
import test from "../../assets/shoes.jpg";

const socials = [
  {
    img: test,
    link: "https://www.facebook.com",
    type: "facebook",
  },
];

const FollowCard = ({ img, link, type }) => {
  return (
    <div className="md:w-[28rem] min-w-[360px]  md:h-[28rem] relative group/item transition-[slide] ">
      <a href={link} target="_blank">
        <img className="w-full h-full" src={img} alt="test" />
        <div className="cursor-pointer absolute w-full h-full top-0 bg-[rgba(0,0,0,0.5)] hidden group-hover/item:flex items-center justify-center">
          {type === "facebook" ? (
            <FaFacebook className="h-[4rem] w-[4rem] text-white" />
          ) : type === "instagram" ? (
            <FaInstagram className="h-[4rem] w-[4rem] text-white" />
          ) : (
            <FaTiktok className="h-[4rem] w-[4rem] text-white" />
          )}
        </div>
      </a>
    </div>
  );
};

const HomeFollow = () => {
  const { t } = useTranslation("global");
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollToLeft = () => {
    setShowRightArrow(true);
    containerRef.current.scrollLeft -= 400;
    if (containerRef.current.scrollLeft <= 10) {
      setShowLeftArrow(false);
    }
  };

  const scrollToRight = () => {
    setShowLeftArrow(true);
    containerRef.current.scrollLeft += 400;
    if (
      containerRef.current.scrollLeft >=
      containerRef.current.scrollWidth - containerRef.current.clientWidth
    ) {
      setShowRightArrow(false);
    }
  };

  return (
    <section className="w-full mt-8 bg-[rgb(245,245,245)] lg:py-32 py-16 relative">
      <div className="w-full text-center px-2">
        <h2 className="text-2xl font-semibold">{t("homepage.follow.title")}</h2>
        <h1 className="lg:text-4xl text-[28px] font-bold my-4">
          {t("homepage.follow.subtitle")}
        </h1>
      </div>

      {showLeftArrow && (
        <div
          className="absolute lg:block hidden top-[61%] -translate-y-1/2 left-2 z-10 bg-white p-2 rounded-[50%]"
          onClick={scrollToLeft}
        >
          <FaChevronLeft className="w-[2rem] h-[2rem] cursor-pointer" />
        </div>
      )}

      {showRightArrow && (
        <div
          className="absolute lg:block hidden top-[61%] -translate-y-1/2 right-2 z-10  bg-white p-2 rounded-[50%] min-[2200px]:hidden"
          onClick={scrollToRight}
        >
          <FaChevronRight className="w-[2rem] h-[2rem] cursor-pointer" />
        </div>
      )}

      <div
        className="w-full flex flex-row mt-16 lg:overflow-hidden overflow-x-auto whitespace-nowrap px-3"
        ref={containerRef}
      >
        {socials.map((social, index) => (
          <div
            key={index}
            className="inline-block w-fit mr-8 md:mr-8 lg:mt-8 lg:mr-6 last:mr-0 "
          >
            <FollowCard
              img={social.img}
              link={social.link}
              type={social.type}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeFollow;
