const AdminNavigation = lazy(() => import("../../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../../components/Header"));
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message, Modal } from "antd";
import { EnvironmentOutlined, LoadingOutlined, MailOutlined, PhoneOutlined, WarningFilled } from "@ant-design/icons";
import { denyRequest, getRequestById, validateRequest } from "../../../api/request";
import { HttpStatus } from "../../../constants/Http_status";

const AdminRequestView: React.FC = () => {
    const [request, setRequest] = useState<any>();
    const [isDenyModalVisible, setIsDenyModalVisible] = useState(false);
    const [isValidateModalVisible, setIsValidateModalVisible] = useState(false);
    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    );
    let req = useParams();
    const navigate = useNavigate();
    let reqestId = req.id;

    useEffect(() => { 
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token);
        }
        fetchRequest()
    }, [])
    async function fetchRequest() {
        const token = localStorage.getItem('token');

        if(reqestId && token) {
            const response = await getRequestById(token,reqestId);
            setRequest(response);
        }
    }

    const handleDenyConfirm = async () => {
        setApiLoading(true);
        const response = await denyRequest(access_token,request._id);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
            fetchRequest();
            setApiLoading(false);
            message.success("Demande refusée !");
            setIsDenyModalVisible(false);
        }
    }
    //handling delete cancel
    const handleDenyCancel = async () => {
        setIsDenyModalVisible(false)
    }
    const showDenyConfirmation = async () => {
        setIsDenyModalVisible(true);
    }   
    
    const handleValidateConfirm = async () => {
        setApiLoading(true);
        const response = await validateRequest(access_token,request._id);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
            fetchRequest();
            setApiLoading(false);
            message.success("Demande approuvée !");
            setIsValidateModalVisible(false);
            navigate(`/admin/organize/audience/${reqestId}`)    
        }
    }
    //handling delete cancel
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
                                                <button className='bg-green-500 hover:bg-green-600 text-white py-1 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500' onClick={showValidateConfirmation}>Valider</button>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <div className="text-sm text-gray-500">Refus</div>
                                                <button className='bg-red-500 hover:bg-red-600 text-white py-1 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500' onClick={showDenyConfirmation}>Refuser</button>
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
                        <div className='flex justify-end gap-2'>
                            <button 
                                onClick={handleDenyCancel}
                                className="border mt-2 hover:bg-gray-100 py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >   
                                Annuler
                            </button>
                            <button 
                                onClick={handleDenyConfirm}
                                disabled={ apiLoading ? true : false }
                                className= { apiLoading ? "bg-red-400 cursor-not-allowed flex gap-2 items-center border mt-2 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-red-500" : "flex gap-2 items-center border mt-2 bg-red-500 hover:border-red-600 hover:bg-red-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-red-500" } 
                            >   
                                { apiLoading && <LoadingOutlined /> }
                                <div>Refuser</div>
                            </button>
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
                        <div className='flex justify-end gap-2'>
                            <button 
                                onClick={handleValidateCancel}
                                className="border mt-2 hover:bg-gray-100 py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >   
                                Annuler
                            </button>
                            <button 
                                onClick={handleValidateConfirm}
                                disabled={ apiLoading ? true : false }
                                className= { apiLoading ? "bg-green-400 cursor-not-allowed flex gap-2 items-center border mt-2 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500" : "flex gap-2 items-center border mt-2 bg-green-500 hover:border-green-600 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500" } 
                            >   
                                { apiLoading && <LoadingOutlined /> }
                                <div>Approuver</div>
                            </button>
                        </div> 
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminRequestView;