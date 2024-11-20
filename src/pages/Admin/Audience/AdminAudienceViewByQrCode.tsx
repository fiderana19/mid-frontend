import { useState, useEffect } from "react";
import { CheckCircleFilled, CheckOutlined, CloseCircleFilled, CloseOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined, WarningOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import Header from "../../../components/Header";
import { getAudienceByRef } from "../../../api/audience";

function AdminAudienceViewByQrCode() {
    const [audience, setAudience] = useState<any>();
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
            const response = await getAudienceByRef(access_token,audienceId);
            if(response) {
                console.log(response)
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
                </div>
            </div>
        </>
    )
}

export default AdminAudienceViewByQrCode;