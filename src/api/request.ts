import axios from "axios";

const RequestAPUrl = "http://localhost:3002/request"

export const getAllRequest = async () => {
    try {
        const response = await axios.get(`${RequestAPUrl}/count/all`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la recupertaion des request : " ,error);
    }
}
