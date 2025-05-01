import { updatePassword } from "@/api/users"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const usePatchPassword = () => {
    const mutation = useMutation({
        mutationFn: (data: any) => updatePassword(data),
        onSuccess: () => {
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Mot de passe modifié !"
            })
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: error.message
            })
        }
    })

    return mutation;
}