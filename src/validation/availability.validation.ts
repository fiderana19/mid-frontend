import * as yup from 'yup';

export const CreateAvailabilityValidation = yup.object({
    date_availability: yup.string().required("Date de la disponibilité requis"),
    hour_debut: yup.string().required("Heure debut de la disponibilité requis"),
    hour_end: yup.string().required("Heure fin de la disponibilité requis"),
})