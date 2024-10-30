import axios from "axios";
import { SignupInterface } from "../interfaces/User";

const UserAPIUrl = "http://localhost:3002/auth";

export const userLogin = async (email:string, password: string) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${UserAPIUrl}/login`,
      data: { email, password },
    })

    return response;
  } catch (error: any) {
    console.error("Erreur lors de l'authentfication :", error)
  }
}

export const userSignup = async (signinCredentials: SignupInterface) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${UserAPIUrl}/signup`,
      data: signinCredentials,
    })

    return response;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error)
  }
}

export const validateUser = async (token: string | null, id: string) => {
  try {
    const response = await axios({
      method: 'patch',
      url: `${UserAPIUrl}/validate/${id}`,
      data: {validation: true},
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la validation :", error)
  }
}

export const editUser = async (token: string | null, id: string, editData: any) => {
  try {
    const response = await axios({
      method: 'patch',
      url: `${UserAPIUrl}/update/${id}`, 
      data: editData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modification :", error)
  }
}

export const deleteUser = async (token: string | null, id: string) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `${UserAPIUrl}/delete/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

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

export const getAllUser = async (token: string | null) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${UserAPIUrl}/all`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    console.error("Erreur lors de la recuperation des utilisateurs.", error)
  }
}

export const getUserById = async (token: string | null, id: string) => {
  try {
    if(token) {        
      const response = await axios({
        method: 'get',
        url: `${UserAPIUrl}/get/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data;
    }
  } catch (error) {
    console.error("Erreur lors de la recuperation de l'utilisateur.", error)
  }
}
