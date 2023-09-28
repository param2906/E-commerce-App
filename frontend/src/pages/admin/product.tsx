import React, { Fragment, useEffect, useState } from "react";
import Styles from"./NewProduct.module.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { clearErrors, createProduct } from "../../actions/productAction";
import { Button } from "@mui/base";
import MetaData from "../../component/layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "../../component/admin/Siderbar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useRouter } from "next/router";

const NewProduct = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const { loading, success } = useAppSelector<any>((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<any>(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState<any>(0);
  const [images, setImages] = useState<any>([]);
  const [imagesPreview, setImagesPreview] = useState<any>([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {

    if (success) {
      
      router.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, router, success]);

  const createProductSubmitHandler = (e:any) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image:any) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e:any) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file:any) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old:any) => [...old, reader.result]);
          setImages((old:any) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className={Styles.dashboard}>
        <SideBar />
        <div className={Styles.newProductContainer}>
          <form
            className={Styles.createProductForm}
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e:any) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e:any) => setDescription(e.target.value)}
                cols={30}
                rows={1}
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e:any) => setStock(e.target.value)}
              />
            </div>

            <div className={Styles.createProductFormFile}>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div className={Styles.createProductFormImage}>
              {imagesPreview.map((image:any, index:any) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              className={Styles.createProductBtn}
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
