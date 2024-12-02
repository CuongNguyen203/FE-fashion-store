import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageTitle from "../layouts/PageTitle";
import ProductInfo from "../components/product_detail/ProductInfo";
// import DetailReview from "../detail-review";
// import RelatedProduct from "../related-product";

const ProductDetailPage = () => {
    const { t } = useTranslation("global");
    const { id } = useParams();
    return (
        <>
            <PageTitle title={t("page-title.product")} subtitle={t("page-title.product-sub")} />
            <div className="flex flex-col items-center pb-6">
                <ProductInfo productId={id} />
                {/* <DetailReview id={id} rating={product?.product?.rating} description={product?.product?.description} /> */}
                {/* <RelatedProduct id={productId} /> */}
            </div>
        </>
    );
};
export default ProductDetailPage;
