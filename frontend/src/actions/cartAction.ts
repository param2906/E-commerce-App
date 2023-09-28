import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
  } from "../constants/cartConstants";
  import axios from "axios";

export const AddItemtoCart = (id:any,quantity:any) => async(dispatch:any,getState:any)=>{
    const { data } = await axios.get(`http://localhost:4000/api/v1/products/${id}`);
    console.log(data.product.name)
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const removeItemsFromCart = (id:any) => async (dispatch:any, getState:any) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

export const saveShippingInfo = (data:any) => async (dispatch:any) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
  
