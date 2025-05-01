import { audienceCancel } from "@/api/audience"
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";

export const useCancelAudience = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (id: string) => audienceCancel(id),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Audience annulée !"
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