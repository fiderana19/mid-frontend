import { getAllFreeAvailability } from "@/api/availability"
import { QueryCacheKey } from "@/api/QueryCacheKey"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetAllFreeAvailability = () => {
    const { data, isLoading, error, isError, refetch } = useQuery({
        queryKey: [QueryCacheKey.FREE_AVAILABILITIES],
        queryFn: () => getAllFreeAvailability(),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la récuperation des diponibilités libres !"
            })
        }
    }, [error])

    return {
        isLoading,
        data: data?.data,
        refetch
    }
}