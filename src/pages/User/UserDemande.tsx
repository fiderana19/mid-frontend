import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined, DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined, WarningFilled } from "@ant-design/icons";
import { lazy, Suspense, useState } from "react";
import { Modal } from "antd";
import { HttpStatus } from "../../constants/Http_status";
import { useAuth } from "@/context/AuthContext";
import { useGetAllRequestByUser } from "@/hooks/useGetAllRequestByUser";
import { useDeleteRequest } from "@/hooks/useDeleteRequest";
import { Button } from "@/components/ui/button";
import Status from "@/components/status/Status";
import { StatusType } from "@/constants/Status_type";
const UserNavigation = lazy(() => import("../../components/Navigation/UserNavigation"));

function UserDemande() {
    const { token } = useAuth();
    const { data: requests, refetch, isLoading } = useGetAllRequestByUser(token ? JSON.parse(atob(token.split('.')[1])).id : null);
    const { mutateAsync: requestDelete } = useDeleteRequest({
        action() {
            refetch()
        },
    })
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<any>();
    const navigate = useNavigate();


    const handleDeleteConfirm = async () => {
        if(selectedRequest) {
            const response = await requestDelete(selectedRequest);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                setIsDeleteModalVisible(false);    
            }
        }
    }
    
    return(
        <div className="w-full min-h-screen bg-four">
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <UserNavigation />
            </Suspense>
            <div className="pt-16 sm:px-20 px-4">
                <div className="sm:flex block justify-between items-center">
                    <div className="text-lg font-latobold my-4">Les demandes d'audience</div>
                    <Link to="/user/add/demande" className="flex justify-end">
                        <Button variant={'default'}>
                            <PlusOutlined />
                            <div>Faire une demande</div>
                        </Button>
                    </Link>
                </div>
                <div className='my-7 grid gap-4 justify-center grid-customized'>
                    { requests && requests.map((request: any, index: any) => {
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
                                            <Status type={`${StatusType.alert}`} data={`${request.status_request}`}/>
                                            : (
                                                request.status_request[0] === "Accepté" ?
                                                <Status type={`${StatusType.success}`} data={`${request.status_request}`}/>
                                                :
                                                <Status type={`danger`} data={`${request.status_request}`}/>
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
                                            <Button 
                                                variant={'primary'}
                                                onClick={() => {navigate(`/user/edit/demande/${request._id}`)}}>
                                                <EditOutlined />
                                                Modifier
                                            </Button>
                                            <Button
                                                variant={'destructive'} 
                                                onClick={() => {setSelectedRequest(request._id); setIsDeleteModalVisible(true)}}
                                                >
                                                <DeleteOutlined />
                                                Supprimer
                                            </Button>
                                        </div>
                                    }
                                    
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
                {                          
                    (!isLoading && requests && requests.length < 1) &&
                    <div className="mx-auto flex justify-center w-full my-4 text-gray-500">
                        <div className="text-center">
                            <CloseOutlined className="text-5xl" />
                            <div className="my-2">
                                Aucune demande
                            </div>
                        </div>
                    </div>
                }
                {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
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
                            <Button 
                                variant={'secondary'}
                                onClick={() => setIsDeleteModalVisible(false)}
                            >   
                                Annuler
                            </Button>
                            <Button
                                variant={'destructive'} 
                                onClick={handleDeleteConfirm}
                            >   
                                <div>Supprimer</div>
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default UserDemande;