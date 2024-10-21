import { Link, useLocation } from "react-router-dom";

function UserNavigation() {
    const location = useLocation();

    return(
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
    )
}

export default UserNavigation;