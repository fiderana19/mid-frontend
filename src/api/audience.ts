import axios from "axios";

const AudienceAPIUrl = "http://localhost:3002/audience";

export const getAllAudience = async (token: string | null) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${AudienceAPIUrl}/all`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response;
  } catch (error) {
    console.error("Erreur lors de l'authentfiication :", error)
  }
}

export const getAudienceById = async (token: string | null, id:string) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${AudienceAPIUrl}/get/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response;
  } catch (error) {
    console.error("Erreur lors de l'authentfiication :", error)
  }
}

export const audienceCreate = async (token: string | null, audienceData: any) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${AudienceAPIUrl}/create`,
        data: audienceData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      return response;
    } catch (error) {
      console.error("Erreur lors de l'authentfiication :", error)
    }
  }