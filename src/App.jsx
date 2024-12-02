import i18next from "i18next";
import { Route, Routes } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import global_vn from "../src/translations/vn/global.json";
import global_en from "../src/translations/en/global.json";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import PageNotFound from "./layouts/PageNotFound";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";

i18next.init({
    interpolation: { escapeValue: false },
    lng: localStorage.getItem("language") || 'vn',
    resources: {
        vn: {
            global: global_vn
        },
        en: {
            global: global_en
        }
    }
});

const App = () => {
    return (
        <I18nextProvider i18n={i18next}>
            <MainLayout>
                <Routes>
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />

                </Routes>
            </MainLayout>
        </I18nextProvider>
    );
};
export default App;