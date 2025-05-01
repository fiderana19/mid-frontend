import { getAllAvailability } from '@/api/availability';
import { QueryCacheKey } from '@/api/QueryCacheKey';
import { TOAST_TYPE } from '@/constants/ToastType';
import { showToast } from '@/utils/Toast';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGetAllAvailability = () => {
    const { data, isLoading, error ,isError, refetch } = useQuery({
        queryKey: [QueryCacheKey.AVAILABILITIES],
        queryFn: () => getAllAvailability(),
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