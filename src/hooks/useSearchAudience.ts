import { audienceSearch } from "@/api/audience"
import { TOAST_TYPE } from "@/constants/ToastType"
import { SerachAudienceInterface } from "@/interfaces/Audience"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useSearchAudience = () => {
    const mutation = useMutation({
        mutationFn: (data: SerachAudienceInterface) => audienceSearch(data),
        onError: (error: AxiosError) => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: error?.message
            })
        }
    })

    return mutation;
}