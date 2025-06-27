import { getRequestChart } from "@/api/dashboard";
import { QueryCacheKey } from "@/api/QueryCacheKey";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useGetRequestForChart = () => {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: [QueryCacheKey.REQUESTS, QueryCacheKey.REQUEST_FOR_CHART],
        queryFn: () => getRequestChart(),
        staleTime: Infinity,
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la récuperation des demande d'audiences pour le dashboard"
            })
        }
    }, [error])
    
    return {
        data: data?.data,
        isLoading
    }
}

export default useGetRequestForChart;