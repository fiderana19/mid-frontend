import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import MidLogo from '../assets/image/mid-logo.jpg';
import AdminNavigation from "../components/AdminNavigation";

const AdminLayout: FunctionComponent = () => {
    return(
        <div className="w-full flex">
            <div className="p-4 w-1/6 flex flex-col justify-between h-screen bg-green-900 text-center">
                <div className="">
                    <img src={MidLogo} alt="Logo du ministere" className="w-20 h-20 object-cover rounded-full mx-auto" />
                    <div className="text-md font-semibold mt-2">Gestion d'audience avec le ministre</div>
                </div>
                <AdminNavigation />
                <div className="text-xs font-bold">
                    MID. @copyright 2024
                </div>
            </div>
            <div className="w-5/6">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout;