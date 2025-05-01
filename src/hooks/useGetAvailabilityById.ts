import { getAvailabilityById } from "@/api/availability"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetAvailabilityById = (id: string) => {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: [id],
        queryFn: () => getAvailabilityById(id),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: error?.message
            })
        }
    }, [error])

    return {
        isLoading,
        data: data?.data,
    }
}