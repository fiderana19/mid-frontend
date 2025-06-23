import { Link, useLocation } from "react-router-dom";
import MidLogo from '../../assets/image/mid-logo.jpg';
import { Dropdown, MenuProps } from "antd";
import { UserOutlined, LogoutOutlined, DownOutlined, MenuOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { useGetUserById } from "@/hooks/useGetUserById";

function UserNavigation() {
    const location = useLocation();
    const { logout, token } = useAuth();
    const { data: user, isLoading } = useGetUserById(token ? JSON.parse(atob(token.split('.')[1])).id : null)    

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

      const nav: MenuProps['items'] = [
        {
          label: <Link to="/user/info"><UserOutlined /> Mon profile</Link>,
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: <Link to="/user/home">
                    <div className={location.pathname === '/user/home' ? "px-2  text-third" : "transition-colors px-2 hover:text-third"}>
                        Accueil
                    </div>
                </Link>,
          key: '1',
        },
        {
            label: <Link to="/user/demande">
                        <div className={location.pathname === '/user/demande' ? "px-2 text-third " : "transition-colors px-2 hover:text-third"}>
                            Demande
                        </div>
                    </Link>,
            key: '2',
        },
        {
            label: <Link to="/user/audience">
                        <div className={location.pathname === '/user/audience' ? "px-2 text-third" : "transition-colors px-2 hover:text-third"}>
                            Audience
                        </div>
                    </Link>,
            key: '3',
        },
        {
            type: 'divider',
        },  
        {
            label: <div onClick={logout}><LogoutOutlined /> Se deconnecter</div>,
            key: '4',
        },
    ];
      

    return(
        <div className="px-4 fixed top-0 left-0 flex justify-between w-full bg-second-custom text-center text-white md:py-0 py-3 z-50">
            <Link to='/user/home' className="flex items-center gap-2">
                <img src={MidLogo} alt="Logo du ministere" className="w-10 h-10 object-cover rounded-full mx-auto" />
                <div className="text-md font-latobold">MININTER: Audience</div>
            </Link>
            <div className="flex gap-4 items-center">
                <div className="text-left gap-4 md:flex hidden">
                    <Link to="/user/home">
                        <div className={`transition-colors px-2 py-4 border-b-2  hover:border-b-2 hover:border-third ${location.pathname === '/user/home' ? "border-b-" : ""}`}>
                            Accueil
                        </div>
                    </Link>
                    
                    <Link to="/user/demande">
                        <div className={location.pathname === '/user/demande' ? "px-2 py-4 text-third border-b-2 border-third" : "transition-colors px-2 py-4 border-b-2 border-b-second hover:border-b-2 hover:border-third"}>
                            Demande
                        </div>
                    </Link>
                    <Link to="/user/audience">
                        <div className={location.pathname === '/user/audience' ? "px-2 py-4 text-third border-b-2 border-third" : "transition-colors px-2 py-4 border-b-2 border-b-second hover:border-b-2 hover:border-third"}>
                            Audience
                        </div>
                    </Link>
                </div>
                    <Dropdown menu={{ items }} trigger={['click']} className="md:block hidden">
                        <a onClick={(e) => e.preventDefault()}>
                        {
                            user &&
                            <button className='bg-gray-500 hover:bg-gray-700 text-white font-medium py-1 px-3 rounded flex font-latobold items-center'>
                                    <img src={`data:image/png;base64,${user.profile_photo}`} className="w-6 h-6 object-cover mr-2 rounded-full border" />
                                    { user.email }
                                <DownOutlined className="text-xs ml-2" />
                            </button>
                        }
                        {
                            isLoading &&
                                <button className='bg-gray-500 hover:bg-gray-700 text-white flex py-1 px-3 rounded items-center'>
                                    <LoadingOutlined />
                                </button>
                        }
                        </a>
                    </Dropdown>

                    <Dropdown menu={{ items: nav }} trigger={['click']} className="md:hidden block">
                        <a onClick={(e) => e.preventDefault()}>
                            <button className='bg-gray-500 hover:bg-gray-700 text-white font-medium py-1 px-3 rounded flex items-center'>
                                <MenuOutlined className="text-white py-2 px-1" />
                            </button>
                        </a>
                    </Dropdown>
            </div>
                  
        </div>
    )
}

export default UserNavigation;