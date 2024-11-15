import { Link } from "react-router-dom";
import Photo from '../../assets/image/mid-logo.jpg';
import { CheckCircleOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { getLatestUser } from "../../api/dashboard";
import { useState, useEffect } from "react";

const AccountLast: React.FunctionComponent = () => {
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
                <div className="flex justify-between items-center">
                    <div className="text-sm">Dernieres inscriptions</div>
                    <Link to="/admin/account">
                        <div className="text-xs font-semibold hover:underline">VOIR TOUT</div>
                    </Link>
                </div>
                <div className="h-0.5 bg-red-500 my-2">

                </div>
                <div className="">
                    {
                        users && users.map((user, index) => {
                            return(
                                <div key={index} className="flex hover:bg-four cursor-pointer justify-between items-center mt-4">
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
                                    <div>
                                        {
                                            user.validation ?
                                            <CheckOutlined className="p-1 text-xs bg-green-400 border border-green-600 rounded-full" />
                                            :
                                            <CloseOutlined className="p-1 text-xs bg-red-400 border border-red-600 rounded-full" />
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
    )
}

export default AccountLast;