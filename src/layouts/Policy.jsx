import { useTranslation } from "react-i18next";
import { LiaCreditCard, LiaHeadphonesSolid, LiaShippingFastSolid } from "react-icons/lia";

const Policy = () => {
  const { t } = useTranslation("global");
  return (
    <section className="w-full flex lg:justify-center justify-start p-8">
      <div className="max-w-screen-2xl w-full flex lg:justify-between justify-center lg:flex-row flex-col px-3">
        <div className="flex flex-row items-center max-w-[26rem] 
                    lg:mb-0 mb-6 relative before:content before:w-10 before:h-10 
                    before:bg-[rgb(244,189,98)] before:absolute before:rounded-[50%] before:z-[-1] 
                    before:sm:left-8 before:left-4 before:sm:top-6 before:top-4">
          <LiaShippingFastSolid className="sm:w-[4rem] w-[3rem] sm:h-[4rem] h-[3rem] mr-4" />
          <div className="flex flex-col items-start">
            <p className="font-semibold sm:text-2xl text-xl">
              {t("homepage.policy.shipping.title")}
            </p>
            <p className="sm:text-bast text-sm">{t("homepage.policy.shipping.detail")}</p>
          </div>
        </div>
        <div className="flex flex-row items-center max-w-[26rem] relative 
                    lg:mb-0 mb-6 before:content before:w-10 before:h-10 
                    before:bg-[rgb(244,189,98)] before:absolute before:rounded-[50%] before:z-[-1] 
                    before:sm:left-8 before:left-4 before:sm:top-6 before:top-4">
          <LiaCreditCard className="sm:w-[4rem] w-[3rem] sm:h-[4rem] h-[3rem] mr-4" />
          <div className="flex flex-col items-start">
            <p className="font-semibold  sm:text-2xl text-xl">
              {t("homepage.policy.payment.title")}
            </p>
            <p className="sm:text-bast text-sm">{t("homepage.policy.payment.detail")}</p>
          </div>
        </div>
        <div className="flex flex-row items-center max-w-[26rem] relative
                  before:content before:w-10 before:h-10 
                  before:bg-[rgb(244,189,98)] before:absolute
                  before:rounded-[50%] before:z-[-1] before:sm:left-8 before:left-4 before:sm:top-6 before:top-4">
          <LiaHeadphonesSolid className="sm:w-[4rem] w-[3rem] sm:h-[4rem] h-[3rem] mr-4" />
          <div className="flex flex-col items-start">
            <p className="font-semibold sm:text-2xl text-xl">
              {t("homepage.policy.support.title")}
            </p>
            <p className="sm:text-bast text-sm">{t("homepage.policy.support.detail")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Policy;
