export interface LoginInterface {
    email: string;
    password: string;
}

export interface SignupInterface {
    nom: string;
    prenom: string;
    email: string;
    adresse: string;
    telephone: string;
    date_naissance: string;
    lieu_naissance: string;
    cni: string;
    date_cni: string;
    lieu_cni: string;
    profile_photo: any;
    cni_photo: any;
}

export interface InitializeUserPasswordInterface {
    _id: string,
    password: string;
}

export interface UpdateUserPasswordInterface {
    _id: string,
    old_password: string;
    new_password: string;
    confirm_password: string;
}
