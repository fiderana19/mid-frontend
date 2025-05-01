import { editUser } from "@/api/users"
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";

export const usePatchUser = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: any) => editUser(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Utilisateur modifié !"
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