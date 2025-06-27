import * as yup from 'yup';

export const AudienceOrganizeValidation = yup.object({
    user: yup.string().required("Utilisateur requis"),
    request: yup.string().required("Demande d'audience requise"),
    availability: yup.string().required("Veuillez selectionner un disponibilité"),
})

export const AudienceSearchValidation = yup.object({
    status_audience: yup.string().required("Statut de l'audience requis"), 
    date_debut: yup.string().required("Date de recherche requis"), 
    date_end: yup.string().required("Date de recherche requis")
})

export const AudienceReportValidation = yup.object({
    _id: yup.string().required("Audience à reporter requis"),
    new_availability: yup.string().required("Veuillez selectionnez une disponibilité"),
    old_availability: yup.string().required("Disponibilité à reporter requis"),
})