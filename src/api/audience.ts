import axios from "axios";

const AudienceAPIUrl = "http://localhost:3002/audience";

export const getAllAudience = async () => {
    try {
        const response = await axios.get(`${AudienceAPIUrl}/all`);

        return response.data;
    } catch(error) {
        console.error(error)
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