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
            key: '1',
            label: <Link to="/admin/home">
                        <div className={location.pathname === "/admin/home" ? "flex gap-2 text-white font-bold" : "flex gap-2" } >
                            <HomeOutlined className="md:mr-0 mr-3" />
                            <div className="md:block hidden">Acceuil</div>
                        </div>
                    </Link>,
          },
          {
            key: '2',
            label: <Link to="/admin/demande">
                        <div className={location.pathname === "/admin/demande" ? "flex gap-2 text-white font-bold" : "flex gap-2" } >
                            <HomeOutlined className="md:mr-0 mr-3" />
                            <div className="md:block hidden">Demande</div>
                        </div>
                    </Link>,
            children: [
                { key: '21', label: 'Voir les anomalies' },
              ],
          },
          {
            key: '3',
            label:   <Link to="/admin/audience">
                        <div className={location.pathname === "/admin/audience" ? "flex gap-2 text-white font-bold" : "flex gap-2" } >
                            <HomeOutlined className="md:mr-0 mr-3" />
                            <div className="md:block hidden">Audience</div>
                        </div>
                    </Link>,
          },
          {
            key: '4',
            label:  <Link to="/admin/availability">
                        <div className={location.pathname === "/admin/availability" ? "flex gap-2 text-white font-bold" : "flex gap-2" } >
                            <HomeOutlined className="md:mr-0 mr-3" />
                            <div className="md:block hidden">Disponibilite</div>
                        </div>
                    </Link>,
            children: [
                { key: '41', label: 'Vue calendrier' },
              ],
          },
          {
            key: '5',
            label:  <Link to="/admin/account">
                        <div className={location.pathname === "/admin/account" ? "flex gap-2 text-white font-bold" : "flex gap-2" } >
                            <HomeOutlined className="md:mr-0 mr-3" />
                            <div className="md:block hidden">Citoyen</div>
                        </div>
                    </Link>,
            children: [
                { key: '51', label: 'Filtrer par validation' },
              ],
          },
          {
            key: '6',
            label:  <Link to="/admin/dashboard">
                        <div className={location.pathname === "/admin/dashboard" ? "flex gap-2 text-white font-bold" : "flex gap-2" } >
                            <HomeOutlined className="md:mr-0 mr-3" />
                            <div className="md:block hidden">Dashboard</div>
                        </div>
                    </Link>,
          },
      ];

    return(
        <div className="z-50 fixed top-0 left-0 p-1 md:p-4 flex flex-col justify-between h-screen bg-second text-center">
            <MidProfile/>
            <div className="text-left w-full">
                <Menu
                    mode="inline"
                    items={items}
                    className="bg-transparent"
                />
            </div>
            <MidCopyright />
        </div>
    )
}

export default AdminNavigation;