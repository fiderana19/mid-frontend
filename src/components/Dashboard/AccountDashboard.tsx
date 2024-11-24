import { UserOutlined, MoreOutlined, LoadingOutlined } from "@ant-design/icons";
import { MenuProps, Dropdown } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserStat } from "../../api/dashboard";

const AccountDashboard: React.FunctionComponent = () => {
    const [stat, setStat] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    )

    useEffect(() => {
        const token = localStorage.getItem('token');
        setAccessToken(token);
        getStat()
    }, [])

    async function getStat() {
        const response = await getUserStat(access_token);
        if(response) {
            setStat(response.data);
            setIsLoading(false);
        }
    }
    const items: MenuProps['items'] = [
        {
          label: <Link to="/admin/account" className="flex gap-2 items-center"><UserOutlined />Voir les citoyens</Link>,
          key: '0',
        },
    ];

    return(
        <>
            {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
            {
                stat && 
                <div className="rounded border border-red-400 p-4 my-4">
                <div className="flex justify-between items-center">
                    <div className="text-sm">Nombre de citoyens inscrits</div>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a className="px-1 cursor-pointer hover:bg-gray-300 rounded" onClick={(e) => e.preventDefault()}>
                            <MoreOutlined />
                        </a>
                    </Dropdown>                                    
                </div>
                <div className="flex items-center gap-2 my-4">
                    <UserOutlined className="text-lg p-2 bg-blue-400 border rounded-full border-blue-500" />
                    <div className="text-3xl font-latobold"> {stat.total_user} </div>
                </div>
                <div className="flex">
                    <div className="flex gap-1 items-center w-1/2">
                        <UserOutlined className="text-xs p-1 bg-green-400 border rounded-full border-green-500" />
                        <div className="text-md"> { stat.total_user_valid } </div>
                    </div>
                    <div className="flex gap-1 items-center w-1/2">
                        <UserOutlined className="text-xs p-1 bg-red-400 border rounded-full border-red-500" />
                        <div className="text-md"> { stat.total_user_notvalid } </div>
                    </div>
                </div>
            </div>
            }      
            </>
    )
}

export default AccountDashboard;