import { Link, useLocation } from "react-router-dom";
import MidLogo from '../assets/image/mid-logo.jpg';

function UserNavigation() {
    const location = useLocation();

    return(
        <div className="w-full">
        <div className="px-4 py-2 flex justify-between bg-red-500 text-center">
            <Link to='/user/home' className="flex gap-2">
                <img src={MidLogo} alt="Logo du ministere" className="w-10 h-10 object-cover rounded-full mx-auto" />
                <div className="text-md font-semibold mt-2">Audience</div>
            </Link>
            <div className="flex gap-2">
                <div className="text-left flex gap-2">
                    <Link to="/user/home">
                        <div className={location.pathname === '/user/home' ? "my-1 border bg-gray-400 hover:bg-gray-400 rounded px-2 py-1" : "my-1 border border-gray-400 hover:bg-gray-400 rounded px-2 py-1"}>
                            Accueil
                        </div>
                    </Link>
                    
                    <Link to="/user/demande">
                        <div className={location.pathname === '/user/demande' ? "my-1 border bg-gray-400 hover:bg-gray-400 rounded px-2 py-1" : "my-1 border border-gray-400 hover:bg-gray-400 rounded px-2 py-1"}>
                            Demande
                        </div>
                    </Link>
                    <Link to="/user/audience">
                        <div className={location.pathname === '/user/audience' ? "my-1 border bg-gray-400 hover:bg-gray-400 rounded px-2 py-1" : "my-1 border border-gray-400 hover:bg-gray-400 rounded px-2 py-1"}>
                            Audience
                        </div>
                    </Link>
                </div>
                <Link to="/user/info" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded'>
                    rakoto@gmail.com
                </Link>
            </div>
        </div>
    </div>
    )
}

export default UserNavigation;