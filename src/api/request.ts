import axios from "axios";

const RequestAPUrl = "http://localhost:3002/request"

export const getAllRequest = async (token: string | null) => {
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

export const getRequestById = async (token: string | null, id: string) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${RequestAPUrl}/get/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'authentfiication :", error)
  }
}

export const getAllRequestByUser = async (token: string | null, id: string) => {
    try {
      const response = await axios({
        method: 'get',
        url: `${RequestAPUrl}/user/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'authentfiication :", error)
    }
}
  

export const requestCreate = async (token: string | null, requestData: any) => {
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

export const validateRequest = async (token: string | null, id: string) => {
  try {
    const response = await axios({
      method: 'patch',
      url: `${RequestAPUrl}/treat/${id}`,
      data: { status_request: "Accepté" },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'authentfiication :", error)
  }
}

export const denyRequest = async (token: string | null, id: string) => {
  try {
    const response = await axios({
      method: 'patch',
      url: `${RequestAPUrl}/treat/${id}`,
      data: { status_request: "Refusé" },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'authentfiication :", error)
  }
}