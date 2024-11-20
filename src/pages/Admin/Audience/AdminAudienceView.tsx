import { useState, useEffect } from "react";
import { CheckCircleFilled, CheckCircleOutlined, CheckOutlined, CloseCircleFilled, CloseOutlined, DownOutlined, EnvironmentOutlined, LoadingOutlined, MailOutlined, MenuOutlined, PhoneOutlined, WarningFilled, WarningOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import Header from "../../../components/Header";
import { audienceCancel, getAudienceById } from "../../../api/audience";
import { message, Modal } from "antd";

function AdminAudienceView() {
    const [audience, setAudience] = useState<any>();
    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    );
    let req = useParams();
    const navigate = useNavigate();
    let audienceId = req.id;

    useEffect(() => { 
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token);
        }
        fetchAudience()
    }, [])

    const fetchAudience = async () => {
        const token = localStorage.getItem('token');
        if(audienceId && token) {
            const response = await getAudienceById(access_token,audienceId);
            if(response) {
                setAudience(response.data);
            }
        }
    }
    
    const handleCancelAudienceConfirm = async () => {
        setApiLoading(true);
        if(audience) {
            const response = await audienceCancel(access_token,audience);
            if(response?.status === 200 || response?.status === 201) {
                fetchAudience();
                setApiLoading(false);
                message.success("Audience annulée !");
                setIsCancelModalVisible(false);    
            } 
        }
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
                    <div className="">
                        <div className="pl-10 px-5 pt-16 pb-5 w-full">
                            {
                                audience && 
                                    <div>
                                   <div className="font-latobold text-lg my-4">Audience du { audience.availability_date } </div>
                                    <div className="gap-2 flex justify-between">
                                        
                                        <div className="w-2/4" >
                                            <div className="border rounded p-4 bg-white shadow-md">
                                                <div className="flex justify-end">
                                                { audience.status_audience[0] === "Fixé" ? 
                                                    <div className="flex gap-2 text-blue-500">
                                                        <CheckCircleFilled /><div>{ audience.status_audience }</div>
                                                    </div> 
                                                    : (
                                                        audience.status_audience[0] === "Reporté" ?
                                                        <div className="flex gap-2 text-yellow-500">
                                                            <CheckCircleFilled /><div>{ audience.status_audience }</div>
                                                        </div>
                                                        : (
                                                                audience.status_audience[0] === "Classé" ?
                                                                <div className="flex gap-2 text-green-500">
                                                                    <CheckCircleFilled /><div>{ audience.status_audience }</div>
                                                                </div>
                                                                :
                                                                (
                                                                    audience.status_audience[0] === "Absent" ?
                                                                    <div className="flex gap-2 text-gray-500">
                                                                        <CheckCircleFilled /><div>{ audience.status_audience }</div>
                                                                    </div>
                                                                    :
                                                                    <div className="flex gap-2 text-red-500">
                                                                        <CloseCircleFilled /><div>{ audience.status_audience }</div>
                                                                    </div>
                                                            )
                                                        )
                                                    )
                                                }     
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
                                                (audience?.status_audience[0] !== "Absent" && audience?.status_audience[0] !== "Classé") &&
                                                <div className="border rounded p-5 bg-white shadow-md my-2">
                                                    <div className="font-latobold text-md mb-3">Actions</div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-sm text-gray-500">Reporter</div>
                                                        <button 
                                                            onClick={() => {navigate(`/admin/audience/report/${audience._id}`)}}
                                                            className='bg-yellow-500 hover:bg-yellow-600 text-white py-1 my-1 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                                        >Reporter</button>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-sm text-gray-500">Annuler</div>
                                                        <button className='bg-red-500 hover:bg-red-600 text-white py-1 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-red-500' onClick={() => setIsCancelModalVisible(true)}>Annuler</button>
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
                    footer={null}
                >
                    <div>
                        <WarningFilled className='mr-2 text-red-500 text-xl' />  
                        Êtes-vous sûr de vouloir annuler cette audience ?
                        <div className='flex justify-end gap-2'>
                            <button 
                                onClick={() => {setIsCancelModalVisible(false)}}
                                className="border mt-2 hover:bg-gray-100 py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >   
                                Annuler
                            </button>
                            <button 
                                onClick={handleCancelAudienceConfirm}
                                disabled={ apiLoading ? true : false }
                                className= { apiLoading ? "bg-red-400 cursor-not-allowed flex gap-2 items-center border mt-2 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-red-500" : "flex gap-2 items-center border mt-2 bg-red-500 hover:border-red-600 hover:bg-red-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-red-500" } 
                            >   
                                { apiLoading && <LoadingOutlined /> }
                                <div>Confirmer</div>
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminAudienceView;