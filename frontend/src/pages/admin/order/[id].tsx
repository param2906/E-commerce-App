import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../../component/layout/MetaData";
import Link from "next/link";
import Styles from "./process.module.css"
import Typography  from "@mui/material/Typography";
import SideBar from "../../../component/admin/Siderbar";
import { useRouter } from "next/router";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../../actions/orderAction";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Loader from "../../../component/layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@mui/base";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants";
import "./processOrder.css";

const ProcessOrder = () => {
  const { order, error, loading } = useAppSelector<any>((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useAppSelector<any>((state) => state.order);
  const router = useRouter()
  const updateOrderSubmitHandler = (e:any) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(router.query.id, myForm));
  };

  const dispatch = useAppDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(router.query.id));
  }, [dispatch, alert, error, router.query.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className={Styles.dashboard}>
        <SideBar />
        <div className={Styles.newProductContainer}>
          {loading ? (
            <Loader />
          ) : (
            <div
              className={Styles.confirmOrderPage}
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className={Styles.confirmshippingArea}>
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className={Styles.orderDetailsContainerBox}>
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className={Styles.orderDetailsContainerBox}>
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={Styles.confirmCartItems}>
                  <Typography>Your Cart Items:</Typography>
                  <div className={Styles.confirmCartItemsContainer}>
                    {order.orderItems &&
                      order.orderItems.map((item:any) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link href={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className={Styles.updateOrderForm}
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
