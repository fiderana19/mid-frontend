import { updatePassword } from "@/api/users"
import { HttpStatus } from "@/constants/Http_status"
import { TOAST_TYPE } from "@/constants/ToastType"
import { UpdateUserPasswordInterface } from "@/interfaces/User"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const usePatchPassword = () => {
    const mutation = useMutation({
        mutationFn: (data: UpdateUserPasswordInterface) => updatePassword(data),
        onSuccess: () => {
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Mot de passe modifié !"
            })
        },
        onError: (error: AxiosError) => {
            if(error?.status == HttpStatus.UNAUTHORIZED) {
                showToast({
                    type: TOAST_TYPE.ERROR,
                    message: error?.response?.data?.message,
                })
            } else {
                showToast({
                    type: TOAST_TYPE.ERROR,
                    message: error?.message,
                })
            }
        }
    })

    return mutation;
}