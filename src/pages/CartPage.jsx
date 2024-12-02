import { useTranslation } from "react-i18next";
import PageTitle from "../layouts/PageTitle";
import Cart from "../components/cart/Cart";

const CartPage = () => {
    const {t} = useTranslation("global")
    return(
        <section className="pb-6 md:space-y-6">
            <PageTitle
             title={t("page-title.cart")}
             subtitle={t("page-title.cart-sub")}
            />
            <Cart/>
        </section>
    )
}

export default CartPage;