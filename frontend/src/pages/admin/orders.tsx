import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Styles from "./orders.module.css";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Link from "next/link";
import { useAlert } from "react-alert";
import { Button } from "@mui/base";
import MetaData from "../../component/layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "../../component/admin/Siderbar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter() 
  const alert = useAlert();

  const { error, orders } = useAppSelector<any>((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useAppSelector<any>((state) => state.order);

  const deleteOrderHandler = (id:any) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      router.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params:any) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params:any) => {
        return (
          <Fragment>
            <Link href={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows:any = [];

  orders &&
    orders.forEach((item:any) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className={Styles.dashboard}>
        <SideBar />
        <div className={Styles.productListContainer}>
          <h1 className={Styles.productListHeading}>ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            className={Styles.productListTable}
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
