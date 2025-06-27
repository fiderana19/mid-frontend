import { Link } from "react-router-dom";
import { ContactsOutlined, LoadingOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import useGetLastAudience from "@/hooks/useGetLastAudience";
import AudienceStatus from "../status/AudienceStatus";

const AudienceLast: React.FunctionComponent = () => {
    const { data: audience, isLoading } = useGetLastAudience();

    const items: MenuProps['items'] = [
        {
          label: <Link to="/admin/audience" className="flex gap-2 items-center"><ContactsOutlined />Voir les audiences</Link>,
          key: '0',
        },
    ];

    return(
        <>
            {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
            {
                audience && 
                <div className="flex justify-between items-center">
                    <div className="w-full">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <img src={`data:image/png;base64,${audience?.user_profile_photo}`} alt="" className="rounded w-10 h-10 object-cover" />
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
                            <AudienceStatus value={audience?.status_audience[0]} />
                        </div>
                        <div className="whitespace-normal">Organisé pour la date de <span className="font-latobold"> { audience?.availability_date } </span>  de <span className="font-latobold"> { audience?.availability_hour_debut } </span> à <span className="font-latobold"> { audience?.availability_hour_end } </span></div>
                    </div>
                </div>
            }
        </>
    )
}

export default AudienceLast;