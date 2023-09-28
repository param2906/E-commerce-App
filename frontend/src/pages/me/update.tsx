import Loader from "@/component/layout/Loader/Loader";
import MetaData from "../../component/layout/MetaData";
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import Link from "next/link"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Styles from "../../styles/update.module.css"
import { Fragment } from "react";
import FaceIcon from "@mui/icons-material/Face";
import MailOutlineIcon from "@mui/icons-material/Face";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { loadUser } from "@/actions/userAction";
import profile from "../../../public/image/Profile.png"
import {updateProfile} from "../../actions/userAction"
import Image from "next/image";

const UpdateProfile = ()=>{
    const router = useRouter()
    const dispatch = useAppDispatch();
    const { user } = useAppSelector<any>((state) => state.user);
    const { error, isUpdated, loading } = useAppSelector<any>((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState<any>();
    const [avatarPreview, setAvatarPreview] = useState<any>(profile);

    const updateProfileSubmit = (e:any) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
      };
    
    const updateProfileDataChange = (e:any) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
    
        reader.readAsDataURL(e.target.files[0]);
      };
    

    useEffect(() => {
        if (user) {
          setName(user.name);
          setEmail(user.email);
          setAvatarPreview(user?.avatar?.url);
        }
        if (isUpdated) {

          dispatch(loadUser());
          router.push("/account");
    
          dispatch({
            type: UPDATE_PROFILE_RESET,
          });
        }
      }, [dispatch, router, user, isUpdated]);
    return(
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className={Styles.updateProfileContainer}>
            <div className={Styles.updateProfileBox}>
              <h2 className={Styles.updateProfileHeading}>Update Profile</h2>

              <form
                className={Styles.updateProfileForm}
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className={Styles.updateProfileName}>
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={Styles.updateProfileEmail}>
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

                <div className={Styles.updateProfileImage}>
                  <Image src={avatarPreview} width={200} height={200} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className={Styles.updateProfileBtn}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    )
}

export default UpdateProfile