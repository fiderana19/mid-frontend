import * as yup from 'yup'

export const UserPersonnalValidation = yup.object({
    nom: yup.string().required("Nom d'utilisateur requis !"),
    prenom: yup.string().notRequired(),
    adresse: yup.string().required("Adresse de l'utilisateur requis !")
})

export const UserBirthValidation = yup.object({
    date_naissance: yup.string().required("Date de naissance requis !"),
    lieu_naissance: yup.string().required("Lieu de naissance requis !"),
    telephone: yup.string().length(9, "Le telephone doit être composé de 9 chiffres !").required("Telephone requis !")
})