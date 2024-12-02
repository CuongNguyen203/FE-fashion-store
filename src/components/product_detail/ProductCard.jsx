import { AiFillStar, AiOutlineFullscreen, AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/format";

const ProductCard = ({ product }) => {
  const id = product?.id;
  const handleFullScreen = (event) => {
    event.preventDefault();
    const element = document.getElementById(id);
    element.requestFullscreen();
  };
  const handleLastSeenProduct = () => {
    const items = JSON.parse(localStorage.getItem('lastSeenProducts') || "[]");
    const existingItemIndex = items.indexOf(id);
    if (existingItemIndex !== -1) {
      items.splice(existingItemIndex, 1);
    }
    items.push(id);
    if (items.length > 4) {
      items.shift();
    }
    localStorage.setItem('lastSeenProducts', JSON.stringify(items));
  }

  return (
    <div className="w-full h-fit">
      <Link to={`/product/${id}`} onClick={handleLastSeenProduct}>
        <div className="w-full h-fit min-h-[25rem] 
            overflow-hidden bg-[rgb(255,255,255)] relative
            group/item cursor-pointer shadow-lg ">
          <img id={id} className="h-auto min-h-[25rem] w-full absolute object-contain" src={product?.productImage} alt="" loading="lazy" />
          {product?.sale != 0 &&
            <div className="w-[4rem] h-[3rem] flex items-center mx-5 bg-gray-200 justify-center absolute text-[rgb(58,178,119)] font-bold">
              {product?.sale}% off
            </div>
          }
          <div className="flex-col absolute right-2 top-2 lg:hidden md:group-hover/item:flex flex">
            <button className="w-[3rem] h-[3rem] mb-2 bg-white flex items-center justify-center rounded-[50%]">
              <AiOutlineHeart className="w-[1.5rem] h-[1.5rem]" />
            </button>
            <button className="w-[3rem] h-[3rem]  mb-2  bg-white flex items-center justify-center rounded-[50%]" onClick={handleFullScreen}>
              <AiOutlineFullscreen className="w-[1.5rem] h-[1.5rem]" />
            </button>
            <button className="w-[3rem] h-[3rem]  bg-white flex items-center justify-center rounded-[50%]">
              <AiOutlineShopping className="w-[1.5rem] h-[1.5rem]" />
            </button>
          </div>
        </div>
      </Link>
      <div className="mt-4">
        <div className="flex justify-between">
          <p className="sm:text-xl text-lg font-bold mb-2 truncate">
            {product?.productName}
          </p>
          <div className="flex flex-row justify-center items-start">
            <AiFillStar className="w-[1.5rem] h-[1.7rem] text-[rgb(244,189,98)]" />
            <span className="ml-2 font-medium sm:text-xl text-lg">{product?.rating}</span>
          </div>
        </div>
        <p className="sm:text-xl text-lg font-semibold text-[rgb(210,0,0)]">
          {product?.sale == 0 ?
            formatPrice(product?.price) : formatPrice(product?.price, product?.sale)
          }
          {product?.sale ?
            <span className="text-black opacity-40 line-through ml-4">
              {formatPrice(product?.price)}
            </span> : null
          }
        </p>
      </div>
    </div >
  );
};

export default ProductCard;
