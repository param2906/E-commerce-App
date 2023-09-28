import { Fragment, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { getProduct } from "@/actions/productAction";
import ReviewCard from "@/component/product/ReviewCard";
import Loader from "@/component/layout/Loader/Loader";
import Styles from "../../styles/Product.module.css";
import Image from "next/image";
import MetaData from "../../component/layout/MetaData";
import ProductCard from "../../component/Home/ProductCard"
import { useRouter } from "next/router";
import Pagination from "react-js-pagination"
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

const ProductKeyword = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { loading, error, products, productCount,productPerPage,filteredProductsCount } = useAppSelector<any>(
        (state) => state.products
    )
    const priceHandler = (event:any, newPrice:any) => {
        setPrice(newPrice);
      };
    const [currentPage,setCurrentPage] = useState<any>(1)
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
  
    const [ratings, setRatings] = useState<any>(0);
    const setCurrentPageNo = (e:any)=>{
        console.log("e",e)
        setCurrentPage(e)
    }
    const keyWord:any = router?.query?.keyword
    useEffect(() => {
        dispatch(getProduct(keyWord,currentPage,price, category, ratings))
    }, [dispatch])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="PRODUCTS -- ECOMMERCE" />
                    <h2 className={Styles.productsHeading}>Products</h2>

                    <div className={Styles.products}>
                        {products &&
                            products.map((product: any) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>
                    <div className={Styles.filterBox}>
                        <Typography >Price</Typography>
                        <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                        />
                         <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
                    </div>  
                    <div className={Styles.paginationBox}>
                        <Pagination 
                        activePage={currentPage}
                        itemsCountPerPage={productPerPage}
                        totalItemsCount={productCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive "
                        activeLinkClass="pageLinkActive"
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default ProductKeyword