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

export const UserCNIValidation = yup.object({
    date_cni: yup.string().required("Date de délivrance CIN requis !"),
    lieu_cni: yup.string().required("Lieu de délivrance CIN requis !"),
    cni: yup.string().length(12, "Le numero CIN doit être composé de 12 chiffres !").required("Numero CIN requis !")
})

export const UserFileValidation = yup.object({
    email: yup.string().email("Adresse mail invalide !").required("Adresse mail requis !"),
    profile_photo: yup.mixed().required("Photo d'identité requis !"),
    cni_photo: yup.mixed().required("San du CIN requis !"),
})