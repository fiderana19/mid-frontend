import { Link } from "react-router-dom";
import { CheckOutlined, CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import useGetLatestUser from "@/hooks/useGetLatestUser";

const AccountLast: React.FunctionComponent = () => {
    const { data: users, isLoading } = useGetLatestUser();

    return(
            <div className="">
                <div className="flex justify-between items-center">
                    <div className="text-sm">Dernieres inscriptions</div>
                    <Link to="/admin/account">
                        <div className="text-xs font-latobold hover:underline">VOIR TOUT</div>
                    </Link>
                </div>
                <div className="h-0.5 bg-red-500 my-2">

                </div>
                <div>
                    {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
                    {
                        users && users.map((user: any, index: any) => {
                            return(
                                <div key={index} className="flex hover:bg-gray-100 cursor-pointer justify-between items-center mt-4">
                                    <div className="flex items-center gap-2">
                                        <img src={`data:image/png;base64,${user.profile_photo}`} alt="" className="bg-red-400 rounded w-10 h-10 object-cover" />
                                        <div>
                                            <div className="text-md font-latobold">
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