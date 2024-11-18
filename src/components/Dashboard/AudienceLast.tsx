import { Link } from "react-router-dom";
import Photo from '../../assets/image/mid-logo.jpg';
import { CheckCircleOutlined, CheckOutlined, CloseOutlined, WarningOutlined } from "@ant-design/icons";
import { getLatestUser } from "../../api/dashboard";
import { useState, useEffect } from "react";

const AudienceLast: React.FunctionComponent = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    )

    useEffect(() => {
        const token = localStorage.getItem('token');
        setAccessToken(token);
        getStat()
    }, [])

    async function getStat() {
        const response = await getLatestUser(access_token);
        if(response) {
            setUsers(response.data)
        }
    }

    return(
            <div className="">
                <div className="">
                    {
                        users && users.map((user, index) => {
                            return(
                                <div key={index} className="flex hover:bg-four cursor-pointer justify-between items-center">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <img src={`data:image/png;base64,${user.profile_photo}`} alt="" className="bg-red-400 rounded w-10 h-10 object-cover" />
                                            <div>
                                                <div className="text-md font-semibold">
                                                    { user.cni }
                                                </div>
                                                <div className="text-xs text-gray-600 ">
                                                    { user.user_creation }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center mt-2">
                                            <div className="font-latobold">Requete</div>
                                            <div className="rounded bg-blue-200 px-2 border border-blue-500 flex gap-2 text-xs">
                                                <WarningOutlined />
                                                <div>Fixé</div>  
                                            </div>
                                        </div>
                                        <div>Organisé pour la date de <span className="font-latobold">22-12-2024</span>  de <span className="font-latobold">11:00</span> à <span className="font-latobold">15:00</span></div>
                                    </div>
                                    
                                </div>
                            )
                        })
                    }
                </div>
            </div>
    )
}

export default AudienceLast;