import { QueryCacheKey } from "@/api/QueryCacheKey"
import { getNotOrganizedRequest } from "@/api/request"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetNotOrganizedRequest = () => {
    const { data, isLoading, error, isError, refetch } = useQuery({
        queryKey: [QueryCacheKey.NOT_ORGANIZED_REQUEST],
        queryFn: () => getNotOrganizedRequest(),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: error.message
            })
        }
    }, [error])

    return {
        isLoading,
        data: data?.data,
        refetch
    }
}