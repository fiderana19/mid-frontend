import { QueryCacheKey } from "@/api/QueryCacheKey"
import { getUserForChart } from "@/api/users"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetUserForChart = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [QueryCacheKey.USER_FOR_CHART],
        queryFn: () => getUserForChart(),
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la récuperation des utilisateurs pour le chart !"
            })
        }
    }, [error])

    return {
        isLoading,
        data: data?.data,
    }
}