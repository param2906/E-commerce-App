import { Fragment, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks"
import { getProduct } from "@/actions/productAction";
import Loader from "@/component/layout/Loader/Loader";
import Styles from "../styles/Product.module.css";  
import MetaData from "../component/layout/MetaData";
import ProductCard from "../component/Home/ProductCard"
import Pagination from "react-js-pagination"
import { styled } from "@mui/material";
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

const Product = () => {
    const dispatch = useAppDispatch()
    const { loading, error, products, productsCount, resultPerPage , filteredProductsCount } = useAppSelector<any>(
        (state) => state.products
    )
    const [currentPage,setCurrentPage] = useState<any>(1)
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
  
    const [ratings, setRatings] = useState<any>(0);
    const setCurrentPageNo = (e:any)=>{
        console.log("e",e)
        setCurrentPage(e)
    }
    const priceHandler = (event:any, newPrice:any) => {
        setPrice(newPrice);
      };
      let count:number = filteredProductsCount;
    const keyword :string=""
    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, keyword, currentPage, price, category, ratings])
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
            <ul className={Styles.categoryBox}>
              {categories.map((category) => (
                <li
                  className={Styles.categorylink}
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
                    {resultPerPage < count && (
            <div className={Styles.paginationBox}>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
                </>                   
      )}
    </>
    )
}

 export default Product