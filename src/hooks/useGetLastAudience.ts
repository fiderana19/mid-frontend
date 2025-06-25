import { getAudienceLast } from "@/api/dashboard";
import { QueryCacheKey } from "@/api/QueryCacheKey";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useGetLastAudience = () => {
    const { data, isError, error, isLoading, refetch } = useQuery({
        queryKey: [QueryCacheKey.LAST_AUDIENCE, QueryCacheKey.AUDIENCES],
        queryFn: () => getAudienceLast(),
        staleTime: Infinity
    })

    useEffect(() => {
      if(isError) {
        showToast({
            type: TOAST_TYPE.ERROR,
            message: "Erreur lors de la recuperation de la derniere audience"
        })
      }
    }, [error])

    return {
        data: data?.data,
        isLoading,
        refetch
    }
}

export default useGetLastAudience;