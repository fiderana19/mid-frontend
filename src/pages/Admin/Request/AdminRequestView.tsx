import Header from "../../../components/Header";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import MidLogo from '../../../assets/image/mid-logo.jpg';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";
import { CheckOutlined, CloseOutlined, WarningOutlined } from "@ant-design/icons";
import { denyRequest, getRequestById, validateRequest } from "../../../api/request";

const AdminRequestView: React.FC = () => {
    const [request, setRequest] = useState<any>();
    const [isDenyModalVisible, setIsDenyModalVisible] = useState(false);
    const [isValidateModalVisible, setIsValidateModalVisible] = useState(false);
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    );
    let req = useParams();
    const navigate = useNavigate();
    let userId = req.id;

    useEffect(() => { 
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token);
        }
        fetchRequest()
    }, [])
    async function fetchRequest() {
        const token = localStorage.getItem('token');

        if(userId && token) {
            console.log("ito le id", userId)

            const response = await getRequestById(token,userId);

            console.log(response)
            setRequest(response)    
        }
    }

    const handleDenyConfirm = async () => {
        const response = await denyRequest(access_token,request._id);
        console.log(response)
        setIsDenyModalVisible(false)
        fetchRequest()
    }
    //handling delete cancel
    const handleDenyCancel = async () => {
        setIsDenyModalVisible(false)
    }
    const showDenyConfirmation = async () => {
        setIsDenyModalVisible(true);
    }   
    
    const handleValidateConfirm = async () => {
        const response = await validateRequest(access_token,request._id);
        fetchRequest();
        setIsValidateModalVisible(false)
        console.log(response)
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
            <div className="w-full flex">
                <div className="w-1/6">
                    <AdminNavigation />
                </div>
                <div className="w-5/6">
                    <div className="z-50 fixed top-0 right-0 w-5/6">
                        <Header />
                    </div>
                    <div className="px-5 py-16">
                        {
                            request && 
                            <div className="text-center">
                            <img src={MidLogo}  className="mx-auto w-40 h-40 object-cover rounded-full border border-red-200"/>
                            <div className="font-bold">{ request.user_nom }</div>
                            <div className="font-bold">{ request.user_prenom }</div>
                            <div className="font-bold">{ request.user_cni }</div>
                            <div className="font-bold">{ request.type_request }</div>
                            <div className="font-bold">{ request.date_wanted_debut }</div>
                            <div className="font-bold">{ request.date_wanted_end }</div>
                            <div className="font-bold">{ request.object }</div>
                            {
                                                    request.status_request[0] === "En attente" ? 
                                                    <div className="rounded text-yellow-500 flex gap-2 text-xs">
                                                        <WarningOutlined />
                                                        <div>{ request.status_request }</div>  
                                                    </div>
                                                    : (
                                                        request.status_request[0] === "Accepté" ?
                                                    <div className="rounded text-green-500 flex gap-2 text-xs">
                                                        <CheckOutlined />
                                                        <div>{ request.status_request }</div>  
                                                    </div>                                                        :
                                                    <div className="rounded text-yellow-500 flex gap-2 text-xs">
                                                        <CloseOutlined />
                                                        <div>{ request.status_request }</div>  
                                                    </div>                                                    
                                                    )
                                                }  

                            <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500' onClick={showValidateConfirmation}>Valider</button>
                            <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500' onClick={showDenyConfirmation}>Refuser</button>
                        </div>
                        }
                    </div>
                </div>
                <Modal title="Refus" 
                    open={isDenyModalVisible}
                    onOk={handleDenyConfirm}
                    onCancel={handleDenyCancel}
                    okText="Refuser"
                    cancelText="Annuler"
                >
                    <div className='text-red-900'>
                    <WarningOutlined className='mr-2' />  
                    Êtes-vous sûr de vouloir refuser ce demande d'audience ?
                    </div>
                </Modal>
                <Modal title="Validation" 
                    open={isValidateModalVisible}
                    onOk={handleValidateConfirm}
                    onCancel={handleValidateCancel}
                    okText="Valider"
                    cancelText="Annuler"
                >
                    <div className=''>
                    <WarningOutlined className='mr-2' />  
                    Êtes-vous sûr de vouloir valider ce demande d'audience ?
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminRequestView;