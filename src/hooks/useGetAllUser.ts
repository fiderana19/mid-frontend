import { QueryCacheKey } from "@/api/QueryCacheKey"
import { getAllUser } from "@/api/users"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetAllUser = () => {
    const { data, isLoading, error, isError, refetch } = useQuery({
        queryKey: [QueryCacheKey.USERS],
        queryFn: () => getAllUser(),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la récuperation des utilisateurs !"
            })
        }
    }, [error])

    return {
        isLoading,
        data: data?.data,
        refetch
    }
}