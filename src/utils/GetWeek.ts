import dayjs from "dayjs";

export const getWeekDates = (weekString: any) => {
    // Extraire l'année et le numéro de semaine
    const [year, week] = weekString.split('-');
    const yearNum = parseInt(year);
    const weekNum = parseInt(week);

    // Créer une nouvelle date pour le lundi de la semaine
    const mondayInitial = new Date(yearNum, 0, 1);
    mondayInitial.setDate(mondayInitial.getDate() + (weekNum - 1) * 7);

    // Créer une nouvelle date pour le dimanche de la semaine
    const sundayInitial = new Date(mondayInitial);
    sundayInitial.setDate(sundayInitial.getDate() + 6);

    const monday = dayjs(mondayInitial);
    const sunday = dayjs(sundayInitial);

    // Formater les dates comme vous le souhaitez
    const formattedMonday = monday.toISOString();
    const formattedSunday = sunday.toISOString();
    return { 
        date_debut: formattedMonday,
        date_end: formattedSunday
    }
};