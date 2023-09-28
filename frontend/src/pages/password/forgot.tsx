import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Fragment } from "react";
import { useEffect,useState } from "react";
import {forgotPassword} from "../../actions/userAction"
import Loader from "@/component/layout/Loader/Loader";
import MetaData from "../../component/layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/Face";
import Styles from "../.../../../styles/forgotpassword.module.css"

const ForgotPassword = ()=>{
    const dispatch = useAppDispatch()
    const { error, message, loading } = useAppSelector<any>(
        (state) => state.forgotPassword
      );
    
      const [email, setEmail] = useState("");
    
      const forgotPasswordSubmit = (e:any) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
      };
    useEffect(() => {

      }, [dispatch, message]);
    return (
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className={Styles.forgotPasswordContainer}>
            <div className={Styles.forgotPasswordBox}>
              <h2 className={Styles.forgotPasswordHeading}>Forgot Password</h2>

              <form
                className={Styles.forgotPasswordForm}
                onSubmit={forgotPasswordSubmit}
              >
                <div className={Styles.forgotPasswordEmail}>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className={Styles.forgotPasswordBtn}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    )
}

export default ForgotPassword