import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Styles from "./ProductList.module.css";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Link from "next/link";
import { Button } from "@mui/base";
import MetaData from "../../component/layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "../../component/admin/Siderbar";
import {
    deleteUser,
  clearErrors,
  getAllUsers
} from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()

  const {users} = useAppSelector<any>((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useAppSelector<any>((state) => state.profile);

  const deleteUserHandler = (id:any) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {

    if (deleteError) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch,deleteError, router, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (users:any) => {
        return users.role === "admin"
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
      renderCell: (users:any) => {
        return (
          <Fragment>
            <Link href={`/admin/user/${users.id}`}>
              <EditIcon />
            </Link>
          
            <Button
              onClick={() =>
                deleteUserHandler(users.id)
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

  users &&
    users.forEach((item:any) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className={Styles.dashboard}>
        <SideBar />
        <div className={Styles.productListContainer}>
          <h1 className={Styles.productListHeading}>ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            // pageSize={10}
            // disableSelectionOnClick
            className={Styles.productListTable}
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
