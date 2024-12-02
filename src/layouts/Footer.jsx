import { useTranslation } from "react-i18next";
import { RiFacebookBoxFill, RiInstagramFill, RiTiktokFill, RiYoutubeFill } from "react-icons/ri";
import logo from "../assets/logo.png"

const Footer = () => {
  const { t } = useTranslation("global");

  return (
    <footer>
      <div className="w-full min-h-4 bg-[rgb(62,24,0)] flex flex-col justify-center items-center pb-10">
        <div className="container w-full max-w-screen-2xl flex items-center flex-row flex-wrap lg:flex-nowrap border-b-[1px] border-b-[rgb(105,76,60)] pb-10">
          <section className="lg:w-1/3 sm:w-2/3 w-full flex flex-col justify-start">
            <img
              className=" px-3 mb-3 max-w-[10rem]"
              src={logo}
              alt=""
            />
            <p className="text-[rgb(154,132,119)] px-3 mb-5 max-w-[20rem]">
              {t("footer.description")}
            </p>
            <div className="flex flex-row px-2 justify-between max-w-[20rem]">
              <a
                href="https://www.facebook.com"
                target="_blank"
              >
                <div className="rounded-[50%] bg-[rgb(87,53,32)] p-3 flex justify-center items-center">
                  <RiFacebookBoxFill className="text-white w-[1.55rem] h-[1.5rem]" />
                </div>
              </a>
              <a href="https://www.youtube.com" target="_blank">
                <div className="rounded-[50%] bg-[rgb(87,53,32)] p-3 flex justify-center items-center">
                  <RiYoutubeFill className="text-white w-[1.55rem] h-[1.5rem]" />
                </div>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
              >
                <div className="rounded-[50%] bg-[rgb(87,53,32)] p-3 flex justify-center items-center">
                  <RiInstagramFill className="text-white w-[1.55rem] h-[1.5rem]" />
                </div>
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
              >
                <div className="rounded-[50%] bg-[rgb(87,53,32)] p-3 flex justify-center items-center">
                  <RiTiktokFill className="text-white w-[1.55rem] h-[1.5rem]" />
                </div>
              </a>
            </div>
          </section>

          <section className="lg:w-1/6 sm:w-1/3 w-1/2 flex flex-col justify-start mt-4 sm:pl-0 px-4">
            <h5 className="text-white text-xl font-bold mb-2">
              {t("footer.company.title")}
            </h5>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.company.about")}
            </p>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.company.blog")}
            </p>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.company.contact")}
            </p>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.company.carrer")}
            </p>
          </section>

          <section className="lg:w-1/6 sm:w-1/3 w-1/2 flex flex-col justify-start mt-4 sm:px-4 lg:px-0">
            <h5 className="text-white text-xl font-bold mb-2">
              {t("footer.customer.title")}
            </h5>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.customer.account")}
            </p>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.customer.order")}
            </p>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.customer.return")}
            </p>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.customer.faq")}
            </p>
          </section>


          <section className="lg:w-1/6 sm:w-1/3 w-1/2 flex flex-col justify-start mt-4 px-4 lg:px-0">
            <h5 className="text-white text-xl font-bold mb-2">
              {t("footer.in4.title")}
            </h5>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.in4.account")}
            </p>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.in4.order")}
            </p>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.in4.return")}
            </p>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.in4.faq")}
            </p>
          </section>

          <section className="lg:w-1/6 sm:w-1/3 w-1/2 flex flex-col justify-start mt-4 ">
            <h5 className="text-white text-xl font-bold mb-2">
              {t("footer.contact.title")}
            </h5>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.contact.account")}
            </p>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.contact.order")}
            </p>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.contact.return")}
            </p>
            <p className="text-[rgb(154,132,119)] mt-4 font-semibold hover:cursor-pointer hover:underline">
              {t("footer.contact.faq")}
            </p>
          </section>
        </div>
        <div className="w-full max-w-screen-2xl flex items-center justify-center pt-10 px-10 text-center text-lg text-white font-medium">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
