import axios from "axios";
import { useState } from "react";

const UserAPIUrl = "http://localhost:3002/auth";


export const userLogin = async (email:string, password: string) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${UserAPIUrl}/login`,
      data: { email, password },
    })
    const token = response.data.token;
    console.log(response.data.token)

    return token;
  } catch (error) {
    console.error("Erreur lors de l'authentfiication :", error)
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

export const getUserById = async () => {
  try {
    const token = localStorage.getItem("token");
    if(token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log("tonga eto", decodedToken.id)
        
      const response = await axios({
        method: 'get',
        url: `${UserAPIUrl}/get/${decodedToken.id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data;
    }
  } catch (error) {
    console.error("Erreur get all user.", error)
  }
}
