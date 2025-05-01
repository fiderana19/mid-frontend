import { QueryCacheKey } from "@/api/QueryCacheKey"
import { getAllRequest } from "@/api/request"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetAllRequest = () => {
    const { data, isLoading, error, isError, refetch } = useQuery({
        queryKey: [QueryCacheKey.REQUESTS],
        queryFn: () => getAllRequest(),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la récuperation des demandes d'audiences !"
            })
        }
    }, [error])

    return {
        isLoading,
        refetch,
        data: data?.data
    }
}