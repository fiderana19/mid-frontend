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
    console.error("Erreur lors de la récuperation des audiences :", error)
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
    console.error("Erreur lors de la recuperation de l'audience :", error)
  }
}

export const getAudienceByUser = async (token: string | null, id:string) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${AudienceAPIUrl}/user/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response;
  } catch (error) {
    console.error("Erreur lors de la recuperation de l'audience de l'utilisateur :", error)
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
      console.error("Erreur lors de la creation del'audience :", error)
    }
  }

  export const audienceReport = async (token: string | null, id: string, audienceData: any) => {
    try {
      const response = await axios({
        method: 'patch',
        url: `${AudienceAPIUrl}/report/${id}`,
        data: { availability: audienceData },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      return response;
    } catch (error) {
      console.error("Erreur lors du report de l'audience :", error)
    }
  }