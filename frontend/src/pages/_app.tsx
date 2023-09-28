import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux"
import store from "../store/store"
import { loadUser } from '@/actions/userAction'
import { useEffect } from 'react'


// import {positions,transitions, Provider as AlertProvider} from "react-alert"
// import AlertTemplate from "react-alert-template-basic"
export let initialState:any
export default function App({ Component, pageProps }: AppProps) {
  let cartItems:any 
  let shippingInfos:any 
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    cartItems = localStorage.getItem("cartItems")
    shippingInfos = localStorage.getItem("shippingInfo")
}
  // initialState = {
  //   cart: {
  //     cartItems: localStorage.getItem("cartItems")
  //       ? JSON.parse(cartItems)
  //       : [],
  //     shippingInfo: localStorage.getItem("shippingInfo")
  //       ? JSON.parse(shippingInfos)
  //       : {},
  //   },
  // };
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (<Provider store={store}><Component {...pageProps} />
  
  </Provider>)
}
