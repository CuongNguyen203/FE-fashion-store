import { useTranslation } from "react-i18next";
import { useSidebarStore } from "../states/sidebar";
import PageTitle from "../layouts/PageTitle";
import ProductsData from "../components/products/ProductsData";
import ProductsFilter from "../components/products/ProductsFilter";

const ProductsPage = () => {
  const { t } = useTranslation("global");
  const { filterBarOpen } = useSidebarStore();
  return (
    <section className="pb-6">
      <PageTitle
        title={t("page-title.shop")}
        subtitle={t("page-title.shop-sub")}
      />
      <div className="flex w-full sm:py-16 py-6 bg-white justify-center">
        <div className="w-full h-fit max-w-screen-2xl flex flex-row">
          {/* <div className={`lg:w-1/5 ml-10 lg:block ${filterBarOpen ? "block w-full fixed overflow-auto h-screen top-0 z-50 bg-white" : "hidden"}`}>
            <ProductsFilter />
          </div>
          <div className="lg:w-4/5 w-full mr-10 md:pl-6 pl-2 max-2xl:pr-2 relative">
            <ProductsData />
          </div> */}
          <div className="mx-10 w-full">
            <ProductsData />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
