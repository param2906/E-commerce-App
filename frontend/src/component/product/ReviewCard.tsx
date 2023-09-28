import Styles from "../../pages/product/productDetails.module.css"
import Image from "next/image"
import ReactStars from "react-star-rating-component"
import profilepng from "../../../public/image/Profile.png"

const ReviewCard = ({review}:any)=>{
    const options:any = {
        edit:false,
        color:"rgb(20,20,20,0.1)",
        activeColor:"tomato",
        value:review.ratings,
        isHalf:true
    
    }
    return(
        <div className={Styles.reviewCard}>
            <Image src={profilepng} alt="User"/>
            <p>{review.name}</p>
            <ReactStars {...options}/>
            <span>{review.comment}</span>
        </div>
    )
}

export default ReviewCard