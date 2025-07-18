import { CreateAudienceInterface, ReportAudienceInterface, SerachAudienceInterface } from "@/interfaces/Audience";
import axiosAuthInstance from "./Config";

const AudienceAPIUrl = `${import.meta.env.VITE_BASE_URL}/audience`;

export const getAllAudience = async () => {
  return await axiosAuthInstance.get(`${AudienceAPIUrl}/all`);
}

export const getAudienceById = async (id:string) => {
  return await axiosAuthInstance.get(`${AudienceAPIUrl}/get/${id}`);
}

export const getAudienceByRef = async (id:string) => {
  return await axiosAuthInstance.get(`${AudienceAPIUrl}/ref/${id}`);
}

export const getAudienceByUser = async (id:string) => {
  return await axiosAuthInstance.get(`${AudienceAPIUrl}/user/${id}`);
}

export const audienceCreate = async (audienceData: CreateAudienceInterface) => {
  return await axiosAuthInstance.post(`${AudienceAPIUrl}/create`, audienceData);
  }

export const audienceReport = async (audienceData: ReportAudienceInterface) => {
  return await axiosAuthInstance.patch(`${AudienceAPIUrl}/report/${audienceData?._id}`, audienceData);
}

export const audienceCancel = async (id: string) => {
  return await axiosAuthInstance.patch(`${AudienceAPIUrl}/cancel/${id}`);
}

export const audienceSearch = async (searchData: SerachAudienceInterface) => {
  return await axiosAuthInstance.post(`${AudienceAPIUrl}/search`, searchData);
}

export const audienceClose = async (id: string) => {
  return await axiosAuthInstance.patch(`${AudienceAPIUrl}/close/${id}`);
}

export const audienceMissed = async (id: string) => {
  return await axiosAuthInstance.patch(`${AudienceAPIUrl}/missed/${id}`);
}