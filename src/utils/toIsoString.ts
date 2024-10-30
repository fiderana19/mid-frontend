import dayjs from "dayjs"
import { local } from "../constants/Timezone";

export const ToLocalISOString = (date: any) => {
    const dateafter = dayjs(date);
    const dateWithLocalGMT = dateafter.add(local.gmt,'hour');
    return dateWithLocalGMT.toISOString();
}

export const AssignDateToTime = (date_to_take: any, time_to_assign: any) => {
    const dateToTake = dayjs(date_to_take);
    const timeToAssign = dayjs(time_to_assign);
  
    const hours = timeToAssign.hour();
    const minutes = timeToAssign.minute();
    const seconds = timeToAssign.second();
  
    const assignedDateTime = dateToTake.hour(hours).minute(minutes).second(seconds);
  
    return assignedDateTime;
  }