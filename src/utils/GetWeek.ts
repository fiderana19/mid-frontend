import dayjs from "dayjs";
import { ToLocalISOString } from './toIsoString';

export const getWeekDates = (weekString: any) => {
    const [year, week] = weekString.split('-');
    const yearNum = parseInt(year);
    const weekNum = parseInt(week);

    const mondayInitial = new Date(yearNum, 0, 1);
    mondayInitial.setDate(mondayInitial.getDate() + (weekNum - 1) * 7);

    const sundayInitial = new Date(mondayInitial);
    sundayInitial.setDate(sundayInitial.getDate() + 6);

    const monday = dayjs(mondayInitial);
    const sunday = dayjs(sundayInitial);

    const formattedMonday = ToLocalISOString(monday);
    const formattedSunday = ToLocalISOString(sunday);
    return { 
        date_debut: formattedMonday,
        date_end: formattedSunday
    }
};