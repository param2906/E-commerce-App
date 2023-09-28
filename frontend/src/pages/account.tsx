import React, { Fragment, useRef, useState, useEffect } from "react";
import Loader from "@/component/layout/Loader/Loader";
import MetaData from "../component/layout/MetaData";
import { useAppSelector, useAppDispatch } from "../store/hooks"
import Link from "next/link"
import { useRouter } from "next/router";
import Styles from "../styles/account.module.css"
import Image from "next/image";
import { loadUser } from "@/actions/userAction";


const Account = () =>{
    const router = useRouter()
    
    const { user, loading, isAuthenticated } = useAppSelector<any>((state) => state.user);
  

    useEffect(() => {
      
        if (isAuthenticated === false) {
            router.push("/login");
            
        }
      }, [router,isAuthenticated]);

    return (
        <>
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user?.name}'s Profile`} />
          <div className={Styles.profileContainer}>
            <div>
              <h1>My Profile</h1>
              <Image src={user?.avatar?.url} className={Styles.profileImg} width={200} height={2000} alt={user?.name} />
              <Link href="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link href="/orders">My Orders</Link>
               <Link href="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
        </>
    )
}

export default Account