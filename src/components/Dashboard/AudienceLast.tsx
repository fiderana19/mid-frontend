import { Link } from "react-router-dom";
import Photo from '../../assets/image/mid-logo.jpg';
import { CheckCircleOutlined, CheckOutlined, CloseOutlined, ContactsOutlined, MoreOutlined, UserOutlined, WarningOutlined } from "@ant-design/icons";
import { getAudienceLast, getLatestUser } from "../../api/dashboard";
import { useState, useEffect } from "react";
import { Dropdown, MenuProps } from "antd";

const AudienceLast: React.FunctionComponent = () => {
    const [audience, setAudience] = useState<any>();
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    )

    useEffect(() => {
        const token = localStorage.getItem('token');
        setAccessToken(token);
        getStat()
    }, [])

    async function getStat() {
        const response = await getAudienceLast(access_token);
        if(response?.status === 200 || response?.status === 201) {
            console.log("eto zao",response.data)
            setAudience(response.data)
        }
    }

    const items: MenuProps['items'] = [
        {
          label: <Link to="/admin/audience" className="flex gap-2 items-center"><ContactsOutlined />Voir les audiences</Link>,
          key: '0',
        },
    ];

    return(
            <div className="">
                <div className="">
                    {
                        audience && 
                                <div className="flex justify-between items-center">
                                    <div className="w-full">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <img src={`data:image/png;base64,${audience?.user_profile_photo}`} alt="" className="bg-red-400 rounded w-10 h-10 object-cover" />
                                                <div>
                                                    <div className="text-md font-semibold">
                                                        { audience?.user_nom } { audience?.user_prenom }
                                                    </div>
                                                    <div className="text-xs text-gray-600 ">
                                                        { audience?.user_cni }
                                                    </div>
                                                </div>
                                            </div>
                                            <Dropdown menu={{ items }} trigger={['click']}>
                                                <a className="px-1 cursor-pointer hover:bg-gray-300 rounded" onClick={(e) => e.preventDefault()}>
                                                    <MoreOutlined />
                                                </a>
                                            </Dropdown>
                                        </div>
                                        <div className="flex gap-2 items-center mt-2">
                                            <div className="font-latobold"> { audience?.request_type } </div>
                                            {
                                                audience.status_audience[0] === "Reporté" ? 
                                                    <div className="rounded bg-blue-200 px-2 border border-blue-500 flex gap-2 text-xs">
                                                        <WarningOutlined />
                                                        <div>{ audience.status_audience }</div>  
                                                    </div>
                                                : (
                                                audience.status_audience[0] === "Fixé" ?
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
                                        <div>Organisé pour la date de <span className="font-latobold"> { audience?.availability_date } </span>  de <span className="font-latobold"> { audience?.availability_hour_debut } </span> à <span className="font-latobold"> { audience?.availability_hour_end } </span></div>
                                    </div>
                                </div>
                    }
                </div>
            </div>
    )
}

export default AudienceLast;