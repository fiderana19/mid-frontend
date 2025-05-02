import * as yup from 'yup'

export const LoginValidation = yup.object({
    email: yup.string().email("Adresse mail invalide !").required("Adresse mail requis !"),
    password: yup.string().required("Mot de passe requis !")
})