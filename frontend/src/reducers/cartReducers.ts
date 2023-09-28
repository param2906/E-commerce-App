import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
  } from "../constants/cartConstants";
  
  export const cartReducer = (
    state = { cartItems: [], shippingInfo: {} },
    action:any
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
  
        const isItemExist = state.cartItems.find(
          (i:any) => i.product === item.product
        );
        console.log(isItemExist)
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i:any) =>
              i.product === isItemExist ? item : i
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
  
      case REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((i:any) => i.product !== action.payload),
        };
  
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };
  
      default:
        return state;
    }
  };
  