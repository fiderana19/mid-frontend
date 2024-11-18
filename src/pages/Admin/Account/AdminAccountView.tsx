import Header from "../../../components/Header";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUserById, validateUser } from "../../../api/users";
import { message, Modal } from "antd";
import { CheckCircleFilled, CloseCircleFilled, DeleteFilled, EnvironmentOutlined, LoadingOutlined, MailOutlined, PhoneOutlined, WarningFilled } from "@ant-design/icons";

const AdminAccountView: React.FC = () => {
    const [user, setUser] = useState<any>();
    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
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
        fetchUser()
    }, [])
    async function fetchUser() {
        const token = localStorage.getItem('token');

        if(userId && token) {
            const response = await getUserById(token,userId);

            console.log(response)
            setUser(response)    
        }
    }

    const handleDeleteConfirm = async () => {
        setApiLoading(true);
        const response = await deleteUser(access_token,user._id);
        if(response?.status === 200 || response?.status === 201) {
            setApiLoading(false);
            message.success("Compte supprimé !");
            navigate("/admin/account");
        }
    }
    //handling delete cancel
    const handleDeleteCancel = async () => {
        setIsDeleteModalVisible(false)
    }
    const showDeleteConfirmation = async () => {
        setIsDeleteModalVisible(true);
    }   
    
    const handleValidateConfirm = async () => {
        setApiLoading(true);
        const response = await validateUser(access_token,user._id);
        if(response?.status === 200 || response?.status === 201) {
            fetchUser();
            setApiLoading(false);
            message.success("Compte validé !");
            setIsValidateModalVisible(false)
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
            <div className="w-full flex min-h-screen bg-four">
                <div className="md:w-52 sm:block hidden">
                    <AdminNavigation />
                </div>
                <div className="w-full">
                    <div className="z-40 fixed top-0 right-0 w-full">
                        <Header />
                    </div>
                    <div className="pl-10 pr-5 pt-16 pb-5 w-full">
                        {
                            user && 
                            <div>
                                <div className="flex justify-between items-center">
                                    <div className="font-bold text-lg mb-6">Compte citoyen</div>
                                    <div className="">
                                            <div className="flex justify-end gap-2">
                                            {
                                                !user.validation && 
                                                <div className='bg-green-500 border border-green-600 hover:bg-green-600 text-white py-1 px-2 text-sm  rounded-full focus:outline-none focus:ring-2 focus:ring-green-500' onClick={showValidateConfirmation}>
                                                    <CheckCircleFilled />
                                                </div> 
                                            }
                                                <div className='bg-red-500 border border-red-600 rounded-full hover:bg-red-600 text-white py-1 px-2 text-sm  focus:outline-none focus:ring-2 focus:ring-green-500' onClick={showDeleteConfirmation}>
                                                    <DeleteFilled />
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="gap-2 flex justify-between">
                                    <div className="w-1/4">
                                        <div className=" border pt-6 rounded text-center bg-white shadow-md">
                                            <img src={`data:image/png;base64,${user.profile_photo}`} alt="" className="w-3/4 h-48 object-cover mx-auto border" />
                                            <div className="font-bold text-lg">{ user.nom } { user.prenom }</div>
                                            <div className="flex justify-end px-8 py-2">
                                                { user.validation ? 
                                                    <div className="flex gap-2 text-green-500 border px-2 rounded border-green-500">
                                                        <CheckCircleFilled /><div>Validé</div>
                                                    </div> 
                                                    : 
                                                    <div className="flex gap-2 text-red-500">
                                                        <CloseCircleFilled /><div>Non Validé</div>
                                                    </div>
                                                } 
                                            </div>
                                            <div className="mx-auto w-full bg-gray-200 px-8 py-1">
                                                <div className="flex gap-4 my-2">
                                                    <EnvironmentOutlined />
                                                    <div>{ user.adresse }</div>
                                                </div>
                                                <div className="flex gap-4 my-2">
                                                    <MailOutlined />
                                                    <div>{ user.email }</div>
                                                </div>
                                                <div className="flex gap-4 my-2">
                                                    <PhoneOutlined />
                                                    <div>+261{ user.telephone }</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-1/4" >
                                        <div className="border rounded p-4 bg-white shadow-md">
                                            <div className="font-bold text-md mb-3">Naissance</div>
                                            <div className="flex justify-between">
                                                <div className="text-sm text-gray-500">Date de naissance</div>
                                                <div className="font-semibold">{ user.date_naissance }</div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="text-sm text-gray-500">Lieu de naissance</div>
                                                <div className="font-semibold">{ user.lieu_naissance }</div>
                                            </div>
                                        </div>
                                        <div className="border rounded p-4 my-5 bg-white shadow-md">
                                            <div className="font-bold text-md mb-3">Identité Nationale</div>
                                            <div className="flex justify-between">
                                                <div className="text-sm text-gray-500">CIN</div>
                                                <div className="font-semibold">{ user.cni }</div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="text-sm text-gray-500">Date de délivrance</div>
                                                <div className="font-semibold">{ user.date_cni }</div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="text-sm text-gray-500">Lieu</div>
                                                <div className="font-semibold">{ user.lieu_cni }</div>
                                            </div>
                                        </div>
                                        <div className="border rounded p-4 bg-white shadow-md">
                                            <div className="font-bold text-md mb-3">Info</div>
                                            <div className="flex justify-between">
                                                <div className="text-sm text-gray-500">Date de création</div>
                                                <div className="font-semibold">{ user.user_creation }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4">
                                        <div className="border rounded p-5 bg-white shadow-md">
                                            <div className="font-bold text-md mb-3">Carte d'identité nationale</div>
                                            <img src={`data:image/png;base64,${user.cni_photo}`} alt="Scan CIN" className="w-full h-80 object-cover" />
                                        </div>                                        
                                    </div>
                                </div>
                        </div>
                        }
                    </div>
                </div>
                <Modal title="Validation du compte" 
                    open={isValidateModalVisible}
                    onOk={handleValidateConfirm}
                    onClose={handleValidateCancel}
                    footer={null}
                >
                    <div>
                        <WarningFilled className='mr-2 text-green-500 text-xl' />  
                        Êtes-vous sûr de vouloir valider ce demande d'audience ?
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
                                <div>Valider</div>
                            </button>
                        </div>
                    </div>
                </Modal>
                <Modal title="Suppression du compte" 
                    open={isDeleteModalVisible}
                    onOk={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                    footer={null}
                >
                    <div>
                        <WarningFilled className='mr-2 text-red-500 text-xl' />  
                        Êtes-vous sûr de vouloir supprimer ce compte de citoyen ?
                        <div className='flex justify-end gap-2'>
                            <button 
                                onClick={handleDeleteCancel}
                                className="border mt-2 hover:bg-gray-100 py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >   
                                Annuler
                            </button>
                            <button 
                                onClick={handleDeleteConfirm}
                                disabled={ apiLoading ? true : false }
                                className= { apiLoading ? "bg-red-400 cursor-not-allowed flex gap-2 items-center border mt-2 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-red-500" : "flex gap-2 items-center border mt-2 bg-red-500 hover:border-red-600 hover:bg-red-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-red-500" } 
                            >   
                                { apiLoading && <LoadingOutlined /> }
                                <div>Supprimer</div>
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminAccountView;