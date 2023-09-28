import { useAppDispatch,useAppSelector } from "@/store/hooks"
import { useRouter } from "next/router"
import Styles from "./ProductList.module.css"
import {Fragment,useEffect} from "react"
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/base";
import MetaData from "../../component/layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { deleteProduct,getAdminProduct } from "@/actions/productAction"
import SideBar from "../../component/admin/Siderbar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () =>{
    const router = useRouter()
    const dispatch = useAppDispatch()  
    const {products, error} = useAppSelector<any>((state)=>state.products)
    const {isUpdated, isDeleted} = useAppSelector<any>((state)=>state.product)
    const deleteProductHandler = (id:any) => {
        dispatch(deleteProduct(id));
    };
    useEffect(() => {
        if (isDeleted) {
            router.push("/admin/dashboard");
          dispatch({ type: DELETE_PRODUCT_RESET });
        }
    
        dispatch(getAdminProduct());
      }, [dispatch,router, isDeleted])

    const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
        field: "name",
        headerName: "Name",
        minWidth: 350,
        flex: 1,
    },
    {
        field: "stock",
        headerName: "Stock",
        type: "number",
        minWidth: 150,
        flex: 0.3,
    },

    {
        field: "price",
        headerName: "Price",
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
        renderCell: (products:any) => {
        return (
            <Fragment>
                
            <Link href={`/admin/product/${products.id}`}>
                
                <EditIcon />
            </Link>

            <Button
                onClick={() =>
                deleteProductHandler(products.id)
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

    products &&
    products.forEach((item:any) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />

            <div className={Styles.dashboard}>
            <SideBar />
            <div className={Styles.productListContainer}>
                <h1 className={Styles.productListHeading}>ALL PRODUCTS</h1>

                <DataGrid
                rows={rows}
                columns={columns}
                // autoPageSize={10}
                className={Styles.productListTable}
                autoHeight
                />
            </div>
            </div>
        </Fragment>
    )
}

export default ProductList