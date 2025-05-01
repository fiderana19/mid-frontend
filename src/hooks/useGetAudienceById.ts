import { getAudienceById } from "@/api/audience"
import { QueryCacheKey } from "@/api/QueryCacheKey"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetAudienceById = (id: string) => {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: [QueryCacheKey.AUDIENCES, id],
        queryFn: () => getAudienceById(id),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la récuperation de la demande d'audience !"
            })
        }
    }, [error])

    return {
        isLoading,
        data: data?.data,
    }
}