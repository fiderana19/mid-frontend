import { useState, useEffect } from "react";
import { CheckCircleFilled, CheckCircleOutlined, CheckOutlined, CloseOutlined, DownOutlined, EnvironmentOutlined, MailOutlined, MenuOutlined, PhoneOutlined, WarningOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import Header from "../../../components/Header";
import { getAudienceById } from "../../../api/audience";

function AdminAudienceView() {
    const [audience, setAudience] = useState<any>();
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
                                                    {
                                                        audience.status_audience[0] === "En attente" ? 
                                                            <div className="rounded bg-yellow-200 px-2 border border-yellow-500 flex gap-2 text-xs">
                                                                <WarningOutlined />
                                                                <div>{ audience.status_audience }</div>  
                                                            </div>
                                                        : (
                                                                audience.status_audience[0] === "Accepté" ?
                                                            <div className="rounded bg-green-200 px-2 border border-green-500 flex gap-2 text-xs">
                                                                <CheckOutlined />
                                                                <div>{ audience.status_audience }</div>  
                                                            </div>
                                                        :
                                                            <div className="rounded bg-red-200 px-2 border border-red-500 flex gap-2 text-xs">
                                                                <CloseOutlined />
                                                                <div>{ audience.status_audience }</div>  
                                                            </div>                                                    
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
                                                <div className="flex justify-between">
                                                    <div className="text-sm text-gray-500">Date</div>
                                                    <div className="font-semibold"> { audience.availability_date } </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="text-sm text-gray-500">De</div>
                                                    <div className="font-semibold"> { audience.availability_hour_debut } </div>
                                                    <div className="text-sm text-gray-500">à</div>
                                                    <div className="font-semibold"> { audience.availability_hour_end } </div>
                                                </div>
                                            </div>
                                            <div className="border rounded p-5 bg-white shadow-md">
                                                <div className="font-bold text-md mb-3">Actions</div>
                                                <div className="flex justify-between">
                                                    <div className="text-sm text-gray-500">Reporter</div>
                                                    <button 
                                                        onClick={() => {navigate(`/admin/audience/report/${audience._id}`)}}
                                                        className='bg-yellow-500 hover:bg-yellow-600 text-white py-1 my-1 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                                    >Reporter</button>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="text-sm text-gray-500">Annuler</div>
                                                    <button className='bg-red-500 hover:bg-red-600 text-white py-1 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-red-500'>Annuler</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/4">
                                            <div className=" border pt-6 rounded text-center bg-white shadow-md">
                                                <img src={`data:image/png;base64,${audience.user_profile_photo}`} alt="" className="w-3/4 h-48 object-cover mx-auto border" />
                                                <div className="font-bold text-lg">{ audience.user_nom } { audience.user_prenom }</div>
                                                <div className="flex justify-end px-8 py-2">
                                                </div>
                                                <div className="mx-auto w-full bg-gray-200 px-8 py-1">
                                                    <div className="flex gap-4 my-2">
                                                        <EnvironmentOutlined />
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
            </div>
        </>
    )
}

export default AdminAudienceView;