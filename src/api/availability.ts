import axios from "axios";

const availabilityAPIUrl = "http://localhost:3002/availability";

export const getAllAvailability = async (token: string | null) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${availabilityAPIUrl}/all`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response;
  } catch (error) {
    console.error("Erreur lors du recuperation des disponibilités :", error)
  }
}

export const getAllFreeAvailability = async (token: string | null) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${availabilityAPIUrl}/all/free`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response;
  } catch (error) {
    console.error("Erreur lors du recuperation des disponibilités :", error)
  }
}

export const getAvailabilityById = async (token: string | null, id: string) => {
    try {
      const response = await axios({
        method: 'get',
        url: `${availabilityAPIUrl}/get/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      return response;
    } catch (error) {
      console.error("Erreur lors de la recuperation de la disponiblité :", error)
    }
}

export const createAvailability = async (token: string | null, data: any) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${availabilityAPIUrl}/create`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      return response;
    } catch (error: any) {
      console.error("Erreur lors de la creation d'une disponibilité :", error)
      return error;
    }
}

export const cancelAvailability = async (token: string | null, id: string) => {
    try {
      const response = await axios({
        method: 'patch',
        url: `${availabilityAPIUrl}/status/${id}`,
        data: {status_availability: "Annulé"},
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      return response;
    } catch (error) {
      console.error("Erreur lors de la modification de la disponbilité :", error)
    }
}

export const deleteAvailability = async (token: string | null, id: string) => {
    try {
      const response = await axios({
        method: 'delete',
        url: `${availabilityAPIUrl}/delete/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      return response;
    } catch (error) {
      console.error("Erreur lors de la suppression de la disponiblité :", error)
    }
}