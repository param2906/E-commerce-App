import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Styles from "./productreviews.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { Button } from "@mui/base";
import MetaData from "../../component/layout/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";

import SideBar from "../../component/admin/Siderbar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const dispatch = useAppDispatch();

  const { error: deleteError, isDeleted } = useAppSelector<any>(
    (state) => state.review
  );

  const { error, reviews, loading } = useAppSelector<any>(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId:any) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e:any) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      
      dispatch(clearErrors());
    }

    if (deleteError) {
      
      dispatch(clearErrors());
    }

    if (isDeleted) {

    
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, deleteError, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (reviews:any) => {
        return reviews.row.rating >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (reviews:any) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(reviews.id)
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

  reviews &&
    reviews.forEach((item:any) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className={Styles.dashboard}>
        <SideBar />
        <div className={Styles.productReviewsContainer}>
          <form
            className={Styles.productReviewsForm}
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className={Styles.productReviewsFormHeading}>ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              className={Styles.createProductBtn}
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className={Styles.productReviewsFormHeading}>No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
