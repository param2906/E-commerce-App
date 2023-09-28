import axios from "axios"
import {ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS,} from "../constants/productConstants"
export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category:any, ratings = 0) => async (dispatch:any) =>{
    try{
        dispatch({type: ALL_PRODUCT_REQUEST})

        let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

        const {data} = await axios.get(link)
        
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload:data
        })
    }catch(error:any){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error?.response?.data?.message
    })
    }
}
export const getProductDetails = (id:any) => async (dispatch:any) =>{
   
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const token = localStorage.getItem("token");
        const config = { headers: {"Authorization":`${token}` } }
        const {data} = await axios.get(`http://localhost:4000/api/v1/products/${id}`,config)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    }catch(error:any){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
    })
    }
}

export const getAdminProduct = () => async (dispatch:any) => {
    try {
     
      dispatch({ type: ADMIN_PRODUCT_REQUEST });
      const token = localStorage.getItem("token");
      const config = { headers: {"Authorization":`${token}` } }
      const { data } = await axios.get("http://localhost:4000/api/v1/admin/products",config);
      dispatch({
        type: ADMIN_PRODUCT_SUCCESS,
        payload: data.products,
      });
    } catch (error:any) {
      dispatch({
        type: ADMIN_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Create Product
  export const createProduct = (productData:any) => async (dispatch:any) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
      const token = localStorage.getItem("token");
      const config = {
        headers: { "Content-Type": "application/json","Authorization":`${token}`  },
      };
  
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/admin/product/new`,
        productData,
        config
      );
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error:any) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Update Product
  export const updateProduct = (id:any, productData:any) => async (dispatch:any) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
      const token = localStorage.getItem("token");
      const config = {
        headers: { "Content-Type": "application/json","Authorization":`${token}`  },
      };
  
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/admin/product/${id}`,
        productData,
        config
      );
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error:any) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Product
  export const deleteProduct = (id:any) => async (dispatch:any) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
      const token = localStorage.getItem("token");
      const config = {
        headers: { "Authorization":`${token}`  },
      };
      const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/product/${id}`,config);
  
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error:any) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };


export const newReview = (reviewData:any) => async (dispatch:any) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
      const token = localStorage.getItem("token");
      const config = {
        headers: { "Content-Type": "application/json","Authorization":`${token}`  },
      };
      
  
      const { data } = await axios.put(`http://localhost:4000/api/v1/review`, reviewData, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error:any) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get All Reviews of a Product
  export const getAllReviews = (id:any) => async (dispatch:any) => {
    try {
      
      dispatch({ type: ALL_REVIEW_REQUEST });
      const token = localStorage.getItem("token");
      const config = {
        headers: { "Authorization":`${token}`},
      };
      const { data } = await axios.get(`http://localhost:4000/api/v1/reviews?id=${id}`,config);
      console.log(data)
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
      });
    } catch (error:any) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Review of a Product
  export const deleteReviews = (reviewId:any, productId:any) => async (dispatch:any) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
      const token = localStorage.getItem("token");
      const config = {
        headers: { "Authorization":`${token}`  },
      };
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/reviews?id=${reviewId}&productId=${productId}`,config
      );
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error:any) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch:any) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  