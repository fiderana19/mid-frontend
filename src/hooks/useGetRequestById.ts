import { QueryCacheKey } from "@/api/QueryCacheKey"
import { getRequestById } from "@/api/request"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetRequestById = (id: string) => {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: [QueryCacheKey.REQUESTS, id],
        queryFn: () => getRequestById(id),
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
        data: data?.data
    }
}