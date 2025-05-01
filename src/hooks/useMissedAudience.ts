import { audienceMissed } from "@/api/audience"
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";

export const useMissedAudience = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (id: string) => audienceMissed(id),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Audience absentée !"
            })
        },
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: error?.message
            })
        }
    })

    return mutation;
}