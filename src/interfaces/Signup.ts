export interface UserPersonnalSignup {
    nom: string;
    prenom?: any ;
    adresse: string;
}

export interface UserBirthSignup {
    date_naissance: string;
    lieu_naissance: string;
    telephone: string;
}

export interface UserCNISignup {
    date_cni: string;
    lieu_cni: string;
    cni: string;
}