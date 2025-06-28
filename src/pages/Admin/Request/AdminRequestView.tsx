import React, { lazy, Suspense, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";
import { EnvironmentOutlined, LoadingOutlined, MailOutlined, PhoneOutlined, WarningFilled } from "@ant-design/icons";
import { HttpStatus } from "../../../constants/Http_status";
import { useGetRequestById } from "@/hooks/useGetRequestById";
import { useValidateRequest } from "@/hooks/useValidateRequest";
import { useGetAllRequest } from "@/hooks/useGetAllRequest";
import { useDenyRequest } from "@/hooks/useDenyRequest";
import { Button } from "@/components/ui/button";
import RequestStatus from "@/components/status/RequestStatus";
const AdminNavigation = lazy(() => import("../../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../../components/Header"));

const AdminRequestView: React.FC = () => {
    const req = useParams();
    const requestId = req.id;
    const { data: request, isLoading } = useGetRequestById(requestId ? requestId : '');
    const { refetch } = useGetAllRequest();
    const { mutateAsync: validateRequest, isPending: validateLoading } = useValidateRequest({action() {
        refetch();
    },});
    const { mutateAsync: denyRequest, isPending: denyLoading } = useDenyRequest({action() {
        refetch();
    },})
    const [isDenyModalVisible, setIsDenyModalVisible] = useState(false);
    const [isValidateModalVisible, setIsValidateModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleDenyConfirm = async () => {
        const response = await denyRequest(request._id);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
            setIsDenyModalVisible(false);
        }
    }

    const handleDenyCancel = async () => {
        setIsDenyModalVisible(false)
    }

    const showDenyConfirmation = async () => {
        setIsDenyModalVisible(true);
    }   
    
    const handleValidateConfirm = async () => {
        const response = await validateRequest(request._id);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
            setIsValidateModalVisible(false);
            navigate(`/admin/organize/audience/${requestId}`)    
        }
    }

    const handleValidateCancel = async () => {
        setIsValidateModalVisible(false)
    }

    const showValidateConfirmation = async () => {
        setIsValidateModalVisible(true);
    }    

    return(
        <>
            <div className="w-full flex bg-four min-h-screen">
                <div className="md:w-52 sm:block hidden">
                    <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                        <AdminNavigation />
                    </Suspense>
                </div>
                <div className="w-full">
                    <div className="z-40 fixed top-0 right-0 w-full">
                        <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                            <Header />
                        </Suspense>
                    </div>
                    <div className="pl-10 px-5 pt-16 pb-5 w-full">
                        <div className="font-latobold text-lg mb-6">Demande d'audience</div>
                        {
                            isLoading && <div className="flex justify-center text-5xl">
                                <LoadingOutlined />
                            </div>
                        }
                        {
                            request && 
                                <div>
                                <div className="gap-2 flex justify-between">
                                    <div className="w-1/4">
                                        <div className=" border pt-6 rounded text-center bg-white shadow-md">
                                            <img src={`data:image/png;base64,${request.profile_photo}`} alt="" className="w-3/4 h-48 object-cover mx-auto border" />
                                            <div className="font-latobold text-lg">{ request.user_nom } { request.user_prenom }</div>
                                            <div className="flex justify-end px-8 py-2">
                                            </div>
                                            <div className="mx-auto w-full bg-gray-200 px-8 py-1">
                                                <div className="flex gap-4 my-2">
                                                    <EnvironmentOutlined />
                                                    <div>{request.user_cni} </div>
                                                </div>
                                                <div className="flex gap-4 my-2">
                                                    <EnvironmentOutlined />
                                                    <div>{request.user_adresse} </div>
                                                </div>
                                                <div className="flex gap-4 my-2">
                                                    <MailOutlined />
                                                    <div> {request.user_email} </div>
                                                </div>
                                                <div className="flex gap-4 my-2">
                                                    <PhoneOutlined />
                                                    <div>+261 {request.user_telephone} </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-2/4" >
                                        <div className="border rounded p-4 bg-white shadow-md">
                                            <div className="mb-3 flex items-center gap-2">
                                                <div className="text-md font-latobold">
                                                    { request.type_request }
                                                </div>
                                                <div >
                                                    <RequestStatus value={request.status_request[0]} />
                                                </div>
                                            </div>
                                                <div className="text-sm text-gray-500">Motif: </div>
                                                <div className=""> { request.object } </div>
                                        </div>
                                        
                                    </div>
                                    <div className="w-1/4">
                                        <div className="border rounded p-5 bg-white shadow-md">
                                            <div className="font-latobold text-md mb-3">Soumission</div>
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm text-gray-500">Date de soumission</div>
                                                    <div className="font-latobold"> { request.request_creation } </div>
                                                </div>
                                        </div>
                                        <div className="border rounded my-2 p-5 bg-white shadow-md">
                                            <div className="font-latobold text-md mb-3">Préférence</div>
                                            <div className="text-sm text-gray-500">Une audience demandé pour la semaine de :</div>
                                            <div className="flex justify-between items-center">
                                                <div className="font-latobold"> { request.date_wanted_debut } </div>
                                                <div className="text-sm text-gray-500">à</div>
                                                <div className="font-latobold"> { request.date_wanted_end } </div>
                                            </div>
                                        </div>
                                        {
                                            request.status_request[0] === "En attente" && <div className="border rounded p-5 bg-white shadow-md">
                                            <div className="font-bold text-md mb-3">Actions</div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Approbation</div>
                                                <Button  onClick={showValidateConfirmation} variant={'success'}>
                                                    Valider
                                                </Button>                                            
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <div className="text-sm text-gray-500">Refus</div>
                                                <Button  onClick={showDenyConfirmation} variant={'destructive'}>
                                                    Refuser
                                                </Button>                                            
                                            </div>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <Modal title="Refus d'une demande" 
                    open={isDenyModalVisible}
                    onOk={handleDenyConfirm}
                    onCancel={handleDenyCancel}
                    onClose={handleDenyCancel}
                    footer={null}
                >
                    <div>
                        <WarningFilled className='mr-2 text-red-500 text-xl' />  
                        Êtes-vous sûr de vouloir refuser ce demande d'audience ?
                        <div className='flex justify-end gap-2 mt-2'>
                            <Button
                                variant={'secondary'} 
                                onClick={handleDenyCancel}
                            >   
                                Annuler
                            </Button>
                            <Button
                                variant={'destructive'} 
                                onClick={handleDenyConfirm}
                                disabled={ denyLoading ? true : false }
                                className={`${denyLoading ? 'cursor-not-allowed' : ''}`}
                            >   
                                { denyLoading && <LoadingOutlined className="text-xs" /> }
                                <div>Refuser</div>
                            </Button>
                        </div>
                    </div>
                </Modal>
                <Modal title="Approbation d'une demande" 
                    open={isValidateModalVisible}
                    onOk={handleValidateConfirm}
                    onClose={handleValidateCancel}
                    onCancel={handleValidateCancel}
                    footer={null}
                >
                    <div>
                        <WarningFilled className='mr-2 text-green-500 text-xl' />  
                        Êtes-vous sûr de vouloir approuver ce demande d'audience ?
                        <div className='flex justify-end gap-2 mt-2'>
                            <Button
                                variant={'secondary'} 
                                onClick={handleValidateCancel}
                            >   
                                Annuler
                            </Button>
                            <Button
                                variant={'success'}
                                onClick={handleValidateConfirm}
                                disabled={ validateLoading ? true : false }
                                className={`${validateLoading ? 'cursor-not-allowed' : ''}`}
                            >   
                                { validateLoading && <LoadingOutlined className="text-xs" /> }
                                <div>Approuver</div>
                            </Button>
                        </div> 
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminRequestView;