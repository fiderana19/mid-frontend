import React, { lazy, Suspense } from "react";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { useGetAudienceByUser } from "@/hooks/useGetAudienceByUser";
import { useAuth } from "@/context/AuthContext";
import AudienceStatus from "@/components/status/AudienceStatus";
const UserNavigation = lazy(() => import("../../components/Navigation/UserNavigation"));

const UserAudience: React.FC = () => {
    const { token } = useAuth();
    const { isLoading, data: audiences } = useGetAudienceByUser(token ? JSON.parse(atob(token.split('.')[1])).id : null);
    
    return(
        <div className="w-full min-h-screen bg-four">
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <UserNavigation />
            </Suspense>
            <div className="pt-16 sm:px-20 px-4">
                <div className="text-lg font-latobold my-4">Les audiences</div>
                <div className='my-7 grid gap-4 justify-center grid-customized'>
                    {
                        audiences && audiences.map((audience: any, index: any) => {
                            return(
                            <div key={index} className="rounded bg-white w-72  shadow-md">
                                <div className="flex bg-gray-400 bg-opacity-80 gap-2 items-center p-2 rounded">
                                    <img src={`data:image/png;base64,${audience.user_profile_photo}`} className="w-9 h-9 rounded-full object-cover border" />
                                    <div>
                                        <div className="flex gap-2">
                                            <div> Date : </div>
                                            <div className="font-latobold"> { audience.availability_date } </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div> De  </div>
                                            <div className="font-latobold"> { audience.availability_hour_debut } </div>
                                            <div> à  </div>
                                            <div className="font-latobold"> { audience.availability_hour_end } </div>
                                        </div>
                                    </div> 
                                    
                                </div>
                                
                                <div className="p-2">
                                    <div className="flex justify-end">
                                        <AudienceStatus value={audience.status_audience[0]} />     
                                    </div>
                                    <div className="text-md font-latobold"> { audience.request_type } </div>
                                    <div>
                                        <span>Objet : </span>
                                        <span className="font-latobold"> { audience.request_object } </span>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
                {                          
                    (!isLoading && audiences && audiences.length < 1) &&
                    <div className="mx-auto flex justify-center w-full my-4 text-gray-500">
                        <div className="text-center">
                            <CloseOutlined className="text-5xl" />
                            <div className="my-2">
                                Aucune audience
                            </div>
                        </div>
                    </div>
                }                    
                {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
            </div>
        </div>
    )
}

export default UserAudience;