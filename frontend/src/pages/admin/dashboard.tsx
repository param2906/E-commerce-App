import React, { useEffect } from "react";
import Sidebar from "../../component/admin/Siderbar";
import Styles from "./dashboard.module.css"
import  Typography  from "@mui/material/Typography";
import Link from "next/link.js";
import { Doughnut, Line } from "react-chartjs-2";
import {Chart, ArcElement,CategoryScale,LineElement,LineController,Decimation, Filler, Legend, Title, Tooltip} from 'chart.js'
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { getAdminProduct } from "../../actions/productAction";
// import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import MetaData from "../../component/layout/MetaData";
import { useRouter } from "next/router";

const Dashboard = () => {
  let mychart = Chart.register(ArcElement,CategoryScale,LineElement,LineController,Decimation, Filler, Legend, Title, Tooltip);
  const dispatch = useAppDispatch();
  
  const router = useRouter()
  const { products } = useAppSelector<any>((state) => state.products);
  // const { orders } = useAppSelector<any>((state) => state.allOrders);
  const { user } = useAppSelector<any>((state)=>state.user)
  const { users } = useAppSelector<any>((state) => state.allUsers);
  let outOfStock = 0;

  products &&
    products.forEach((item:any) => {
      if (item.stock === "0") {
        
        outOfStock += 1;
      }
    });
  
  useEffect(() => {
    ;
    if(user.role!=='admin'){
      // router.push("/login")
    }
    
  // dispatch(getAllOrders());
    dispatch(getAdminProduct());
    dispatch(getAllUsers())
  }, [dispatch,router]);

  // let totalAmount = 0;
  // orders &&
  //   orders.forEach((item:any) => {
  //     totalAmount += item.totalPrice;
  //   });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 5000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className={Styles.dashboard}>
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className={Styles.dashboardContainer}>
        <Typography component="h1">Dashboard</Typography>

        <div className={Styles.dashboardSummary}>
          <div>
            <p>
              Total Amount <br /> 
            </p>
          </div>
          <div className={Styles.dashboardSummaryBox2}>
            <Link href="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link href="/admin/orders">
              <p>Orders</p>
              {/* <p>{orders && orders.length}</p> */}
            </Link>
            <Link href="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className={Styles.lineChart}>
          {/* <Line data={lineState} /> */}
        </div>

        <div className={Styles.doughnutChart}>
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
