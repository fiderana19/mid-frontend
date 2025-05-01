import { deleteAvailability } from "@/api/availability"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useDeleteAvailability = ({action}: {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (id: string) => deleteAvailability(id),
        onSuccess: () => {
            if(action) {
                action()
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Disponibilité supprimée !"
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