export interface ReportAudienceInterface {
    _id: string;
    new_availability: string;
    old_availability: string;
}

export interface SerachAudienceInterface {
    status_audience: string;
    date_debut: string;
    date_end: string;
}

export interface CreateAudienceInterface {
    user: string;
    availability: string;
    request: string;
}