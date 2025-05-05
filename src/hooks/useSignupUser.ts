import { userSignup } from "@/api/users"
import { TOAST_TYPE } from "@/constants/ToastType"
import { SignupInterface } from "@/interfaces/User"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useSignupUser = () => {
    const mutation = useMutation({
        mutationFn: (data: SignupInterface) => userSignup(data),
        onError: (error: AxiosError | any) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: error?.response?.data?.message,
            })
        }
    })

    return mutation;
}