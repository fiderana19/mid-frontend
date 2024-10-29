import { HomeOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import MidProfile from "../MidProfile";
import MidCopyright from "../Midopyright";

type MenuItem = Required<MenuProps>['items'][number];

function AdminNavigation() {
    const location = useLocation();

    const items: MenuItem[] = [
        {
            key: 'sub1',
            label: <Link to="/admin/home">
                        <div className={location.pathname === "/admin/home" ? "" : "" } >
                            Acceuil
                        </div>
                    </Link>,
            icon: <HomeOutlined />,
          },
          {
            key: 'sub2',
            label: <Link to="/admin/demande">
                        <div className={location.pathname === "/admin/demande" ? "" : "" } >
                            Demande
                        </div>
                    </Link>,
            icon: <HomeOutlined />,
            children: [
                { key: '1', label: 'Voir les anomalies' },
              ],
          },
          {
            key: 'sub3',
            label:   <Link to="/admin/audience">
                        <div className={location.pathname === "/admin/audience" ? "" : "" } >
                            Audience
                        </div>
                    </Link>,
            icon: <HomeOutlined />,
          },
          {
            key: 'sub4',
            label:  <Link to="/admin/availability">
                        <div className={location.pathname === "/admin/availability" ? "" : "" } >
                            Disponibilite
                        </div>
                    </Link>,
            icon: <HomeOutlined />,
            children: [
                { key: '1', label: 'Vue calendrier' },
              ],
          },
          {
            key: 'sub5',
            label:  <Link to="/admin/account">
                        <div className={location.pathname === "/admin/account" ? "" : "" } >
                            Citoyen
                        </div>
                    </Link>,
            icon: <HomeOutlined />,
            children: [
                { key: '1', label: 'Filtrer par validation' },
              ],
          },
          {
            key: 'sub6',
            label:  <Link to="/admin/dashboard">
                        <div className="">
                            Dashboard
                        </div>
                    </Link>,
            icon: <HomeOutlined />,
          },
      ];

    return(
        <div className="z-50 fixed top-0 left-0 w-1/6 p-4 flex flex-col justify-between h-screen bg-green-900 text-center">
            <MidProfile/>
            <div className="text-left">
                <Menu
                    mode="inline"
                    items={items}
                    className="w-full bg-transparent"
                />
            </div>
            <MidCopyright />
        </div>
    )
}

export default AdminNavigation;