import { cancelAvailability } from "@/api/availability"
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";

export const useCancelAvailability = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (id: string) => cancelAvailability(id),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Disponibilité annulée !"
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