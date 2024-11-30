import { Link } from "react-router-dom";
import { DownOutlined, UserOutlined, LogoutOutlined, MenuOutlined, HomeOutlined, ExceptionOutlined, LoadingOutlined, SnippetsOutlined, ContactsOutlined, CalendarOutlined, ContainerOutlined } from '@ant-design/icons'
import { MenuProps, Dropdown } from "antd";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getUserById } from "../api/users";
import MidLogo from '../assets/image/mid-logo.jpg';

function Header() {
  const { logout } = useAuth();
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => { 
      async function fetchUser() {
        const token = localStorage.getItem("token");

        if(token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const response = await getUserById(token,decodedToken.id);
          setIsLoading(false);
          setUser(response);
        }
      }
      fetchUser()
  }, [])
    
  const items: MenuProps['items'] = [
    {
      label: <Link to="/admin/info"><UserOutlined /> Mon profile</Link>,
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

  const itemssm: MenuProps['items'] = [
    {
      label: <Link to="/admin/info"><UserOutlined /> Mon profile</Link>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      key: '1',
      label: <Link to="/admin/home">
                  <div className={location.pathname === "/admin/home" ? "flex gap-2 text-blue-500 font-latobold" : "flex gap-2" } >
                      <HomeOutlined className="" />
                      <div className="">Acceuil</div>
                  </div>
              </Link>,
    },
    {
      key: '2',
      label: <Link to="/admin/demande">
                  <div className={location.pathname === "/admin/demande" ? "flex gap-2 text-blue-500 font-latobold" : "flex gap-2" } >
                      <SnippetsOutlined className="" />
                      <div className="">Demande</div>
                  </div>
              </Link>,
      children: [
          { key: '10', label: 
            <Link to="/admin/demande/notorganized">
              <div className={location.pathname === "/admin/demande/notorganized" ? "flex gap-2 font-latobold items-center" : "items-center flex gap-2" } >
                  <ExceptionOutlined className="" />
                  <div className="">Anomalie</div>
              </div>
          </Link>
           },
        ],
    },
    {
      key: '3',
      label:   <Link to="/admin/audience">
                  <div className={location.pathname === "/admin/audience" ? "flex gap-2 text-blue-500 font-latobold" : "flex gap-2" } >
                      <ContactsOutlined className="" />
                      <div className="">Audience</div>
                  </div>
              </Link>,
       children: [
        { key: '10', label: 
          <Link to="/admin/audience/search">
            <div className={location.pathname === "/admin/audience/search" ? "flex gap-2 text-blue-500 font-latobold" : "flex gap-2" } >
              <ContainerOutlined className="" />
              <div className="">Rapport</div>
            </div>
          </Link>
         },
      ],
    },
    {
      key: '4',
      label:  <Link to="/admin/availability">
                  <div className={location.pathname === "/admin/availability" ? "flex gap-2 text-blue-500 font-latobold" : "flex gap-2" } >
                      <CalendarOutlined className="" />
                      <div className="">Disponibilite</div>
                  </div>
              </Link>,
    },
    {
      key: '5',
      label:  <Link to="/admin/account">
                  <div className={location.pathname === "/admin/account" ? "flex gap-2 text-blue-500 font-latobold" : "flex gap-2" } >
                      <UserOutlined className="" />
                      <div className="">Citoyen</div>
                  </div>
              </Link>,
    },
    {
      type: 'divider',
    },
    {
      label: <div onClick={logout}><LogoutOutlined /> Se deconnecter</div>,
      key: '7',
    },
  ];
  
    return(
        <div className="bg-five shadow-sm px-4 py-3 flex justify-normal sm:justify-end">
          <div className="sm:flex hidden">
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                {
                  user &&
                    <button className='bg-gray-500 hover:bg-gray-700 text-white flex py-1 px-3 rounded items-center'>
                      <img src={`data:image/png;base64,${user.profile_photo}`} className="w-6 h-6 object-cover mr-2 rounded-full border" />
                      <div className="sm:block hidden font-latobold">{ user.email }</div>
                      <DownOutlined className="text-xs ml-2" />
                      {isLoading && <LoadingOutlined />}
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
          </div>
          <div className="sm:hidden flex justify-between items-center w-full">
            <img src={MidLogo} alt="Mininter Logo" className="w-10 h-10 object-cover" />
            <Dropdown menu={{ items: itemssm }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                {
                  user &&
                    <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded items-center'>
                      <MenuOutlined className="text-md"/>
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
        </div>
      </div>
    )
}

export default Header;