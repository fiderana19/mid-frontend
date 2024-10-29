import Header from "../../../components/Header";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import MidLogo from '../../../assets/image/mid-logo.jpg';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { deleteUser, getUserById, validateUser } from "../../../api/users";
import { Modal } from "antd";
import { CheckCircleFilled, CloseCircleFilled, WarningOutlined } from "@ant-design/icons";

const AdminAccountView: React.FC = () => {
    const [user, setUser] = useState<any>();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isValidateModalVisible, setIsValidateModalVisible] = useState(false);
    let req = useParams();
    const navigate = useNavigate();
    let userId = req.id;

    useEffect(() => { 
        fetchUser()
    }, [])
    async function fetchUser() {
        if(userId) {
            console.log("ito le id", userId)

            const response = await getUserById(userId);

            console.log(response)
            setUser(response)    
        }
    }

    const handleDeleteConfirm = async () => {
        const response = await deleteUser(user._id);
        console.log(response)
        navigate("/admin/account");
    }
    //handling delete cancel
    const handleDeleteCancel = async () => {
        setIsDeleteModalVisible(false)
    }
    const showDeleteConfirmation = async () => {
        setIsDeleteModalVisible(true);
    }   
    
    const handleValidateConfirm = async () => {
        const response = await validateUser(user._id);
        fetchUser();
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
                            user && 
                            <div className="text-center">
                            <img src={MidLogo}  className="mx-auto w-40 h-40 object-cover rounded-full border border-red-200"/>
                            <div className="font-bold">{ user.nom }</div>
                            <div className="font-bold">{ user.prenom }</div>
                            <div className="font-bold">{ user.telephone }</div>
                            <div className="font-bold">{ user.email }</div>
                            <div className="font-bold">{ user.date_naissance }</div>
                            <div className="font-bold">{ user.lieu_naissance }</div>
                            <div className="font-bold">{ user.cni }</div>
                            <div className="font-bold">{ user.date_cni }</div>
                            <div className="font-bold">{ user.lieu_cni }</div>
                            { user.validation ? 
                                                <div className="flex gap-2 text-green-500">
                                                    <CheckCircleFilled /><div>Validé</div>
                                                </div> 
                                                : 
                                                <div className="flex gap-2 text-red-500">
                                                    <CloseCircleFilled /><div>Non Validé</div>
                                                </div>
                                            }  

                            <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500' onClick={showValidateConfirmation}>Valider</button>
                            <Link to={`/admin/account/edit/${user._id}`} >
                                <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'>Modifier</button>
                            </Link>                            
                            <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500' onClick={showDeleteConfirmation}>Supprimer</button>
                        </div>
                        }
                    </div>
                </div>
                <Modal title="Suppression" 
                    open={isDeleteModalVisible}
                    onOk={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                    okText="Supprimer"
                    cancelText="Annuler"
                >
                    <div className='text-red-900'>
                    <WarningOutlined className='mr-2' />  
                    Êtes-vous sûr de vouloir supprimer ce compte de citoyen ?
                    </div>
                </Modal>
                <Modal title="Validation" 
                    open={isValidateModalVisible}
                    onOk={handleValidateConfirm}
                    onCancel={handleValidateCancel}
                    okText="Supprimer"
                    cancelText="Annuler"
                >
                    <div className='text-red-900'>
                    <WarningOutlined className='mr-2' />  
                    Êtes-vous sûr de vouloir valider ce compte de citoyen ?
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminAccountView;