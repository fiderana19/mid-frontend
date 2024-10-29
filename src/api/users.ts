import axios from "axios";
import { SignupInterface } from "../interfaces/User";

const UserAPIUrl = "http://localhost:3002/auth";
const token = localStorage.getItem("token");

export const userLogin = async (email:string, password: string) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${UserAPIUrl}/login`,
      data: { email, password },
    })
    const access_token = response.data.token;

    return access_token;
  } catch (error) {
    console.error("Erreur lors de l'authentfiication :", error)
  }
}

export const userSignup = async (signinCredentials: SignupInterface) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${UserAPIUrl}/signup`,
      data: signinCredentials,
    })
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error)
  }
}

export const validateUser = async (id: string) => {
  try {
    const response = await axios({
      method: 'patch',
      url: `${UserAPIUrl}/validate/${id}`,
      data: {validation: true},
    })
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la validation :", error)
  }
}

export const editUser = async (id: string, editData: any) => {
  try {
    const response = await axios({
      method: 'patch',
      url: `${UserAPIUrl}/update/${id}`, 
      data: editData,
    })
    console.log(response)

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modification :", error)
  }
}

export const deleteUser = async (id: string) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `${UserAPIUrl}/delete/${id}`,
    })
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression :", error)
  }
}

export const checkEmailExistisAPI = async (email: string) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${UserAPIUrl}/check/${email}`,
    })
    return !!response.data;
  } catch (error) {
    console.error("Erreur  :", error)
    return false;
  }
}

export const getAllUser = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${UserAPIUrl}/all`,
    })
    return response;
  } catch (error) {
    console.error("Erreur get all user.", error)
  }
}

export const getUserById = async (id: string) => {
  try {
    if(token) {        
      const response = await axios({
        method: 'get',
        url: `${UserAPIUrl}/get/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("dyecuhev", response)
      return response.data;
    }
  } catch (error) {
    console.error("Erreur get all user.", error)
  }
}
