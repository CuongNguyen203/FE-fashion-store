import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { toast } from "react-toastify";
import { toastOption } from "../../utils/toastify";
import { getProduct } from "../../api/product";
import { formatPrice } from "../../utils/format";
import RelatedProduct from "./RelatedProduct";
import ProductReview from "./ProductReview";

const ProductImg = ({ listImg, itemId }) => {
    const [activeImg, setActiveImg] = useState(0);
    useEffect(() => {
        setActiveImg(0);
    }, [itemId])
    const imgRef = useRef(null);
    const handlePrevImg = () => {
        setActiveImg(activeImg - 1);
        imgRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "end",
        });
    };
    const handleNextImg = () => {
        setActiveImg(activeImg + 1);
        imgRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
        });
    };

    const handleImg = (index) => {
        const inlineValue = index > activeImg ? "start" : "end";
        setActiveImg(index);
        imgRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: inlineValue,
        });
    };

    const handleScroll = (e) => {
        const container = e.target;
        const containerWidth = container.getBoundingClientRect().width;
        const scrollPosition = container.scrollLeft / listImg.length;
        const imgWidth = containerWidth / listImg.length;
        const activeIndex = Math.round(scrollPosition / imgWidth);
        setActiveImg(activeIndex);
    };

    const [fullScreen, setFullScreen] = useState(false);

    const handleFullScreen = () => {
        const element = document.getElementById("img-container");
        setFullScreen(true);
        element.requestFullscreen();
    };

    useEffect(() => {
        const handleFullScreenChange = () => {
            if (!document.fullscreenElement) {
                setFullScreen(false);
            }
        };
        document.addEventListener("fullscreenchange", handleFullScreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullScreenChange);
        };
    }, []);

    return (
        <div className="lg:w-1/2 p-8">
            <div className="relative w-full">
                <div
                    className={`absolute left-4 top-[50%] z-10 w-fit -translate-y-1/2 cursor-pointer rounded-[50%] bg-[rgb(244,189,98)] p-4 shadow-md ${activeImg > 0 ? "hidden lg:block" : "hidden"}`}
                    onClick={handlePrevImg}
                >
                    <FaAngleLeft className="h-[2rem] w-[2rem]" />
                </div>

                <img
                    className="hidden  xl:h-[500px] w-96 h-96 transition m-auto
                    duration-500 lg:block object-contain"
                    src={listImg[activeImg]}
                    alt="big image"
                />
                <div
                    id="img-container"
                    className="group/item relative flex items-center lg:hidden"
                >
                    <div
                        className="flex w-full snap-x snap-mandatory flex-row flex-nowrap items-center overflow-x-auto"
                        onScroll={handleScroll}
                    >
                        {listImg.map((item, index) => (
                            <img
                                key={index}
                                className={`h-full min-w-full snap-center ${fullScreen ? "" : "max-h-[400px] sm:max-h-[700px] md:max-h-[850px]"}
                                    group   transition duration-500`}
                                src={item}
                                alt="small image"
                                onClick={handleFullScreen}
                            />
                        ))}
                    </div>
                    <div
                        className="absolute bottom-4 right-4 block w-[5rem] rounded-2xl bg-white text-center 
                     text-base font-medium shadow-md sm:w-[8rem] sm:text-xl lg:hidden"
                    >
                        {activeImg + 1} / {listImg.length}
                    </div>
                </div>

                <div
                    className={`absolute right-4 top-[50%] z-10 
                w-fit -translate-y-1/2 cursor-pointer rounded-[50%] bg-white p-4 shadow-md ${activeImg === listImg.length - 1 ? "hidden" : "hidden lg:block"}`}
                    onClick={handleNextImg}
                >
                    <FaAngleRight className="h-[2rem] w-[2rem]" />
                </div>
            </div>
            <div className="mt-4 hidden w-full lg:block">
                <div className="flex w-full flex-nowrap overflow-hidden">
                    {listImg.map((item, index) => (
                        <div
                            key={index}
                            ref={activeImg === index ? imgRef : null}
                            className={`mr-2 h-fit max-h-[208px] min-h-[180px] min-w-[170px] cursor-pointer
                         ${activeImg == index ? "border-4 border-[rgb(62,24,0)] transition duration-500" : "border-4 border-transparent"}`}
                            onClick={() => handleImg(index)}
                        >
                            <img
                                className="max-h-[180px] lg:h-[180px] lg:w-[170px] h-auto w-full object-contain"
                                src={item}
                                alt="small image"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Color = ({ color, index, active, setActiveColor }) => {
    return (
        <li
            className="flex cursor-pointer items-center"
            onClick={() => setActiveColor(index)}
        >
            <div
                className={`flex sm:h-[3rem] h-[2rem] w-[2rem] sm:w-[3rem] items-center justify-center rounded-[50%]
                 border-[2px] border-[rgb(230,230,230)] bg-white`}
                style={{ borderColor: active == index ? color : "rgb(230,230,230)" }}
            >
                <div
                    className={`sm:h-[2.5rem] h-[1.5rem] sm:w-[2.5rem] w-[1.5rem] rounded-[50%]`}
                    style={{ backgroundColor: color }}
                ></div>
            </div>
        </li>
    );
};

const Size = ({ size, index, active, setActiveSize }) => {
    return (
        <div
            className="mr-6 mt-4 flex w-1/5 min-w-[7rem] cursor-pointer items-center justify-center 
            border-2 px-4 sm:py-3 py-1 text-lg font-medium sm:min-w-[7.5rem] sm:text-2xl"
            style={{ backgroundColor: index == active ? "rgb(245,189,98)" : "" }}
            onClick={() => setActiveSize(index)}
        >
            {size}
        </div>
    );
};

const Info = ({ colors, sizes, items, product }) => {
    const { t } = useTranslation("global");
    const [activeColor, setActiveColor] = useState(null);
    const [activeSize, setActiveSize] = useState(null);
    const [inStock, setInStock] = useState(null);
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        setActiveColor(null);
        setActiveSize(null);
    }, [])

    useEffect(() => {
        var temp = null;
        for (var i = 0; i < items?.length; i++) {
            if (items[i]?.color === colors[activeColor] && items[i]?.size === sizes[activeSize]) {
                temp = items[i];
                break;
            }
        }
        setInStock(temp);
        setQuantity(1);
    }, [activeSize, activeColor])
    const handleAddQuantity = () => {
        if (quantity < inStock?.quantity) {
            setQuantity(quantity + 1)
        }
        else {
            toast.error(t("product.stock.max"), toastOption)
        }
    }
    const handleAddToCart = () => {
        if (!inStock?.quantity || activeSize == null || activeColor == null) {
            toast.error(t("toast.cart.err"), toastOption);
        } else {
            const item = {
                id: inStock?.id,
                quantity: quantity
            }
            var items = JSON.parse(localStorage.getItem("cart") || "[]");
            var existingItem = false;
            for (var i = 0; i < items.length; i++) {
                if (item.id === items[i]?.id) {
                    existingItem = true;
                    items[i]=item;
                }
            }
            const parsedItems = existingItem ? [...items] : [...items, item];
            localStorage.setItem("cart", JSON.stringify(parsedItems));
            toast.success(t("toast.cart.success"), toastOption);
        }
    }
    return (
        <div className="p-10 lg:w-1/2 lg:px-0 lg:pl-6">
            <div className="w-full space-y-5">
                <h1 className="text-lg font-bold sm:text-3xl">{product?.productName}</h1>
                <div className="flex flex-row space-x-6">
                    <h1 className="text-lg font-semibold sm:text-3xl">
                        {
                            inStock ?
                                (product?.sale == 0
                                    ? formatPrice(product?.price + inStock?.bonusPrice)
                                    : formatPrice(product?.price + inStock?.bonusPrice, product?.sale)
                                ) : <span>&nbsp;</span>
                        }
                    </h1>
                    {(inStock && product?.sale) ? (
                        <div className="flex">
                            <div className="text-black opacity-30 text-lg sm:text-3xl line-through mx-4">
                                {formatPrice(product?.price + inStock?.bonusPrice)}
                            </div>
                            <div className="w-[5rem] h-[3rem]  p-2 bg-gray-200 text-[rgb(58,178,119)] font-bold">
                                {product?.sale}% off
                            </div>
                        </div>)
                        : null
                    }
                </div>
                <p className="w-full text-wrap text-2xl opacity-70 h-[15rem] break-words">
                    {product?.description}
                </p>
                <div className="space-y-3">
                    <p className="text-lg font-medium sm:text-2xl">
                        {t("product.color")}{" "}
                        <span className="font-normal capitalize opacity-90">
                            {" "}
                            {colors[activeColor]}
                        </span>
                    </p>
                    <ul className="flex flex-row space-x-4 overflow-x-auto lg:flex-wrap lg:overflow-x-hidden">
                        {colors.map((color, index) => (
                            <Color
                                key={index}
                                index={index}
                                color={color}
                                active={activeColor}
                                setActiveColor={setActiveColor}
                            />
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-lg font-medium sm:text-2xl">
                        {t("product.size")}{" "}
                        <span className="font-normal capitalize opacity-90">
                            {" "}
                            {sizes[activeSize]}
                        </span>
                    </p>
                    <ul className="flex flex-row overflow-x-auto lg:flex-wrap lg:overflow-x-hidden">
                        {sizes.map((size, index) => (
                            <Size key={index}
                                index={index}
                                size={size}
                                active={activeSize}
                                setActiveSize={setActiveSize}
                            />
                        ))}
                    </ul>
                </div>
                <div className="flex h-[47px] items-center justify-between sm:max-w-[90%]">
                    <div
                        className={`w-fit border-2 px-4 py-2 text-lg sm:text-xl font-medium ${activeColor != null && activeSize != null ? "block" : "hidden"}`}
                        style={{
                            borderColor: inStock?.quantity ? "rgb(74,188,120)" : "rgb(158,0,2)",
                            color: inStock?.quantity ? "rgb(74,188,120)" : "rgb(158,0,2)",
                            backgroundColor: inStock?.quantity
                                ? "rgba(74,188,120,0.1)"
                                : "rgba(158,0,2,0.1)",
                        }}
                    >
                        {inStock?.quantity ? t("product.stock.in") : t("product.stock.out")}
                    </div>
                </div>

                <div className="flex flex-row items-center">
                    <span className="mr-4 text-lg font-medium sm:text-2xl">
                        {t("product.quantity")}
                        <span>&nbsp;</span>
                        {inStock ? inStock.quantity : 0}
                    </span>
                    <button
                        className="sm:h-[4rem] h-[2rem] sm:w-[4rem] w-[3.5rem] border-[1px] text-center text-xl font-bold sm:text-2xl"
                        onClick={() => {
                            if (quantity > 1) setQuantity(quantity - 1);
                        }}
                    >
                        -
                    </button>
                    <input
                        className="sm:h-[4rem] h-[2rem] w-[3.5rem] border-[1px]  text-center text-xl font-bold sm:w-[10rem] sm:text-2xl"
                        type="text"
                        value={quantity}
                        // Number
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                    <button
                        className="sm:h-[4rem] h-[2rem] sm:w-[4rem] w-[3.5rem]  border-[1px] text-center text-xl font-bold sm:text-2xl"
                        onClick={handleAddQuantity}
                    >
                        +
                    </button>
                </div>

                <div className="flex flex-row justify-between space-x-2 pb-5">
                    <button
                        className={`w-3/4  sm:py-4 py-2  text-lg font-bold
                        text-white sm:w-5/6 sm:text-2xl ${inStock?.quantity ? "bg-[rgb(62,24,0)]" : "bg-[rgba(62,24,0,0.5)] cursor-not-allowed"}`}
                        onClick={handleAddToCart}
                    >
                        {t("product.add")}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductInfo = ({ productId }) => {
    const [product, setProduct] = useState({});
    const [imgs, setImgs] = useState([]);
    const [colors, setColors] = useState([]);
    useEffect(() => {
        async function fetchProduct() {
            setProduct(await getProduct(productId));
        };
        fetchProduct();
    }, []);
    useEffect(() => {
        const imgArr = [];
        const colorsArr = [];
        imgArr.push(product?.productImage);
        for (var i = 0; i < product?.items?.length; i++) {
            imgArr.push(product?.items[i].productImage);
            if (!colorsArr.includes(product?.items[i].color))
                colorsArr.push(product?.items[i].color);
        }
        setImgs(imgArr);
        setColors(colorsArr);
    }, [product])
    return (
        <section className="h-fit w-full max-w-screen-2xl lg:px-4 2xl:px-0">
            <div className="flex w-full flex-col lg:max-h-[1134px] lg:flex-row lg:py-10">
                <ProductImg listImg={imgs} productId={productId} />
                <Info
                    colors={colors}
                    sizes={["S", "M", "L", "XL", "XXL", "XXXL"]}
                    items={product?.items}
                    product={product}
                />
                {/* <ProductReview/> */}
                {/* <RelatedProduct/> */}
            </div>
        </section>
    );
};

export default ProductInfo;
