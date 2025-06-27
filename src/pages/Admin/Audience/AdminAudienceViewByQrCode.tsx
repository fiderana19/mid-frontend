import { useState, Suspense, lazy } from "react";
import { EnvironmentOutlined, LoadingOutlined, MailOutlined, PhoneOutlined, WarningFilled } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
const AdminNavigation = lazy(() => import("../../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../../components/Header"));
import { Modal } from "antd";
import { HttpStatus } from "../../../constants/Http_status";
import { useGetAudienceByRef } from "@/hooks/useGetAudienceByRef";
import { useCloseAudience } from "@/hooks/useCloseAudience";
import { useGetAllAudience } from "@/hooks/useGetAllAudience";
import { Button } from "@/components/ui/button";
import AudienceStatus from "@/components/status/AudienceStatus";

const AdminAudienceViewByQrCode: React.FC = () => {
    const req = useParams();
    const audienceRef = req.id;
    const { data: audience, isLoading } = useGetAudienceByRef(audienceRef ? audienceRef : '');
    const { refetch } = useGetAllAudience();
    const { mutateAsync: closeAudience, isPending: closeLoading } = useCloseAudience({action() {
        refetch();
    },})
    const [isClosedModalVisible, setIsClosedModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleClosedAudienceConfirm = async () => {
        if(audience) {
            const response = await closeAudience(audience._id);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                setIsClosedModalVisible(false);  
                navigate('/admin/audience');  
            }
        }
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
                    <div className="">
                        <div className="pl-10 px-5 pt-16 pb-5 w-full">
                            {
                                isLoading && <div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>
                            }
                            {
                                audience && 
                                    <div>
                                   <div className="font-bold text-lg mb-6">Audience du { audience.availability_date } </div>
                                    <div className="gap-2 flex justify-between">
                                        <div className="w-2/4" >
                                            <div className="border rounded p-4 bg-white shadow-md">
                                                <div className="flex justify-end">
                                                    <AudienceStatus value={audience.status_audience[0]} /> 
                                                </div>
                                                <div className="mb-3 flex items-center gap-2">
                                                    <div className="text-md font-bold">
                                                        { audience.request_type }
                                                    </div>
                                                    <div>soumise le <span className="font-semibold"> {audience.request_creation}</span></div>
                                                </div>
                                                    <div className="text-sm text-gray-500">Motif: </div>
                                                    <div className=""> { audience.request_object } </div>
                                            </div>
                                        </div>
                                        <div className="w-1/4">
                                            <div className="border rounded p-5 bg-white shadow-md">
                                                <div className="font-bold text-md mb-3">Organisation</div>
                                                <div className="text-sm text-gray-500">Cette audience est organisée pour :</div>
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm text-gray-500">Date</div>
                                                    <div className="font-semibold"> { audience.availability_date } </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm text-gray-500">De</div>
                                                    <div className="font-semibold"> { audience.availability_hour_debut } </div>
                                                    <div className="text-sm text-gray-500">à</div>
                                                    <div className="font-semibold"> { audience.availability_hour_end } </div>
                                                </div>
                                            </div>
                                            {
                                                (audience?.status_audience[0] === "Fixé" || audience?.status_audience[0] === "Reporté") &&
                                                    <div className="border rounded p-5 bg-white shadow-md my-2">
                                                        <div className="font-latobold text-md mb-3">Actions</div>
                                                        <div className="flex justify-between items-center">
                                                            <div className="text-sm text-gray-500">Classer</div>
                                                            <Button
                                                                onClick={() => setIsClosedModalVisible(true)}
                                                            >
                                                                Classer
                                                            </Button>
                                                        </div>
                                                    </div>
                                                }
                                        </div>
                                        <div className="w-1/4">
                                            <div className=" border pt-6 rounded text-center bg-white shadow-md">
                                                <img src={`data:image/png;base64,${audience.user_profile_photo}`} alt="" className="w-3/4 h-48 object-cover mx-auto border" />
                                                <div className="font-bold text-lg">{ audience.user_nom } { audience.user_prenom }</div>
                                                <div className="flex justify-end px-8 py-2">
                                                </div>
                                                <div className="mx-auto w-full bg-gray-200 px-8 py-1">
                                                    <div className="flex gap-4 my-2">
                                                        <PhoneOutlined />
                                                        <div> { audience.user_cni } </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <EnvironmentOutlined />
                                                        <div> { audience.user_adresse } </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <MailOutlined />
                                                        <div> { audience.user_email } </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <PhoneOutlined />
                                                        <div>+261 { audience.user_telephone } </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <Modal title="Classer une audience" 
                            open={isClosedModalVisible}
                            onOk={handleClosedAudienceConfirm}
                            onCancel={() => {setIsClosedModalVisible(false)}}
                            onClose={() => {setIsClosedModalVisible(false)}}
                            footer={null}
                        >
                            <div>
                                <WarningFilled className='mr-2 text-green-500 text-xl' />  
                                Êtes-vous sûr de classer cette audience ?
                                <div className='flex justify-end gap-2 mt-2'>
                                    <Button
                                        variant={'secondary'} 
                                        onClick={() => {setIsClosedModalVisible(false)}}
                                    >   
                                        Annuler
                                    </Button>
                                    <Button
                                        variant={'success'}
                                        onClick={handleClosedAudienceConfirm}
                                        disabled={ closeLoading }
                                        className={`${ closeLoading && 'cursor-not-allowed' }`}
                                    >   
                                        { closeLoading && <LoadingOutlined className="text-xs" /> }
                                        <div>Confirmer</div>
                                    </Button>
                                </div>
                            </div>
                        </Modal>
                </div>
            </div>
        </>
    )
}

export default AdminAudienceViewByQrCode;