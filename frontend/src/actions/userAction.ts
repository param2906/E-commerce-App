import { type } from "os";
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import axios from "axios";

export const login = (email: any, password: any) => async (dispatch: any) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/login`,
      { email, password },
      config
    );
    localStorage.setItem("token", data.token)
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error: any) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};
export const register = (userData: any) => async (dispatch: any) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`http://localhost:4000/api/v1/register`, userData, config);

    localStorage.setItem("token", data.token)

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error: any) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch: any) => {
  try {
    const token = localStorage.getItem("token");
    const config = { headers: { "Authorization":`${token}` } };
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get(`http://localhost:4000/api/v1/me`,config);
    

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error: any) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response?.data.message });
    localStorage.clear();
  }
};

export const logout = () => async (dispatch: any) => {
  try {

    const { data } = await axios.get(`http://localhost:4000/api/v1/logout`);
    
    dispatch({ type: LOGOUT_SUCCESS })


  } catch (error: any) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message })
  }
}

export const updateProfile = (userData: any) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST })
    const token = localStorage.getItem("token");
    const config = { headers: { "Content-Type": "multipart/form-data","Authorization":`${token}` } };
    const { data } = await axios.put(`http://localhost:4000/api/v1/me/update`, userData, config)
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success })

  } catch (error: any) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message })
  }
}

export const resetPassword = (token:any,passwords:any) => async (dispatch: any) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST })

    const config = { headers: { "Content-Type": "multipart/form-data"} }

    const { data } = await axios.put(`http://localhost:4000/api/v1/password/reset/${token}`, passwords, config)
    dispatch({type: RESET_PASSWORD_SUCCESS, payload:data})

  } catch (error: any) {
    dispatch({ type: RESET_PASSWORD_FAIL,payload: error.response.data.message })
  }
}

export const updatePassword = (passwords: any) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const token = localStorage.getItem("token");
    const config = { headers: { "Content-Type": "application/json","Authorization":`${token}` } };

    const { data } = await axios.put(
      `http://localhost:4000/api/v1/password/update`,
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error: any) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`http://localhost:4000/api/v1/password/forgot`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error: any) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch:any) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const token = localStorage.getItem("token");
    const config = { headers: {"Authorization":`${token}` } }
    const { data } = await axios.get(`http://localhost:4000/api/v1/admin/users`,config);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error:any) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

export const getUserDetails = (id:any) => async (dispatch:any) =>{
  try{
    dispatch({ type: USER_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    const config = { headers: { "Content-Type": "application/json","Authorization":`${token}`}}
    const { data } = await axios.get(`http://localhost:4000/api/v1/admin/user/${id}`,config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  }catch(error:any){
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
}

export const updateUser = (id:any,userData:any) => async (dispatch:any) =>{
  try{
    console.log("id",id)
    dispatch({ type: USER_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    const config = { headers: { "Content-Type": "application/json","Authorization":`${token}`}};
    const {data} = await axios.put(`http://localhost:4000/api/v1/admin/user/${id}`,userData,config)
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  }catch(error:any){
    dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message });
  }
}

export const deleteUser = (id:any) => async (dispatch:any) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const token = localStorage.getItem("token");
    const config = { headers: { "Authorization":`${token}` } };
    const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/user/${id}`,config);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error:any) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => async (dispatch:any) => {
  dispatch({ type: CLEAR_ERRORS });
};