import axios from "axios";

const RequestAPUrl = "http://localhost:3002/request"

export const getAllRequest = async (token: string) => {
    try {
      const response = await axios({
        method: 'get',
        url: `${RequestAPUrl}/all`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'authentfiication :", error)
    }
}

export const getAllRequestByUser = async (token: string, id: string) => {
    try {
      const response = await axios({
        method: 'get',
        url: `${RequestAPUrl}/user/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log(response);
  
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'authentfiication :", error)
    }
}
  

export const requestCreate = async (token: string, requestData: any) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${RequestAPUrl}/create`,
      data: requestData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'authentfiication :", error)
  }
}
