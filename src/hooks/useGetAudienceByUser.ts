import { getAudienceByUser } from "@/api/audience"
import { QueryCacheKey } from "@/api/QueryCacheKey"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetAudienceByUser = (id: string) => {
    const { data, isLoading, error, isError, refetch } = useQuery({
        queryKey: [QueryCacheKey.AUDIENCES, id],
        queryFn: () => getAudienceByUser(id),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la récuperation des audiences de l'utilisateur !"
            })
        }
    }, [error])

    return {
        isLoading,
        data: data?.data,
        refetch
    }
}