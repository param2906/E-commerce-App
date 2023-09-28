import { CgMouse } from "react-icons/cg";
import {useEffect} from "react"
import Styles from "./Home.module.css"
import Link from "next/link";
import ProductCard from "./ProductCard";
import appStore from "../../../../public/image/playstore.png";
import MetaData from "../layout/MetaData"
import { StaticImageData } from "next/image";
import { useAppSelector,useAppDispatch } from "../../store/hooks";
import { getProduct } from "@/actions/productAction";
import Loader from "../layout/Loader/Loader";


const Home = ()=>{
  const dispatch = useAppDispatch()
  const {loading, error, products, productCount} = useAppSelector<any>(
    (state)=> state.products
  ) 
  const keyword:any = "", currentPage:any=1,price:any=[0, 25000],category:any="",ratings:any=0;
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings))
  },[dispatch])
    return(
      <>
      {loading ? <Loader /> :
        <>
        <MetaData title="FOODAPP" />
        <div className={Styles.banner}>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <Link href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </Link>
          </div>

          <h2 className={Styles.homeHeading}>Featured Products</h2>

          <div className={Styles.container} id="container">
            
            {products && products.map((product:any)=>(
              <ProductCard key={product._id} product={product}/> 
            ))}
            {productCount}
          </div>
        </>
      }
    </>
    )
}

export default Home