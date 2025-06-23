import { FunctionComponent, lazy, Suspense } from 'react';
import { Outlet } from "react-router-dom";
import MidLogo from '../assets/image/mid-logo.jpg';
import { LoadingOutlined } from '@ant-design/icons';
const AdminNavigation = lazy(() => import("../components/Navigation/AdminNavigation"));

const AdminLayout: FunctionComponent = () => {
    return(
        <div className="w-full flex">
            <div className="p-4 w-1/6 flex flex-col justify-between h-screen bg-green-900 text-center">
                <div className="">
                    <img src={MidLogo} alt="Logo du ministere" className="w-20 h-20 object-cover rounded-full mx-auto" />
                    <div className="text-md font-semibold mt-2">Gestion d'audience avec le ministre</div>
                </div>
                <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                    <AdminNavigation />
                </Suspense>
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