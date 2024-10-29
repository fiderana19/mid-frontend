import { Link, useLocation } from "react-router-dom";
import MidLogo from '../../assets/image/mid-logo.jpg';
import { Dropdown, MenuProps } from "antd";
import { UserOutlined, LogoutOutlined, DownOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { getUserById } from "../../api/users";
import { useAuth } from "../../context/AuthContext";

function UserNavigation() {
    const location = useLocation();
    const { logout } = useAuth();
    const [user, setUser] = useState<any>();

    useEffect(() => { 
        async function fetchUser() {
          const token = localStorage.getItem("token");
  
          if(token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const response = await getUserById(token,decodedToken.id);
  
            setUser(response)
          }
        }
        fetchUser()
    }, [])

    const items: MenuProps['items'] = [
        {
          label: <Link to="/user/info"><UserOutlined /> Mon profile</Link>,
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: <div onClick={logout}><LogoutOutlined /> Se deconnecter</div>,
          key: '3',
        },
      ];
      

    return(
        <div className="px-4 py-2 fixed top-0 left-0 flex justify-between w-full bg-red-500 text-center">
            <Link to='/user/home' className="flex gap-2">
                <img src={MidLogo} alt="Logo du ministere" className="w-10 h-10 object-cover rounded-full mx-auto" />
                <div className="text-md font-semibold mt-2">Audience</div>
            </Link>
            <div className="flex gap-2 items-center">
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
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                        {
                            user &&
                            <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded items-center'>
                                <UserOutlined className="text-md mr-1"/>
                                    { user.email }
                                <DownOutlined className="text-xs ml-2" />
                            </button>
                        }
                        </a>
                    </Dropdown>
            </div>
                  
        </div>
    )
}

export default UserNavigation;