import { Link } from "react-router-dom";
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { MenuProps, Dropdown } from "antd";

function Header() {
    
const items: MenuProps['items'] = [
    {
      label: <Link to="/admin/info"><UserOutlined /> Mon profile</Link>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <div><LogoutOutlined /> Se deconnecter</div>,
      key: '3',
    },
  ];
  
    return(
        <div className="bg-red-500 px-4 py-2 flex justify-end">
            <Link to="/admin/info">
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                    <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded'>
                        <UserOutlined className="text-md mr-1"/>
                        rakoto@gmail.com
                        <DownOutlined className="text-xs ml-2" />
                    </button>
                    </a>
                </Dropdown>
            </Link>
        </div>
    )
}

export default Header;