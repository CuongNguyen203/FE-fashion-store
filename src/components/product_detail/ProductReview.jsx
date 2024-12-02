import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa6";
import img from "../../assets/comment.png";
import { formatStar, fortmatFullDate } from "../../utils/format"
import { getReview } from "../../api/product";
// import Loading from "../Loading"

const Description = ({ description }) => {
    const sentences = description.split('.').filter(sentence => sentence.trim() !== '');
    return (
        <div className="space-y-4">
            {sentences?.map((sentence, index) => (
                <p key={index} className="text-black md:text-xl capitalize">
                    {sentence.trim()}.
                </p>
            ))}
        </div>
    );
}

const AddedInfor = () => {
    const { t } = useTranslation("global")
    return (
        <table className="table-auto w-full border-collapse border border-[rgb(230,230,230)]">
            <thead className=" w-full bg-[rgb(244,189,98)]">
                <tr className="w-full">
                    <th className="w-2/5 lg:pl-10 pl-6 py-4 text-xl text-start font-semibold">{t("product.add-infor.feat")}</th>
                    <th className="w-3/5 py-4 text-xl text-start font-semibold">{t("product.add-infor.des")}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="w-2/5 lg:pl-10 pl-6 py-4 text-xl font-normal">{t("product.add-infor.material")}</td>
                    <th className="w-3/5 py-4 text-xl text-start font-normal">Cotton</th>
                </tr>
                <tr className="bg-[rgb(245,245,245)]">
                    <td className="w-2/5 lg:pl-10 pl-6 py-4 text-xl font-normal">{t("product.add-infor.size")}</td>
                    <th className="w-3/5 py-4 text-xl text-start font-normal">S, M, L, XL, XXL, XXXL</th>
                </tr>
                <tr>
                    <td className="w-2/5 lg:pl-10 pl-6 py-4 text-xl font-normal">{t("product.add-infor.color")}</td>
                    <th className="w-3/5 py-4 text-xl text-start font-normal">Brown, Green, Blue, Red</th>
                </tr>
                <tr className="bg-[rgb(245,245,245)]">
                    <td className="w-2/5 lg:pl-10 pl-6 py-4 text-xl font-normal">{t("product.add-infor.country")}</td>
                    <th className="w-3/5 py-4 text-xl text-start font-normal">United States</th>
                </tr>
                <tr>
                    <td className="w-2/5 lg:pl-10 pl-6 py-4 text-xl font-normal">{t("product.add-infor.brand")}</td>
                    <th className="w-3/5 py-4 text-xl text-start font-normal">Nike</th>
                </tr>
            </tbody>
        </table>
    )
}

//review part

const Comment = ({ comment }) => {

    const { t } = useTranslation("global")

    const titles = {
        1: t("product.1star"),
        2: t("product.2star"),
        3: t("product.3star"),
        4: t("product.4star"),
        5: t("product.5star")
    };

    const title = titles[comment?.rating] || t("product.1star");

    return (
        <div className="w-full flex flex-col justify-start items-start space-y-4 pb-6 border-b-2 border-[rgb(230,230,230)]">
            <div className="flex w-full flex-row justify-between items-center">
                <div className="flex flex-row space-x-4">
                    <img className="w-[5rem] h-[5rem] rounded-[50%]" src={comment?.user_image} alt="" />
                    <div className="flex flex-col justify-around items-start">
                        <div className="sm:text-xl font-semibold">
                            {comment?.user_name}
                        </div>
                        <div className="text-base font-medium">
                            ({t("product.verify")})
                        </div>
                    </div>
                </div>
                <p className="text-sm xl:text-xl font-medium opacity-70">{fortmatFullDate(comment?.createdAt)}</p>
            </div>

            <p className="text-xl font-bold pt-4">{title}</p>
            <p>{comment?.comment}</p>
            <div className="flex flex-row space-x-2">
                {[...Array(comment?.rating)].map((_, index) => (
                    <FaStar key={index} className="h-6 w-6 text-[rgb(244,189,98)]" />
                ))}
                <p className="text-xl font-medium">{formatStar(comment?.rating)}</p>
            </div>
            {comment?.review_image?.length ? (
                <div className="flex flex-row space-x-3 w-full overflow-x-auto">
                    {comment?.review_image?.map((img, index) => (
                        <img key={index} className="max-h-[15rem] h-auto  cursor-pointer backdrop:w-full" src={img} alt />
                    ))}
                </div>) : null
            }
        </div>
    )
}

