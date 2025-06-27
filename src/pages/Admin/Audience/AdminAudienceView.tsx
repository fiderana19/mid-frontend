import React, { useState, lazy, Suspense } from "react";
import { EnvironmentOutlined, LoadingOutlined, MailOutlined, PhoneOutlined, WarningFilled } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
const AdminNavigation = lazy(() => import("../../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../../components/Header"));
import { Modal } from "antd";
import { HttpStatus } from "../../../constants/Http_status";
import { useGetAudienceById } from "@/hooks/useGetAudienceById";
import { Button } from "@/components/ui/button";
import { useCancelAudience } from "@/hooks/useCancelAudience";
import { useGetAllAudience } from "@/hooks/useGetAllAudience";
import AudienceStatus from "@/components/status/AudienceStatus";

const AdminAudienceView: React.FC = () => {
    const req = useParams();
    const audienceId = req.id;
    const { data: audience, isLoading, refetch } = useGetAudienceById(audienceId ? audienceId : '');
    const { refetch: refetchAll } = useGetAllAudience();
    const { mutateAsync: cancelAudience, isPending: cancelLoading } = useCancelAudience({action() {
        refetch();
        refetchAll();
    },});
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const navigate = useNavigate();
   
    const handleCancelAudienceConfirm = async () => {
        const response = await cancelAudience(audience?._id);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
            setIsCancelModalVisible(false);    
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
                                   <div className="font-latobold text-lg my-4">Audience du { audience.availability_date } </div>
                                    <div className="gap-2 flex justify-between">
                                        <div className="w-2/4" >
                                            <div className="border rounded p-4 bg-white shadow-md">
                                                <div className="flex justify-end">
                                                    <AudienceStatus value={audience.status_audience[0]} />
                                                </div>
                                                <div className="mb-3 flex items-center gap-2">
                                                    <div className="text-md font-latobold">
                                                        { audience.request_type }
                                                    </div>
                                                    <div>soumise le <span className="font-latobold"> {audience.request_creation}</span></div>
                                                </div>
                                                    <div className="text-sm text-gray-500">Motif: </div>
                                                    <div className=""> { audience.request_object } </div>
                                            </div>
                                        </div>
                                        <div className="w-1/4">
                                            <div className="border rounded p-5 bg-white shadow-md">
                                                <div className="font-latobold text-md mb-3">Organisation</div>
                                                <div className="text-sm text-gray-500">Cette audience est organisée pour :</div>
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm text-gray-500">Date</div>
                                                    <div className="font-latobold"> { audience.availability_date } </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm text-gray-500">De</div>
                                                    <div className="font-latobold"> { audience.availability_hour_debut } </div>
                                                    <div className="text-sm text-gray-500">à</div>
                                                    <div className="font-latobold"> { audience.availability_hour_end } </div>
                                                </div>
                                            </div>
                                            {
                                                (audience?.status_audience[0] !== "Absent" && audience?.status_audience[0] !== "Classé" && audience?.status_audience[0] !== "Annulé") &&
                                                <div className="border rounded p-5 bg-white shadow-md my-2">
                                                    <div className="font-latobold text-md mb-3">Actions</div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-sm text-gray-500">Reporter</div>
                                                        <Button 
                                                            variant={'secondary'}
                                                            onClick={() => {navigate(`/admin/audience/report/${audience._id}`)}}
                                                        >Reporter</Button>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <div className="text-sm text-gray-500">Annuler</div>
                                                        <Button
                                                            variant={'destructive'}
                                                            onClick={() => setIsCancelModalVisible(true)}
                                                        >
                                                            Annuler
                                                        </Button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="w-1/4">
                                            <div className=" border pt-6 rounded text-center bg-white shadow-md">
                                                <img src={`data:image/png;base64,${audience.user_profile_photo}`} alt="" className="w-3/4 h-48 object-cover mx-auto border" />
                                                <div className="font-latobold text-lg">{ audience.user_nom } { audience.user_prenom }</div>
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
                </div>
                <Modal title="Annulation de l'audience" 
                    open={isCancelModalVisible}
                    onOk={handleCancelAudienceConfirm}
                    onCancel={() => {setIsCancelModalVisible(false)}}
                    onClose={() => {setIsCancelModalVisible(false)}}
                    footer={null}
                >
                    <div>
                        <WarningFilled className='mr-2 text-red-500 text-xl' />  
                        Êtes-vous sûr de vouloir annuler cette audience ?
                        <div className='flex justify-end gap-2 mt-2'>
                            <Button 
                                variant={'secondary'}
                                onClick={() => {setIsCancelModalVisible(false)}}
                            >   
                                Annuler
                            </Button>
                            <Button 
                                variant={'destructive'}
                                onClick={handleCancelAudienceConfirm}
                                disabled={ cancelLoading ? true : false }
                            >   
                                { cancelLoading && <LoadingOutlined className="text-xs" /> }
                                <div>Confirmer</div>
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminAudienceView;