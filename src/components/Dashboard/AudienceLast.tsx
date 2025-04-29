import { Link } from "react-router-dom";
import { ContactsOutlined, LoadingOutlined, MoreOutlined } from "@ant-design/icons";
import { getAudienceLast } from "../../api/dashboard";
import { useState, useEffect } from "react";
import { Dropdown, MenuProps } from "antd";

const AudienceLast: React.FunctionComponent = () => {
    const [audience, setAudience] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getStat()
    }, [])

    async function getStat() {
        const token = localStorage.getItem('token');
        const response = await getAudienceLast(token);
        if(response?.status === 200 || response?.status === 201) {
            setIsLoading(false);
            setAudience(response.data);
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
                    {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
                    {
                        audience && 
                                <div className="flex justify-between items-center">
                                    <div className="w-full">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <img src={`data:image/png;base64,${audience?.user_profile_photo}`} alt="" className="bg-red-400 rounded w-10 h-10 object-cover" />
                                                <div>
                                                    <div className="text-md font-latobold">
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
                                            { audience.status_audience[0] === "Fixé" ? 
                                                <div className="flex items-center bg-blue-200 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                    <span className="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                                                    { audience.status_audience }
                                                </div>                                        
                                                : (
                                                    audience.status_audience[0] === "Reporté" ?
                                                    <div className="flex items-center bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                        <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                                                        { audience.status_audience }
                                                    </div>                                        
                                                    : (
                                                        audience.status_audience[0] === "Classé" ?
                                                        <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                            { audience.status_audience }
                                                        </div>
                                                        :
                                                        (
                                                            audience.status_audience[0] === "Absent" ?
                                                            <div className="flex items-center bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                                                                { audience.status_audience }
                                                            </div>
                                                            :
                                                            <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                                                { audience.status_audience }
                                                            </div>
                                                        )
                                                    )
                                                )
                                            }     
                                        </div>
                                        <div className="whitespace-normal">Organisé pour la date de <span className="font-latobold"> { audience?.availability_date } </span>  de <span className="font-latobold"> { audience?.availability_hour_debut } </span> à <span className="font-latobold"> { audience?.availability_hour_end } </span></div>
                                    </div>
                                </div>
                    }
                </div>
            </div>
    )
}

export default AudienceLast;