import { requestCreate } from "@/api/request"
import { TOAST_TYPE } from "@/constants/ToastType";
import { RequestAddInterface } from "@/interfaces/Request";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";

export const useCreateRequest = ({action}: {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: RequestAddInterface) => requestCreate(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Demande d'audience bien ajoutée !"
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