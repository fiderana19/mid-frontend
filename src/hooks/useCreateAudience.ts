import { audienceCreate } from "@/api/audience"
import { TOAST_TYPE } from "@/constants/ToastType";
import { CreateAudienceInterface } from "@/interfaces/Audience";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";

export const useCreateAudience = ({action}: {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: CreateAudienceInterface) => audienceCreate(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Audience organisée !"
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