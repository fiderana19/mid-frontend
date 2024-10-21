import { FunctionComponent } from "react";
import { Link, Outlet } from "react-router-dom";
import MidLogo from '../assets/image/mid-logo.jpg';
import UserNavigation from "../components/UserNavigation";

const UserLayout: FunctionComponent = () => {
    return(
        <div className="w-full">
            <div className="px-4 py-2 flex justify-between bg-red-500 text-center">
                <Link to='/user/home' className="flex gap-2">
                    <img src={MidLogo} alt="Logo du ministere" className="w-10 h-10 object-cover rounded-full mx-auto" />
                    <div className="text-md font-semibold mt-2">Audience</div>
                </Link>
                <div className="flex gap-2">
                    <UserNavigation />
                    <Link to="/user/info" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded'>
                        rakoto@gmail.com
                    </Link>
                </div>
            </div>
            <div className="">
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout;