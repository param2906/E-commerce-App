import React, { Fragment, useRef, useState, useEffect } from "react";
import Loader from "@/component/layout/Loader/Loader";
import Link from "next/link"
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useAppSelector, useAppDispatch } from "../store/hooks"
import { login, register } from "../actions/userAction";
import { useRouter } from "next/router";
import Styles from "../styles/register.module.css";
import profile from "../../public/image/Profile.png"
import Image from "next/image";


const Register = ()=>{
   const dispatch = useAppDispatch();

  const router = useRouter();

  const {loading, isAuthenticated} = useAppSelector<any>(
    (state)=> state.user

  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState<any>(profile);
  const [avatarPreview, setAvatarPreview] = useState<any>(profile);
  console.log("avatarPreview",avatarPreview)
  const registerSubmit = (e:any) => {
    e.preventDefault();

    const myForm:any = new FormData();

    myForm.set("name", name); 
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };
  const registerDataChange = (e:any) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
  
    if (isAuthenticated) {
      router.push("/account");
    }
  }, [dispatch, router, isAuthenticated]);
     

    return (
        <>
        {loading ? (
            <Loader />
          ) : (
            <>
            <div className={Styles.LoginSignUpContainer}>
          
                <div className={Styles.LoginSignUpBox}>
                    <div>
                    <p>REGISTER</p>
                    </div>
            <form
                className={`${Styles.signUpForm} shiftToLeft`} 
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                
                <div className={Styles.signUpName}>
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                
                <div className={Styles.signUpEmail}>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className={Styles.signUpPassword}>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div className={Styles.registerImage}>
                  <Image src={avatarPreview} className={Styles.registerImageimg} width={300} height={300} alt="Avatar Preview" />
                  <input
                    type="file" 
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                
                <input type="submit" value="Register" className={Styles.signUpBtn} />
              </form>
              </div>
              </div>
            </>
          )
        }
        </>
    )
}

export default Register