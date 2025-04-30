import axiosAuthInstance from "./Config";

const AudienceAPIUrl = `${import.meta.env.VITE_BASE_URL}/audience`;
const RequestAPUrl = `${import.meta.env.VITE_BASE_URL}/request`;
const UserAPIUrl = `${import.meta.env.VITE_BASE_URL}/auth`;

export const getUserStat = async () => {
  return await axiosAuthInstance.get(`${UserAPIUrl}/chart`);
}

export const getLatestUser = async () => {
  return await axiosAuthInstance.get(`${UserAPIUrl}/latest`);
}

export const getRequestChart = async () => {
  return await axiosAuthInstance.get(`${RequestAPUrl}/chart`);
}

export const getAudienceChart = async () => {
  return await axiosAuthInstance.get(`${AudienceAPIUrl}/chart`);
}

export const getAudienceLast = async () => {
  return await axiosAuthInstance.get(`${AudienceAPIUrl}/last`);
}