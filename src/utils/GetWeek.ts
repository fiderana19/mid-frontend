import { ToLocalISOString } from './toIsoString';

export const getWeekStartAndEnd = (date: any) => {
    const weekStart = date.clone().startOf('week');
    const weekEnd = date.clone().endOf('week');
    const date_debut = ToLocalISOString(weekStart);
    const date_end = ToLocalISOString(weekEnd);
    return { date_debut , date_end };
  };