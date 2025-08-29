import React, { lazy, Suspense, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";
import { CheckCircleFilled, DeleteFilled, EnvironmentOutlined, LoadingOutlined, MailOutlined, PhoneOutlined, WarningFilled } from "@ant-design/icons";
import { HttpStatus } from "../../../constants/Http_status";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useValidateUser } from "@/hooks/useValidateUser";
import { useGetUserById } from "@/hooks/useGetUserById";
import { Button } from "@/components/ui/button";
import AccountStatus from "@/components/status/AccountStatus";
import { useGetAllUser } from "@/hooks/useGetAllUser";
const Header = lazy(() => import("../../../components/Header"));
const AdminNavigation = lazy(() => import("../../../components/Navigation/AdminNavigation"));

const AdminAccountView: React.FC = () => {
    let req = useParams();
    let userId = req.id;

    console.log(req)
    const { refetch: refetchAllUser } = useGetAllUser();
    const { data: user, isLoading: userLoading, refetch: refetchUser  } = useGetUserById(userId ? userId : '');
    const { mutateAsync: deleteUser, isPending: deleteLoading } = useDeleteUser({
        action() {
        },
    })
    const { mutateAsync: validateUser, isPending: validateLoading } = useValidateUser({
        action() {
            refetchUser();
            refetchAllUser();
        },
    })
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isValidateModalVisible, setIsValidateModalVisible] = useState(false);
    const [isCniVisible, setIsCniVisible] = useState(false);
    const navigate = useNavigate();

    const handleDeleteConfirm = async () => {
        const response = await deleteUser(user._id);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
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
        const response = await validateUser(user._id);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
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
                    <div className="pl-10 pr-5 pt-16 pb-5 w-full">
                        {
                            userLoading ?
                                <div className="text-3xl text-center">
                                    <LoadingOutlined />
                                </div>
                            :
                            user && 
                            <div>
                                <div className="flex justify-between items-center">
                                    <div className="font-latobold text-lg mb-6">Compte citoyen</div>
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
                                            <div className="font-latobold text-lg">{ user.nom } { user.prenom }</div>
                                            <div className="flex justify-end px-8 py-2">
                                                <AccountStatus value={user?.validation} />
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
                                            <div className="font-latobold text-md mb-3">Naissance</div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Date de naissance</div>
                                                <div className="font-latobold">{ user.date_naissance }</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Lieu de naissance</div>
                                                <div className="font-latobold">{ user.lieu_naissance }</div>
                                            </div>
                                        </div>
                                        <div className="border rounded p-4 my-5 bg-white shadow-md">
                                            <div className="font-latobold text-md mb-3">Identité Nationale</div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">CIN</div>
                                                <div className="font-latobold">{ user.cni }</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Date de délivrance</div>
                                                <div className="font-latobold">{ user.date_cni }</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Lieu</div>
                                                <div className="font-latobold">{ user.lieu_cni }</div>
                                            </div>
                                        </div>
                                        <div className="border rounded p-4 bg-white shadow-md">
                                            <div className="font-latobold text-md mb-3">Info</div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Date de création</div>
                                                <div className="font-latobold">{ user.user_creation }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/4">
                                        <div className="border rounded p-5 bg-white shadow-md">
                                            <div className="font-latobold text-md mb-3">Carte d'identité nationale</div>
                                            <img onClick={() => {setIsCniVisible(true)}} src={`data:image/png;base64,${user.cni_photo}`} alt="Scan CIN" className="w-full h-80 object-cover cursor-pointer" />
                                            <Modal title="CIN" 
                                                open={isCniVisible}
                                                onOk={() => {setIsCniVisible(false)}}
                                                onCancel={() => {setIsCniVisible(false)}}
                                                onClose={() => {setIsCniVisible(false)}}
                                                footer={null}
                                            >
                                                <img src={`data:image/png;base64,${user.cni_photo}`} alt="Scan CIN" className="w-full object-cover" />
                                            </Modal>
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
                    onCancel={handleValidateCancel}
                    onClose={handleValidateCancel}
                    footer={null}
                >
                    <div>
                        <WarningFilled className='mr-2 text-green-500 text-xl' />  
                        Êtes-vous sûr de vouloir valider ce demande d'audience ?
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
                                className={` ${validateLoading ? 'cursor-not-allowed' : ''}`}
                            >   
                                { validateLoading && <LoadingOutlined className="text-xs" /> }
                                <div>Valider</div>
                            </Button>
                        </div>
                    </div>
                </Modal>
                <Modal title="Suppression du compte" 
                    open={isDeleteModalVisible}
                    onOk={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                    onClose={handleDeleteCancel}
                    footer={null}
                >
                    <div>
                        <WarningFilled className='mr-2 text-red-500 text-xl' />  
                        Êtes-vous sûr de vouloir supprimer ce compte de citoyen ?
                        <div className='flex justify-end gap-2 mt-2'>
                            <Button 
                                variant={'secondary'}
                                onClick={handleDeleteCancel}
                            >   
                                Annuler
                            </Button>
                            <Button
                                variant={'destructive'}
                                onClick={handleDeleteConfirm}
                                disabled={ deleteLoading ? true : false }
                                className={`${ deleteLoading ? 'cursor-not-allowed' : '' }`}
                            >   
                                { deleteLoading && <LoadingOutlined className="text-xs" /> }
                                <div>Supprimer</div>
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminAccountView;