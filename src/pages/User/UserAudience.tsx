import { useState, useEffect, lazy, Suspense } from "react";
import { getAudienceByUser } from "../../api/audience";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
const UserNavigation = lazy(() => import("../../components/Navigation/UserNavigation"));

function UserAudience() {
    const [audiences, setAudiences] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    )

    useEffect(() => {
        fetchUserRequest()
    }, [])

    async function fetchUserRequest () {
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token)
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const response = await getAudienceByUser(token, decodedToken.id);
            if(response) {
                setIsLoading(false);
                setAudiences(response.data);
            }
        }
    }

    return(
        <div className="w-full min-h-screen bg-four">
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <UserNavigation />
            </Suspense>
            <div className="pt-16 sm:px-20 px-4">
                <div className="text-lg font-latobold my-4">Les audiences</div>
                <div className='my-7 grid gap-4 justify-center grid-cols-customized'>
                    {
                        audiences && audiences.map((audience, index) => {
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
                                        { audience.status_audience[0] === "Fixé" ? 
                                            <div className="max-w-max">
                                                <div className="flex items-center bg-blue-200 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                    <span className="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                                                    { audience.status_audience }
                                                </div>       
                                            </div>                                 
                                            : (
                                                audience.status_audience[0] === "Reporté" ?
                                                <div className="max-w-max">
                                                    <div className="flex items-center bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                        <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                                                        { audience.status_audience }
                                                    </div>       
                                                </div>                                 
                                                : (
                                                    audience.status_audience[0] === "Classé" ?
                                                    <div className="max-w-max">
                                                        <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                            { audience.status_audience }
                                                        </div>       
                                                    </div>                                 
                                                    : (
                                                        audience.status_audience[0] === "Absent" ?
                                                        <div className="max-w-max">
                                                           <div className="flex items-center bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                                                                { audience.status_audience }
                                                            </div>       
                                                        </div>                                 
                                                        :
                                                        <div className="max-w-max">
                                                            <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                                                { audience.status_audience }
                                                            </div>       
                                                        </div>                                 
                                                    )
                                                )
                                            )
                                        }     
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