import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import notFoundImg from "../assets/notfound.svg";

const PageNotFound = () => {
    const { t } = useTranslation("global");
    const navigate = useNavigate();
    return (
        <>
            <div className="w-full flex justify-center">
                <div className="max-w-screen-2xl text-center h-screen space-y-8 flex flex-col justify-center items-center">
                    <p className="text-[26px] font-bold">{t("notfound")}</p>
                    <p className="max-w-[30rem] text-[rgb(99,115,129)]">{t("notfound-sub")}</p>
                    <img src={notFoundImg} alt="" />
                    <button className="bg-[rgb(62,24,0)] text-white w-[20rem] sm:py-4 py-2 font-bold" onClick={() => navigate("/")}>
                        {t("nfbtn")}
                    </button>
                </div>
            </div>
        </>
    )
}
export default PageNotFound;