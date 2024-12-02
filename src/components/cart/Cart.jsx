import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { FaTrash } from "react-icons/fa6"
import { toast } from "react-toastify"
import { toastOption } from "../../utils/toastify"
import { formatPrice } from "../../utils/format"
import emptyCart from "../../assets/emptycart.svg";
import { getCartItem } from "../../api/product"
// import { useUserStorage } from "../../states/user"

const Product = ({ product, totalPrice, setTotalPrice }) => {
    const [isShow, setShow] = useState(true);
    const { t } = useTranslation("global");
    const [quantity, setQuantity] = useState(product.item.cartAmount);
    const handleDelete = () => {
        const items = JSON.parse(localStorage.getItem("cart"));
        const updatedItems = items.filter(item => item.id !== product.item.id);
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        setTotalPrice(totalPrice - quantity * (product.price + product.item.bonusPrice) * (100 - product.sale) / 100);
        toast.success("Delete Sucessfully", toastOption);
        setShow(false);
    }
    const handleChangeQuantity = (type) => {
        var newQuantity = 0;
        if (type == "minus") {
            if (quantity > 1)
                newQuantity = quantity - 1;
            else return;
        }
        else {
            if (quantity >= product.item.quantity) {
                toast.error(t("product.stock.max"), toastOption);
                return;
            }
            else newQuantity = quantity + 1;
        }
        setTotalPrice(totalPrice + (newQuantity - quantity) * (product.price + product.item.bonusPrice) * (100 - product.sale) / 100);
        setQuantity(newQuantity);
        const items = JSON.parse(localStorage.getItem("cart"));
        const updatedItems = items.map(item => {
            if (item.id === product.item.id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        localStorage.setItem("cart", JSON.stringify(updatedItems));
    }
    return (
        <>{isShow &&
            <div className="w-full md:h-auto h-[8rem] flex flex-row justify-start 
            items-center md:px-0 px-2 py-4 border-b-2 md:last:border-b-2 last:border-none
             border-[rgb(230,230,230)] md:mb-0 mb-2 relative">

                {!product.item.quantity && <div className="w-full h-full absolute bg-[rgba(158,0,2,0.1)] text-[rgb(158,0,2)]
                     sm:text-lg text-center font-bold flex flex-col justify-center items-center z-10"
                    style={{ backdropFilter: "blur(2px)" }}
                >
                    <p>{t("product.stock.out")}</p>
                    <p className="text-black">{t("product.out")}</p>
                </div>}

                <span className="md:w-1/2 w-full md:text-xl flex flex-row md:space-x-4 space-x-2 items-center">
                    <img className="md:w-[10rem] object-contain md:min-h-[10rem] w-[7rem]
                        max-h-[6rem] md:shadow-lg rounded-lg"
                        src={product?.productImage} alt="" />
                    <div className="flex md:w-auto w-full flex-col md:justify-center justify-between md:space-y-4 space-y-2">
                        <p className="w-full md:max-h-[56px] max-h-[44px] text-wrap truncate font-medium">{product?.productName}</p>
                        <div className="font-semibold opacity-70 
                        md:text-lg text-[12px]
                       w-fit
                    ">
                            <span className="capitalize">{t("cart.color")} {product?.item.color} |</span>
                            <span> {t("cart.size")} {product?.item.size}</span>
                        </div>
                        <div className="md:hidden flex flex-row justify-between items-center">
                            <div className="font-medium text-lg">{formatPrice(product?.price + product.item.bonusPrice, product?.sale)}</div>
                            <div className="w-full flex justify-between max-w-[7rem] border-2">
                                <span className="cursor-pointer px-2">-</span>
                                <span className="mx-4 text-center">{quantity}</span>
                                <span className="cursor-pointer px-2">+</span>
                            </div>
                        </div>
                    </div>
                </span>
                <span className="w-1/6 md:inline hidden text-xl text-center font-medium opacity-80">
                    {formatPrice(product?.price + product.item.bonusPrice, product?.sale)}
                </span>
                {(product?.sale) ? (
                    <div className="text-black opacity-30 text-xl  line-through">
                        {formatPrice(product?.price + product.item.bonusPrice)}
                    </div>)
                    : null
                }
                <span className="w-1/4 md:flex hidden justify-center text-xl font-medium">
                    <div className="w-full flex justify-between max-w-[10rem] border-2 py-2 px-4">
                        <span className="cursor-pointer px-2"
                            onClick={() => handleChangeQuantity("minus")}
                        >-</span>
                        <span className="mx-4 text-center w-4/5">{quantity}</span>
                        <span className="cursor-pointer px-2" onClick={() => handleChangeQuantity("add")}>+</span>
                    </div>
                </span>
                <span className="w-1/6 md:inline hidden  text-xl text-center font-medium">
                    {formatPrice((product?.price + product.item.bonusPrice) * quantity, product?.sale)}
                </span>
                <div className="md:w-[2rem] md:self-center self-start md:mt-0 mt-2 z-10 cursor-pointer float-right opacity-50">
                    <FaTrash className="md:w-[20px] md:h-[20px]" onClick={handleDelete} />
                </div>
            </div>
        }
        </>
    )
}
const Cart = () => {
    const { t } = useTranslation("global");
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    async function fetchData() {
        const listCartItemsId = JSON.parse(localStorage.getItem("cart") || "[]");
        var productCartLst = [];
        for (var i = 0; i < listCartItemsId?.length; i++) {
            const product = await getCartItem(listCartItemsId[i]?.id);
            const productItem = product?.items[0];
            productItem["cartAmount"] = listCartItemsId[i]?.quantity;
            delete product["items"];
            product["item"] = productItem;
            productCartLst.push(product);
        }
        setCart(productCartLst);
    }
    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        setTotalPrice(getTotalPrice());
    }, [cart])
    const getTotalPrice = () => {
        var total = 0;
        for (var i = 0; i < cart?.length; i++) {
            total += (cart[i].price + cart[i].item.bonusPrice) * (100 - cart[i].sale) / 100 * cart[i].item.cartAmount;
        }
        return total;
    }
    const navigate = useNavigate();
    // const { user } = useUserStorage()
    // const handleCheckout = () => {
    //     if (!user) {
    //         toast.warning(t("cart.order.login"), toastOption)
    //     } else {
    //         sessionStorage.setItem("totalPrice", subTotal(cart) * 1.1)
    //         navigate("/checkout")
    //     }
    // }

    return (
        <div className="flex justify-center">
            {cart?.length === 0
                ?
                <div className="flex flex-col justify-center items-center space-y-6 sm:my-10 my-4">
                    <img src={emptyCart} alt="" />
                    <p className="sm:text-2xl font-bold text-red-500">{t("product.empty")}</p>
                    <Link to="/products">
                        <button className="sm:w-[25rem] w-[20rem] text-xl py-3 bg-[rgb(62,24,0)] text-white font-semibold">
                            {t("cart.order.back")}
                        </button>
                    </Link>
                </div>
                : <div className="w-full xl:flex max-w-screen-2xl xl:space-x-4 md:space-y-0 space-y-4 2xl:px-0 md:px-2">
                    <div className="xl:w-3/4 md:w-full">
                        <div className=" md:flex hidden w-full flex-row justify-start items-center py-2 bg-[rgb(244,189,98)]">
                            <span className="w-1/2 lg:pl-6 pl-2 text-xl font-medium">{t("cart.product")}</span>
                            <span className="w-1/6 text-xl text-center font-medium">{t("cart.price")}</span>
                            <span className="w-1/4 text-xl text-center font-medium">{t("cart.quantity")}</span>
                            <span className="w-1/6 text-xl text-center font-medium">{t("cart.sub")}</span>
                            <div className="w-[2rem]"></div>
                        </div>
                        {cart.map((product, index) => (
                            <Product key={index} product={product} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
                        ))}
                    </div>
                    <div className="xl:w-1/4 w-full h-fit border-2 md:px-6 px-2 py-2 border-[rgb(230,230,230)]">
                        <div className="space-y-4  py-2">
                            <div className="text-xl font-bold pb-2 border-b-2">{t("cart.order.title")}</div>
                            <div className="flex flex-row justify-between text-lg font-medium items-center">
                                <span className="opacity-70">{t("cart.order.item")}</span>
                                <span>{Array.isArray(cart) && cart?.length}</span>
                            </div>
                            <div className="flex flex-row justify-between text-lg font-medium items-center">
                                <span className="opacity-70">{t("cart.order.sub")}</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="flex flex-row justify-between text-lg font-medium items-center">
                                <span className="opacity-70">{t("cart.order.tax")}</span>
                                <span>{formatPrice(totalPrice / 10)}</span>
                            </div>
                            <div className="flex flex-row justify-between text-xl font-bold items-center border-t-2 pt-4">
                                <span>{t("cart.order.total")}</span>
                                <span>{formatPrice(totalPrice * 1.1)}</span>
                            </div>
                            <p className="text-center text-red-500 font-bold sm:text-base">({t("cart.order.ship")})</p>
                            <button className="w-full text-xl py-3 bg-[rgb(62,24,0)] text-white font-semibold"
                            // onClick={handleCheckout}
                            >
                                {t("cart.order.proceed")}
                            </button>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default Cart;
