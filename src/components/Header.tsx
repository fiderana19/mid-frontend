import { Link } from "react-router-dom";
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { MenuProps, Dropdown } from "antd";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getUserById } from "../api/users";

function Header() {
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
  
    return(
        <div className="bg-red-500 px-4 py-2 flex justify-end">
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
    )
}

export default Header;