import dayjs from "dayjs";
import { ToLocalISOString } from "./toIsoString";

export const getYearDates = (yearString: any) => {
    const firstDay = new Date(yearString, 0, 1); // 0 représente janvier
    const lastDay = new Date(yearString, 11, 31); 

    const debut = dayjs(firstDay);
    const end = dayjs(lastDay);

    const formattedDebut = ToLocalISOString(debut);
    const formattedEnd = ToLocalISOString(end);
    return { 
        date_debut: formattedDebut,
        date_end: formattedEnd
    }
};