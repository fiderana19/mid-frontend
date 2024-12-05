import { useState, useEffect } from "react";
import { EnvironmentOutlined, LoadingOutlined, MailOutlined, PhoneOutlined, WarningFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import Header from "../../../components/Header";
import { audienceClose, getAudienceByRef } from "../../../api/audience";
import { message, Modal } from "antd";
import { HttpStatus } from "../../../constants/Http_status";

function AdminAudienceViewByQrCode() {
    const [audience, setAudience] = useState<any>();
    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [isClosedModalVisible, setIsClosedModalVisible] = useState(false);
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    );
    let req = useParams();
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
            const response = await getAudienceByRef(token,audienceId);
            if(response) {
                console.log(response)
                setAudience(response.data);
            }
        }
    }

    const handleClosedAudienceConfirm = async () => {
        setApiLoading(true);
        if(audience) {
            const response = await audienceClose(access_token,audience._id);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                fetchAudience();
                setApiLoading(false);
                message.success("Audience classée !")
                setIsClosedModalVisible(false);    
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
                                   <div className="font-bold text-lg mb-6">Audience du { audience.availability_date } </div>
                                    <div className="gap-2 flex justify-between">
                                        
                                        <div className="w-2/4" >
                                            <div className="border rounded p-4 bg-white shadow-md">
                                                <div className="flex justify-end">
                                                    { audience.status_audience[0] === "Fixé" ? 
                                                        <div className="max-w-max">
                                                            <div className="flex items-center bg-blue-200 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                <span className="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                                                                { audience.status_audience }
                                                            </div>       
                                                        </div>                                 
                                                        : (
                                                            audience.status_audience[0] === "Reporté" ?
                                                            <div className="max-w-max">
                                                                <div className="flex items-center bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                    <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                                                                    { audience.status_audience }
                                                                </div>       
                                                            </div>                                 
                                                            : (
                                                                audience.status_audience[0] === "Classé" ?
                                                                <div className="max-w-max">
                                                                    <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                        <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                                        { audience.status_audience }
                                                                    </div>       
                                                                </div>                                 
                                                                :
                                                                (
                                                                    audience.status_audience[0] === "Absent" ?
                                                                    <div className="max-w-max">
                                                                        <div className="flex items-center bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                            <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                                                                            { audience.status_audience }
                                                                        </div>       
                                                                    </div>                                 
                                                                    :
                                                                    <div className="max-w-max">
                                                                        <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                                                            { audience.status_audience }
                                                                        </div>       
                                                                    </div>                                 
                                                                )
                                                            )
                                                        )
                                                    }     
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
                                                            <button 
                                                                className='bg-green-500 hover:bg-green-600 text-white py-1 my-1 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'
                                                                onClick={() => setIsClosedModalVisible(true)}
                                                            >Classer</button>
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
                                <div className='flex justify-end gap-2'>
                                    <button 
                                        onClick={() => {setIsClosedModalVisible(false)}}
                                        className="border mt-2 hover:bg-gray-100 py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    >   
                                        Annuler
                                    </button>
                                    <button 
                                        onClick={handleClosedAudienceConfirm}
                                        disabled={ apiLoading ? true : false }
                                        className= { apiLoading ? "bg-green-400 cursor-not-allowed flex gap-2 items-center border mt-2 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500" : "flex gap-2 items-center border mt-2 bg-green-500 hover:border-green-600 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500" } 
                                    >   
                                        { apiLoading && <LoadingOutlined /> }
                                        <div>Confirmer</div>
                                    </button>
                                </div>
                            </div>
                        </Modal>
                </div>
            </div>
        </>
    )
}

export default AdminAudienceViewByQrCode;