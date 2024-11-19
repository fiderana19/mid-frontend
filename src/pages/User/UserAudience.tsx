import { useState, useEffect } from "react";
import { getAudienceByUser } from "../../api/audience";
import UserNavigation from "../../components/Navigation/UserNavigation";
import { WarningOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

function UserAudience() {
    const [audiences, setAudiences] = useState<any[]>([]);
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
            const response = await getAudienceByUser(access_token, decodedToken.id);
            if(response) {
                console.log(response)
                setAudiences(response.data);
            }
        }
    }

    return(
        <div className="w-full min-h-screen bg-four">
            <UserNavigation />
            <div className="pt-16 sm:px-20 px-4">
                <div className="text-lg font-latobold my-4">Les audiences</div>
                <div className='my-7 grid gap-2 justify-center grid-cols-customized'>
                    {
                        audiences && audiences.map((audience, index) => {
                            return(
                            <div key={index} className="rounded bg-gray-100 w-72  shadow-md">
                                <div className="flex bg-gray-300 justify-between items-center p-2 rounded">
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
                                    <div className="flex justify-end">
                                    {
                                        audience.status_audience[0] === "Reporté" ? 
                                            <div className="rounded bg-blue-500 px-2 flex gap-2 border border-blue-600 text-xs">
                                                <WarningOutlined />
                                                <div>{ audience.status_audience }</div>  
                                            </div>
                                            : (
                                            audience.status_audience[0] === "Fixé" ?
                                            <div className="rounded bg-green-500 px-2 flex gap-2 border border-green-600 text-xs">
                                                <CheckCircleOutlined />
                                                <div>{ audience.status_audience }</div>  
                                            </div>                                                
                                            :
                                            <div className="rounded bg-red-500 px-2 flex gap-2 border border-red-600 text-xs">
                                                <CloseCircleOutlined />
                                                <div>{ audience.status_audience }</div>  
                                            </div>
                                        )
                                    }
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="text-lg font-latobold"> { audience.request_type } </div>
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
            </div>
        </div>
    )
}

export default UserAudience;