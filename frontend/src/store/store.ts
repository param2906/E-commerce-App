import {  createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension";
import {productDetailsReducers, productsReducers,newProductReducer,
  newReviewReducer,productReducer,productReviewsReducer,reviewReducer} from "../reducers/productReducers"
import {
    allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
  } from "../reducers/userReducers";
import { cartReducer } from "../reducers/cartReducers";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "../reducers/orderReducers";

import { initialState } from "@/pages/_app";

const reducer = combineReducers({
    products: productsReducers,
    productDetails: productDetailsReducers,
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    forgotPassword:forgotPasswordReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
})

const middleware = [thunk]

const store = createStore(
    reducer,
    // initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)



export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch