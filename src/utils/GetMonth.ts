import dayjs from "dayjs";
import { ToLocalISOString } from "./toIsoString";

export const getMonthDates = (dateString: any) => {
    const [year, month] = dateString.split('-');
    const firstDay = new Date(year, month - 1, 1); // Mois commence à 0
    const lastDay = new Date(year, month, 0);

    const debut = dayjs(firstDay);
    const end = dayjs(lastDay);

    const formattedDebut = ToLocalISOString(debut);
    const formattedEnd = ToLocalISOString(end);
    return { 
        date_debut: formattedDebut,
        date_end: formattedEnd
    }
};