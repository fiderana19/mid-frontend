import { userSignup } from "@/api/users"
import { TOAST_TYPE } from "@/constants/ToastType"
import { SignupInterface } from "@/interfaces/User"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useSignupUser = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: SignupInterface) => userSignup(data),
        onSuccess: () => {
            if(action) {
                action();
            }
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