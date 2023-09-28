import React, { Fragment, useState, useEffect } from "react";
import Styles from "../../../styles/resetpassword.module.css";
import Loader from "@/component/layout/Loader/Loader";
import { useAppSelector, useAppDispatch } from "../../../store/hooks"
import {  resetPassword } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../../../component/layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/LockOpen";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()

  const { error, success, loading } = useAppSelector<any>(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetPasswordSubmit = (e:any) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassowrd", confirmPassword);
    
    dispatch(resetPassword(router.query.token, myForm));
  };

  useEffect(() => {
    if (success) {

      router.push("/login");
    }
  }, [dispatch,router, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className={Styles.resetPasswordContainer}>
            <div className={Styles.resetPasswordBox}>
              <h2 className={Styles.resetPasswordHeading}>Update Profile</h2>

              <form
                className={Styles.resetPasswordForm}
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={Styles.loginPassword}>
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className={Styles.resetPasswordBtn}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
