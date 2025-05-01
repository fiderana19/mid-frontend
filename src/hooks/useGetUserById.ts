import { QueryCacheKey } from "@/api/QueryCacheKey"
import { getUserById } from "@/api/users"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetUserById = (id: string) => {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: [QueryCacheKey.USERS, id],
        queryFn: () => getUserById(id),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la récuperation de l'utilisateur !"
            })
        }
    }, [error])

    return {
        isLoading,
        data: data?.data
    }
}