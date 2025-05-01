import { QueryCacheKey } from "@/api/QueryCacheKey"
import { getAllRequestByUser } from "@/api/request"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { showToast } from '../utils/Toast';
import { TOAST_TYPE } from "@/constants/ToastType";

export const useGetAllRequestByUser = (id: string) => {
    const { data, isLoading, error, isError, refetch } = useQuery({
        queryKey: [QueryCacheKey.REQUESTS, id],
        queryFn: () => getAllRequestByUser(id),
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
        data: data?.data,
        refetch
    }
}