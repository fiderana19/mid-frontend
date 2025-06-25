import { getLatestUser } from "@/api/dashboard";
import { QueryCacheKey } from "@/api/QueryCacheKey";
import { TOAST_TYPE } from "@/constants/ToastType";
import { showToast } from "@/utils/Toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useGetLatestUser = () => {
    const { data, error, isError, isLoading , refetch } = useQuery({
        queryKey: [QueryCacheKey.USERS, QueryCacheKey.LATEST_USERS ],
        queryFn: () => getLatestUser(),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la recuperation des derniers comptes d'utilisateur"
            })
        }
    }, [error])
    
    return {
        data: data?.data,
        isLoading,
        refetch
    }
}

export default useGetLatestUser;