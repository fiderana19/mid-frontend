import { Link, useNavigate } from "react-router-dom";
import UserNavigation from "../../components/Navigation/UserNavigation";
import { DeleteOutlined, EditOutlined, PlusOutlined, WarningFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllRequestByUser, requestDelete } from "../../api/request";
import { message, Modal } from "antd";

function UserDemande() {
    const [requests, setRequests] = useState<any[]>([]);
    const [access_token, setAccessToken] = useState<string | null>(localStorage.getItem('token'));
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<any>()
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserRequest()
    }, [])
    async function fetchUserRequest () {
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token)
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const response = await getAllRequestByUser(token, decodedToken.id);
            if(response) {
                setRequests(response);
            }
        }
    }

    const handleDeleteConfirm = async () => {
        if(selectedRequest) {
            const response = await requestDelete(access_token,selectedRequest);
            if(response?.status === 200 || response?.status === 201) {
                fetchUserRequest();
                message.success("Demande d'audience supprimée !")
                setIsDeleteModalVisible(false);    
            }
        }
    }
    
    return(
        <div className="w-full min-h-screen bg-four">
            <UserNavigation />
            <div className="pt-16 sm:px-20 px-4">
                <div className="sm:flex block justify-between items-center">
                    <div className="text-lg font-latobold my-4">Les demandes d'audience</div>
                    <Link to="/user/add/demande" className="flex justify-end">
                        <button className='bg-gray-500 border border-gray-600 hover:transition-colors hover:bg-gray-700 text-white flex font-latobold py-1 px-3 rounded items-center gap-1'>
                            <PlusOutlined />
                            <div>Faire une demande</div>
                        </button>
                    </Link>
                </div>
                <div className='my-7 grid gap-4 justify-center grid-cols-customized'>
                    { requests && requests.map((request, index) => {
                        return(
                            <div key={index} className="rounded bg-white w-72 shadow-md">
                                <div className="flex gap-2 p-2 bg-gray-400 bg-opacity-80 rounded">
                                    <img src={`data:image/png;base64,${request.profile_photo}`} className="w-9 h-9 rounded-full object-cover border" />
                                    <div className="">
                                        <div className="font-latobold">
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
                                            <div className="max-w-max">
                                                <div className="flex items-center bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                    <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                                                    { request.status_request }
                                                </div>   
                                            </div>                                     
                                            : (
                                                request.status_request[0] === "Accepté" ?
                                                <div className="max-w-max">
                                                    <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                        <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                        { request.status_request }
                                                    </div>        
                                                </div>                                                                        
                                                :
                                                <div className="max-w-max">
                                                    <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                        <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                                        { request.status_request }
                                                    </div>     
                                                </div>                                                                           
                                            )
                                        } 
                                    </div>
                                    <div className="mt-4">
                                        <span>Motif :</span>
                                        <span className="font-latobold"> { request.object } </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div>Pour la semaine de </div>
                                        <div className="font-latobold"> { request.date_wanted_debut } </div>
                                    </div>
                                    {
                                        request.status_request[0] !== "Accepté" &&
                                        <div className="flex justify-end mt-2 gap-2">
                                            <button 
                                                onClick={() => {navigate(`/user/edit/demande/${request._id}`)}}
                                                className='bg-blue-500 border border-blue-600 hover:transition-colors hover:bg-blue-700 text-white flex py-1 px-3 rounded items-center gap-1'>
                                                <EditOutlined />
                                                Modifier
                                            </button>
                                            <button 
                                                className='bg-red-500 border border-red-600 hover:transition-colors hover:bg-red-700 text-white flex py-1 px-3 rounded items-center gap-1'
                                                onClick={() => {setSelectedRequest(request._id); setIsDeleteModalVisible(true)}}
                                                >
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
                <Modal title="Suppression de la demande" 
                    open={isDeleteModalVisible}
                    onOk={handleDeleteConfirm}
                    onCancel={() => setIsDeleteModalVisible(false)}
                    onClose={() => setIsDeleteModalVisible(false)}
                    footer={null}
                >
                    <div>
                        <WarningFilled className='mr-2 text-red-500 text-xl' />  
                        Êtes-vous sûr de vouloir supprimer ce compte de citoyen ?
                        <div className='flex justify-end gap-2'>
                            <button 
                                onClick={() => setIsDeleteModalVisible(false)}
                                className="border mt-2 hover:bg-gray-100 py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >   
                                Annuler
                            </button>
                            <button 
                                onClick={handleDeleteConfirm}
                                className= "flex gap-2 items-center border mt-2 bg-red-500 hover:border-red-600 hover:bg-red-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            >   
                                <div>Supprimer</div>
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default UserDemande;