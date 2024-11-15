import axios from "axios";

const AudienceAPIUrl = "http://localhost:3002/audience";
const RequestAPUrl = "http://localhost:3002/request"
const UserAPIUrl = "http://localhost:3002/auth";

export const getUserStat = async (token: string |null) => {
    try {
        const response = await axios({
          method: 'get',
          url: `${UserAPIUrl}/chart`,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
    
        return response;
      } catch (error: any) {
        console.error("Erreur lors de la recuperation des stat user :", error)
        return error;
      }
}

export const getLatestUser = async (token: string |null) => {
  try {
      const response = await axios({
        method: 'get',
        url: `${UserAPIUrl}/latest`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      return response;
    } catch (error: any) {
      console.error("Erreur lors de la recuperation des stat user :", error)
      return error;
    }
}

export const getRequestChart = async (token: string |null) => {
  try {
      const response = await axios({
        method: 'get',
        url: `${RequestAPUrl}/chart`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      return response;
    } catch (error: any) {
      console.error("Erreur lors de la recuperation des stat request :", error)
      return error;
    }
}
