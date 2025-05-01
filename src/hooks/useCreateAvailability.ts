import { createAvailability } from "@/api/availability"
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";

export const useCreateAvailability = ({action}: {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: any) => createAvailability(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Disponibilité ajoutée !"
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