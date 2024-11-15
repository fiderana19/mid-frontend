import { Link, useNavigate } from "react-router-dom";
import UserNavigation from "../../components/Navigation/UserNavigation";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined, WarningOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllRequestByUser } from "../../api/request";

function UserDemande() {
    const [requests, setRequests] = useState<any[]>([]);
    const [access_token, setAccessToken] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserRequest () {
            const token = localStorage.getItem('token');
            if(token) {
                setAccessToken(token)
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const response = await getAllRequestByUser(access_token, decodedToken.id);
                if(response) {
                    setRequests(response);
                }
            }
        }
        fetchUserRequest()
    }, [])
    
    return(
        <div className="w-full">
            <UserNavigation />
            <div className="pt-16 sm:px-20 px-4">
                <div className="sm:flex block justify-between items-center">
                    <div className="text-lg font-bold my-4">LISTE DE VOS DEMANDES D'AUDIENCE</div>
                    <Link to="/user/add/demande" className="flex justify-end">
                        <button className='bg-gray-500 hover:bg-gray-700 text-white flex font-bold py-1 px-3 rounded items-center gap-1'>
                            <PlusOutlined />
                            <div>Faire une demande</div>
                        </button>
                    </Link>
                </div>
                <div className='my-7 grid gap-4 justify-center grid-cols-customized'>
                    { requests && requests.map((request, index) => {
                        return(
                            <div key={index} className="rounded bg-gray-100 w-72 shadow-md">
                                <div className="flex gap-2 p-2 bg-gray-400">
                                    <img src={`data:image/png;base64,${request.profile_photo}`} className="w-9 h-9 rounded-full object-cover border" />
                                    <div className="">
                                        <div className="font-bold">
                                                { request.type_request }
                                            </div>
                                            <div className="text-xs">
                                                soumise le { request.request_creation }
                                            </div>
                                        </div>
                                </div>
                                <div className="p-2">
                                    <div className="flex justify-end">
                                        {
                                            request.status_request[0] === "En attente" ? 
                                            <div className="rounded bg-yellow-500 px-2 flex gap-2 border border-yellow-600 text-xs">
                                                <WarningOutlined />
                                                <div>{ request.status_request }</div>  
                                            </div>
                                            : (
                                                request.status_request[0] === "Accepté" ?
                                                <div className="rounded bg-green-500 px-2 flex gap-2 border border-green-600 text-xs">
                                                    <CheckCircleOutlined />
                                                    <div>{ request.status_request }</div>  
                                                </div>                                                
                                            :
                                                <div className="rounded bg-red-500 px-2 flex gap-2 border border-red-600 text-xs">
                                                    <CloseCircleOutlined />
                                                    <div>{ request.status_request }</div>  
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="mt-4">
                                        <span>Motif :</span>
                                        <span className="font-semibold"> { request.object } </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div>Pour la semaine de </div>
                                        <div className="font-bold"> { request.date_wanted_debut } </div>
                                    </div>
                                    {
                                        request.status_request[0] !== "Accepté" &&
                                        <div className="flex justify-end mt-2 gap-2">
                                            <button 
                                                onClick={() => {navigate(`/user/edit/demande/${request._id}`)}}
                                                className='bg-blue-500 hover:bg-blue-700 text-white flex py-1 px-3 rounded items-center gap-1'>
                                                <EditOutlined />
                                                Modifier
                                            </button>
                                            <button className='bg-red-500 hover:bg-red-700 text-white flex py-1 px-3 rounded items-center gap-1'>
                                                <DeleteOutlined />
                                                Supprimer
                                            </button>
                                        </div>
                                    }
                                    
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserDemande;