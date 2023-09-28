import Link from 'next/link'
import Image from "next/image";
import ReactStars from "react-star-rating-component"
import Styles from "./Home.module.css";

const Product = ({product}:any)=>{
    const options:any = {
        edit:false,
        color:"rgb(20,20,20,0.1)",
        activeColor:"tomato",
        value:product.ratings,
        isHalf:true
    
    }
    return(
        <Link className={Styles.productCard} href={`/product/${product._id}`}>
            <Image className={Styles.productCardimg} src={product.images[0].url} alt={product.name} width={500} height={50}/>
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /><span>({product.numOfReview} Reviews)</span> 
            </div>
            <span>{`Rs.${product.price}`}</span>
        </Link>

    )
}
export default Product