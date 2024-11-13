import { Link } from "react-router-dom";
import Photo from '../../assets/image/mid-logo.jpg';
import { CheckCircleOutlined, CheckOutlined } from "@ant-design/icons";

const AccountLast: React.FunctionComponent = () => {

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
                    <div className="flex hover:bg-four cursor-pointer justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                            <img src={Photo} alt="" className="bg-red-400 rounded w-10 h-10 object-cover" />
                            <div>
                                <div className="text-md font-semibold">
                                    0123456789012
                                </div>
                                <div className="text-xs text-green-400 ">
                                    2024-20-20
                                </div>
                            </div>
                        </div>
                        <div>
                            <CheckOutlined className="p-1 text-xs bg-green-400 border border-green-600 rounded-full" />
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                            <img src={Photo} alt="" className="bg-red-400 rounded w-10 h-10 object-cover" />
                            <div>
                                <div className="text-md font-semibold">
                                    0123456789012
                                </div>
                                <div className="text-xs text-green-400 ">
                                    2024-20-20
                                </div>
                            </div>
                        </div>
                        <div>
                            <CheckOutlined className="p-1 text-xs bg-green-400 border border-green-600 rounded-full" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                            <img src={Photo} alt="" className="bg-red-400 rounded w-10 h-10 object-cover" />
                            <div>
                                <div className="text-md font-semibold">
                                    0123456789012
                                </div>
                                <div className="text-xs text-green-400 ">
                                    2024-20-20
                                </div>
                            </div>
                        </div>
                        <div>
                            <CheckOutlined className="p-1 text-xs bg-green-400 border border-green-600 rounded-full" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                            <img src={Photo} alt="" className="bg-red-400 rounded w-10 h-10 object-cover" />
                            <div>
                                <div className="text-md font-semibold">
                                    0123456789012
                                </div>
                                <div className="text-xs text-green-400 ">
                                    2024-20-20
                                </div>
                            </div>
                        </div>
                        <div>
                            <CheckOutlined className="p-1 text-xs bg-green-400 border border-green-600 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default AccountLast;