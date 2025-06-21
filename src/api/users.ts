import { LoginInterface, SignupInterface } from "../interfaces/User";
import axiosAuthInstance, { axiosInstance, axiosMutlipartFormDataInstance } from "./Config";
import { showToast } from "@/utils/Toast";
import { TOAST_TYPE } from "@/constants/ToastType";
import { HttpStatus } from "@/constants/Http_status";

const UserAPIUrl = `${import.meta.env.VITE_BASE_URL}/auth`;

export const userLogin = async (data: LoginInterface) => {
  try {
    return await axiosInstance.post(`${UserAPIUrl}/login`, data);
  } catch (error: any) {
    if(error?.status == HttpStatus.BAD_REQUEST || error?.status == HttpStatus.UNAUTHORIZED) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: error?.response.data.message
      })
    } else if (error.code == "ERR_NETWORK") {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la connexion au serveur !"
      })
    }
  }
}

export const userSignup = async (signupCredentials: SignupInterface) => {
  return await axiosMutlipartFormDataInstance.post(`${UserAPIUrl}/signup`, signupCredentials)
}

export const validateUser = async (id: string) => {
  return await axiosAuthInstance.patch(`${UserAPIUrl}/validate/${id}`);
}

export const getUserForChart = async () => {
  return await axiosAuthInstance.get(`${UserAPIUrl}/chart`);
}

export const editUser = async (data: any) => {
  return await axiosAuthInstance.patch(`${UserAPIUrl}/update/${data?._id}`, data);
}

export const initializePassword = async (data: any) => {
  return await axiosAuthInstance.patch(`${UserAPIUrl}/first/password/${data?._id}`, data);
}

export const updatePassword = async (data: any) => {
  return await axiosAuthInstance.patch(`${UserAPIUrl}/password/${data?._id}`, data);
}

export const deleteUser = async (id: string) => {
  return await axiosAuthInstance.delete(`${UserAPIUrl}/delete/${id}`);
}

export const checkUserFirstLogin = async (id: string) => {
  try {
    const response = await axiosAuthInstance.get(`${UserAPIUrl}/firstlogin/${id}`);
    return response;
  } catch (error) {
    return false;
  }
}

export const getAllUser = async () => {
  return await axiosAuthInstance.get(`${UserAPIUrl}/all`);
}

export const getUserById = async (id: string) => {
  return await axiosAuthInstance.get(`${UserAPIUrl}/get/${id}`);
}