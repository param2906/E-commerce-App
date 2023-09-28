import Carousel from "react-material-ui-carousel"
import Styles from "./productDetails.module.css";
import Image from "next/image";
import { useEffect,useState } from "react"
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { getProductDetails } from "@/actions/productAction";
import { useRouter } from 'next/router'
import { Rating } from "@mui/material"
import ReviewCard from "@/component/product/ReviewCard";
import Loader from "@/component/layout/Loader/Loader";
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import {Button} from "@mui/base"
import { AddItemtoCart } from "@/actions/cartAction";
import { newReview } from "@/actions/productAction";

const productDetails = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { loading, error, product } = useAppSelector<any>((state) => state.productDetails)
    const { success, error: reviewError } = useAppSelector<any>(
        (state) => state.newReview
      )
    const options: any = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState<any>("");
    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
    
        const qty = quantity + 1;
        setQuantity(qty);
      };
    
      const decreaseQuantity = () => {
        if (1 >= quantity) return;
    
        const qty = quantity - 1;
        setQuantity(qty);
      };
      console.log(quantity)
      const addToCartHandler = () => {
        console.log("adsfsaf")
        dispatch(AddItemtoCart(router.query.id, quantity));
      };
    
      const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };
    
    // const reviewSubmitHandler = () => {
    //     const myForm = new FormData();
    
    //     myForm.set("rating", rating);
    //     myForm.set("comment", comment);
    //     myForm.set("productId", router.query.id);
    
    //     dispatch(newReview(myForm));
    
    //     setOpen(false);
    //   };
    useEffect(() => {
        dispatch(getProductDetails(router.query.id))
    }, [dispatch])
    

    return (
        <>{loading ? <Loader/>:<>
        <div className={Styles.productDetails}>
            <div className={Styles.productDetails}>
                <Carousel>
                    {product.images &&
                        product.images.map((item: any, i: any) => (
                            <Image
                                className={Styles.productCardimg} key={item._id} width={200}
                                height={200} src={item.url} alt={`${i} Slide`}
                            />
                        ))}
                </Carousel>
            </div>

            <div>
                <div className={Styles.detailsBlock1}>
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>
                <div className={Styles.detailsBlock2}>
                    <Rating {...options} />
                    <span className={Styles.detailsBlock2span}>
                        {" "}
                        ({product.numOfReviews} Reviews)
                    </span>
                </div>
                <div className={Styles.detailsBlock3}>
                    <h1>{`₹${product.price}`}</h1>
                    <div className={Styles.detailsBlock31}>
                        <div className={Styles.detailsBlock311}>
                        <button onClick={decreaseQuantity}>-</button>
                        <input readOnly type="number" value={quantity} />
                        <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button
                            disabled={product.Stock < 1 ? true : false}
                            onClick={addToCartHandler}
                        >
                            Add to Cart
                        </button>
                    </div>

                    <p>
                        Status:
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                    </p>
                </div>

                <div className={Styles.detailsBlock4}>
                    Description : <p>{product.description}</p>
                </div>

                <button onClick={submitReviewToggle} className={Styles.submitReview}>Submit Review</button>
            </div>
        </div>

        <h3 className={Styles.reviewsHeading}>REVIEW</h3>
        
        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
        >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className={Styles.submitDialog}>
              <Rating
                onChange={(e:any) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
        <textarea
                className={Styles.submitDialogTextArea}
                cols={30}
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
        </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              {/* <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button> */}
            </DialogActions>
            </Dialog>
        {product.reviews && product.reviews[0] ? (
            <div className={Styles.reviews}>
                {product.reviews && 
                    product.reviews.map((review:any)=> <ReviewCard review={review} />)}
            </div>
        ) : (
            <p className={Styles.noReviews}>No Reviews Yet</p>
        )
        }
    

    </>}
        </>
    )
}

export async function getServerSideProps(context: any) {
    // Directly make API calls here if required

    return {
        props: {},
    };
}

export default productDetails