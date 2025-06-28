import * as yup from 'yup';

export const UserChangePasswordValidation = yup.object({
    _id: yup.string().required(),
    old_password: yup.string().required("Mot de passe acteul requis !"),
    new_password: yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères !").required("Nouveau mot de passe requis !"),
    confirm_password: yup.string().required("Confirmation du nouveau mot de passe requis !"),
});

export const UserFirstPasswordValidation = yup.object({
    _id: yup.string().required(),
    password: yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères !").required("Nouveau mot de passe requis !")
});