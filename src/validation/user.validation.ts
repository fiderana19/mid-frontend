import * as yup from 'yup';

export const UserChangePasswordValidation = yup.object({
    old_password: yup.string().required("Mot de passe acteul requis !"),
    new_password: yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères !").required("Nouveau mot de passe requis !")
});

export const UserFirstPasswordValidation = yup.object({
    password: yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères !").required("Nouveau mot de passe requis !")
});