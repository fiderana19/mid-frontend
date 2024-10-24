import axios from "axios";

const AudienceAPIUrl = "http://localhost:3002/audience";

export const getAllAudience = async () => {
    try {
        const response = await axios.get(`${AudienceAPIUrl}/all`);
        console.log(response.data)
        return response.data;
    } catch(error) {
        console.error(error)
    }
}