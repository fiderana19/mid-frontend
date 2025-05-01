import { SignupInterface } from "../interfaces/User";
import axiosAuthInstance, { axiosInstance, axiosMutlipartFormDataInstance } from "./Config";

const UserAPIUrl = `${import.meta.env.VITE_BASE_URL}/auth`;

export const userLogin = async (email:string, password: string) => {
  return await axiosInstance.post(`${UserAPIUrl}/login`, { email, password });
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

export const checkEmailExistisAPI = async (email: string) => {
  try {
    const response = await axiosInstance.get(`${UserAPIUrl}/check/${email}`);
    return !!response.data;
  } catch (error) {
    return false;
  }
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