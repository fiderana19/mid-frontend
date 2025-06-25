import * as yup from 'yup';

export const AudienceOrganizeValidation = yup.object({
    user: yup.string().required("Utilisateur requis"),
    request: yup.string().required("Demande d'audience requise"),
    availability: yup.string().required("Veuillez selectionner un disponibilité"),
})