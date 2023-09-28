import React, { Fragment, useRef, useState, useEffect } from "react";
import Loader from "@/component/layout/Loader/Loader";
import Link from "next/link"
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useAppSelector, useAppDispatch } from "../store/hooks"
import { login } from "../actions/userAction";
import { useRouter } from "next/router";
import Styles from "../styles/login.module.css";


const LoginSignUp = () => {

  const dispatch = useAppDispatch();

  const router = useRouter();

  const {error,loading, isAuthenticated} = useAppSelector<any>(
    (state)=> state.user
  );
  const [loginEmail, setLoginEmail] = useState<any>("");
  const [loginPassword, setLoginPassword] = useState<any>("");
  const loginSubmit = (e:any) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  useEffect(() => {
  
    if (isAuthenticated) {
      router.push("/account");
    }
  }, [dispatch, router, isAuthenticated]);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className={Styles.LoginSignUpContainer}>
          
            <div className={Styles.LoginSignUpBox}>
              <div>
                <div className={Styles.login_signUp_toggle}>
                  
                  <p>LOGIN</p>

                </div>
                <button ></button>
              </div>
              
              <form className={Styles.loginForm} onSubmit={loginSubmit}>
                <div className={Styles.loginEmail}>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                
                <div className={Styles.loginPassword}>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link href="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className={Styles.loginBtn} />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;