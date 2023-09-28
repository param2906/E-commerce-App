import MetaData from "../../component/layout/MetaData";
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Styles from "../../styles/updatepassword.module.css"
import { Fragment } from "react";
import { updatePassword } from "@/actions/userAction";
import LockOpenIcon from "@mui/icons-material/LockOpen";
// import VpnKeyIcon from "@mui/icons-material/VpnKeyIcon"
// import LockIcon from "@mui/icons-material/LockIcon"

import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

import Loader from "@/component/layout/Loader/Loader";

const UpdatePassword = ()=>{
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { error, isUpdated, loading } = useAppSelector<any>((state) => state.profile)
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e:any) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(updatePassword(myForm));
      };

    useEffect(() => {
        
    
        if (isUpdated) {
    
          router.push("/account");
    
          dispatch({
            type: UPDATE_PASSWORD_RESET,
          });
        }
      }, [dispatch, router, isUpdated]);
    return(
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className={Styles.updatePasswordContainer}>
            <div className={Styles.updatePasswordBox}>
              <h2 className={Styles.updatePasswordHeading}>Update Profile</h2>

              <form
                className={Styles.updatePasswordForm}
                onSubmit={updatePasswordSubmit}
              >
                <div className={Styles.loginPassword}>
                  {/* <VpnKeyIcon /> */}
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className={Styles.loginPassword}>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className={Styles.loginPassword}>
                  {/* <LockIcon /> */}
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
                  value="Change"
                  className={Styles.updatePasswordBtn}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    )
}

export default UpdatePassword