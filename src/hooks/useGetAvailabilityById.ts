import { getAvailabilityById } from "@/api/availability"
import { QueryCacheKey } from "@/api/QueryCacheKey"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetAvailabilityById = (id: string) => {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: [QueryCacheKey.AVAILABILITIES, id],
        queryFn: () => getAvailabilityById(id),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la récuperation de la diponibilité !"
            })
        }
    }, [error])

    return {
        isLoading,
        data: data?.data,
    }
}