const Review = ({ id, rating }) => {
    const { t } = useTranslation("global")

    const [reviews, setReviews] = useState(null)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReview = async () => {
            const response = await getReview(id)
            setReviews(response?.review_percent?.reverse())
            setComments(response?.review_item)
            setLoading(false)
        }
        fetchReview()
    }, [id])

    const handleSort = (value) => {
        if (value === "newest") {
            const sortedComments = [...comments].sort((a, b) => {
                const createdAtA = new Date(a.createdAt);
                const createdAtB = new Date(b.createdAt);
                return createdAtB - createdAtA;
            });
            setComments(sortedComments);
        } else {
            const sortedComments = [...comments].sort((a, b) => {
                const createdAtA = new Date(a.createdAt);
                const createdAtB = new Date(b.createdAt);
                return createdAtA - createdAtB;
            });
            setComments(sortedComments);
        }
    }

    return (
        <div className="space-y-6">
            {comments.length
                ? <>
                <div className="flex flex-row pb-10  border-b-2 border-b-[rgb(230,230,230)]">
                    <div className="lg:w-1/4 md:w-1/3 min-h-[10rem] flex flex-col
                 items-center justify-around md:pr-0 pr-[7px] border-r-2 border-r-[rgb(230,230,230)]">
                        <div className="md:text-2xl font-normal">
                            <span className="md:text-4xl text-2xl font-bold">{rating}</span>
                            / 5</div>
                        <div className="md:space-x-2 space-x-1 flex flex-row">
                            <FaStar className="md:h-8 w-6 h-6 md:w-8 text-[rgb(244,189,98)]" />
                            <FaStar className="md:h-8 w-6 h-6 md:w-8 text-[rgb(244,189,98)]" />
                            <FaStar className="md:h-8 w-6 h-6 md:w-8 text-[rgb(244,189,98)]" />
                            <FaStar className="md:h-8 w-6 h-6 md:w-8 text-[rgb(244,189,98)]" />
                            <FaStar className="md:h-8 w-6 h-6 md:w-8 text-[rgb(244,189,98)]" />
                        </div>
                        <div className="md:text-xl">
                            ({comments?.length} {" "} {t("product.reviews")})
                        </div>
                    </div>
                    {loading
                        ?
                        <div className="w-full h-full flex justify-center items-center min-h-[10rem]">
                            <Loading />
                        </div>

                        :
                        <div className="lg:w-4/5 md:w-2/3 w-full flex flex-col justify-between pl-[5%]">
                            {Array.isArray(reviews) && reviews?.map((review, index) => (
                                <div key={index} className="flex flex-row items-center space-x-8">
                                    <span className="md:text-xl min-w-[2.7rem] font-semibold">{review?.star} {t("product.star")}</span>
                                    <div className="md:w-[80%] w-full h-3 bg-[rgb(238,238,238)] rounded-2xl relative">
                                        <div className="h-3 absolute z-10 bg-[rgb(244,189,98)] rounded-2xl"
                                            style={{ width: review?.percent }}
                                        >
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>

                    <div className="w-full">

                        <div className="flex flex-row justify-between md:min-h-20">
                            <div className="flex flex-col justify-between">
                                <h1 className="md:text-2xl text-xl font-semibold">{t("product.review-list")}</h1>
                                <p>
                                    {t("products.show")} 1 - {comments?.length} {t("products.of")} {comments?.length} {" "}
                                    {t("products.result")}
                                </p>
                            </div>
                            <div className="flex flex-row items-center text-xl sm:mt-0 mt-2">
                                <span className="sm:block hidden">{t("products.sort.title")}</span>
                                <select
                                    name="sort"
                                    className="border-2 px-4 sm:ml-2 ml-0 py-1 font-medium"
                                    onChange={(e) => handleSort(e.target.value)}
                                >
                                    <option value="newest">{t("product.new")}</option>
                                    <option value="oldest">{t("product.old")}</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-[3rem] space-y-4">
                            {loading
                                ? <div className="w-full h-full flex justify-center items-center min-h-[10rem]">
                                    <Loading />
                                </div>
                                : Array.isArray(comments) && comments?.map((comment, index) => (
                                    <Comment key={index} comment={comment} />
                                ))
                            }
                        </div>

                    </div>
                </>
                : 
                loading
                    ?
                    <div className="w-full h-full flex justify-center items-center min-h-[10rem]">
                        <Loading />
                    </div>
                    :  <div className="w-full h-full flex flex-col justify-start items-center">
                    <div className="sm:h-[17rem] h-[8rem] overflow-hidden"><img src={img} className="sm:w-[20rem] w-[10rem] h-[10rem] sm:h-[20rem]" alt="Comment IMG" /></div>
                    <p className="sm:text-xl px-10 text-center font-semibold text-[rgb(62,24,0)]">{t("product.no-review")}</p>
                </div>
                
            }
        </div>
    )
}

const ProductReview = ({ id, rating, description }) => {
    const { t } = useTranslation("global")
    const [activeContent, setActiveContent] = useState(0)
    return (
        <section className="w-full h-fit max-w-screen-2xl 2xl:px-0 lg:px-4 mt-10">
            <div className="w-full flex flex-row justify-around overflow-x-auto">
                <span className={`lg:text-3xl sm:text-2xl text-xl pb-3 font-bold text-center min-w-[12rem] ${activeContent == 0 ? "border-b-4 border-[black]" : "opacity-50 cursor-pointer"}`} onClick={() => setActiveContent(0)}>{t("product.description")}</span>
                <span className={`lg:text-3xl sm:text-2xl text-xl pb-3 font-bold text-center min-w-[14rem] ${activeContent == 1 ? "border-b-4 border-[black]" : "opacity-50 cursor-pointer"}`} onClick={() => setActiveContent(1)}>{t("product.add-infor.title")}</span>
                <span className={`lg:text-3xl sm:text-2xl text-xl pb-3 font-bold text-center min-w-[8rem] ${activeContent == 2 ? "border-b-4 border-[black]" : "opacity-50 cursor-pointer"}`} onClick={() => setActiveContent(2)}>{t("product.review")}</span>
            </div>
            <div className="w-full md:min-h-[30rem] h-fit px-4 py-10 border-t-2 border-[rgb(230,230,230)]">
                {activeContent == 0 ? (<Description description={description}/>) : activeContent == 1 ? (<AddedInfor />) : (<Review id={id} rating={rating} />)}
            </div>
        </section>
    )
}

export default ProductReview;