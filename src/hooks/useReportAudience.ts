import { audienceReport } from "@/api/audience"
import { TOAST_TYPE } from "@/constants/ToastType";
import { ReportAudienceInterface } from "@/interfaces/Audience";
import { showToast } from "@/utils/Toast";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";

export const useReportAudience = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: ReportAudienceInterface) => audienceReport(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Audience reportée !"
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