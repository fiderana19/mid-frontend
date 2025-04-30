import axiosAuthInstance from "./Config";

const AvailabilityAPIUrl = `${import.meta.env.VITE_BASE_URL}/availability`;

export const getAllAvailability = async () => {
  return await axiosAuthInstance.get(`${AvailabilityAPIUrl}/all`);
}

export const getAllFreeAvailability = async () => {
  return await axiosAuthInstance.get(`${AvailabilityAPIUrl}/all/free`);
}

export const getAvailabilityById = async (id: string) => {
  return await axiosAuthInstance.get(`${AvailabilityAPIUrl}/get/${id}`);
}

export const createAvailability = async (data: any) => {
  return await axiosAuthInstance.post(`${AvailabilityAPIUrl}/create`, data);
}

export const cancelAvailability = async (id: string) => {
  return await axiosAuthInstance.patch(`${AvailabilityAPIUrl}/status/${id}`, {status_availability: "Annulé"});
}

export const deleteAvailability = async (id: string) => {
  return await axiosAuthInstance.delete(`${AvailabilityAPIUrl}/delete/${id}`);
}