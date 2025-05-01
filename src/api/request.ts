import axiosAuthInstance from "./Config";

const RequestAPUrl = `${import.meta.env.VITE_BASE_URL}/request`;

export const getAllRequest = async () => {
  return await axiosAuthInstance.get(`${RequestAPUrl}/all`);
}

export const getNotOrganizedRequest = async () => {
  return await axiosAuthInstance.get(`${RequestAPUrl}/fail`);
}

export const getRequestById = async (id: string) => {
  return await axiosAuthInstance.get(`${RequestAPUrl}/get/${id}`);
}

export const getAllRequestByUser = async (id: string) => {
  return await axiosAuthInstance.get(`${RequestAPUrl}/user/${id}`);
}

export const requestCreate = async (requestData: any) => {
  return await axiosAuthInstance.post(`${RequestAPUrl}/create`, requestData);
}

export const requestEdit = async (data: any) => {
  return await axiosAuthInstance.patch(`${RequestAPUrl}/update/${data?._id}`, data);
}

export const requestDelete = async (id: string) => {
  return await axiosAuthInstance.delete(`${RequestAPUrl}/delete/${id}`);
}

export const validateRequest = async (id: string) => {
  return await axiosAuthInstance.patch(`${RequestAPUrl}/accept/${id}`, { status_request: "Accepté" });
}

export const denyRequest = async (id: string) => {
  return await axiosAuthInstance.patch(`${RequestAPUrl}/deny/${id}`, { status_request: "Refusé" });
}