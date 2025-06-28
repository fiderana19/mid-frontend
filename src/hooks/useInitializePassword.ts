import { initializePassword } from "@/api/users"
import { TOAST_TYPE } from "@/constants/ToastType"
import { InitializeUserPasswordInterface } from "@/interfaces/User"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useInitializePassword = () => {
    const mutation = useMutation({
        mutationFn: (data: InitializeUserPasswordInterface) => initializePassword(data),
        onSuccess: () => {
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Mot de passe initialisé !"
            })
        },
        onError : (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: error.message
            })
        }
    })

    return mutation;
}