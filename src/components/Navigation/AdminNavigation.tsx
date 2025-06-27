import { CalendarFilled, CalendarOutlined, ContactsFilled, ContactsOutlined, ContainerFilled, ContainerOutlined, DownOutlined, ExceptionOutlined, HomeFilled, HomeOutlined, LoadingOutlined, PieChartFilled, PieChartOutlined, SearchOutlined, SnippetsFilled, SnippetsOutlined, UpOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import React, { lazy, Suspense, useState } from "react";
import { Button } from "../ui/button";
const MidProfile = lazy(() => import("../MidProfile"));
const MidCopyright = lazy(() => import("../Midopyright"));

const AdminNavigation: React.FC = () => {
    const location = useLocation();
    const [isFailRequest, setIsFailRequest] = useState<boolean>(false);
    const [isAudienceSearch, setIsAudienceSearch] = useState<boolean>(false);

    async function setRequestDropdown() {
        if(isFailRequest) {
            setIsFailRequest(false)
        } else {
            setIsFailRequest(true)
        }
    }

    async function setAudienceDropdown() {
        if(isAudienceSearch) {
            setIsAudienceSearch(false)
        } else {
            setIsAudienceSearch(true)
        }
    }

    return(
        <div className="z-50 fixed top-0 left-0 p-1 md:p-4 flex flex-col justify-between h-screen bg-second-custom text-center">
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
              <MidProfile/>
            </Suspense>
            <div className="text-left w-full">
                <Link to="/admin/home">
                    <div className={`my-0.5 items-center flex gap-2 py-2 px-4 hover:bg-four-custom rounded transition-colors ${location.pathname === "/admin/home" && "bg-four-custom rounded"}`} >
                        {location.pathname === "/admin/home" ? <HomeFilled /> : <HomeOutlined />}
                        <div className="md:block hidden">Accueil</div>
                    </div>
                </Link>
                <Link to="/admin/demande">
                    <div className={`my-0.5 items-center flex gap-2 py-2 px-4 hover:bg-four-custom rounded transition-colors ${location.pathname === "/admin/demande" && "bg-four-custom rounded"}`} >
                        {location.pathname === "/admin/demande" ? <SnippetsFilled /> : <SnippetsOutlined />}
                        <div className="md:block hidden">Demande</div>
                        <button onClick={setRequestDropdown} className="md:block hidden">
                            {
                                isFailRequest ?
                                <UpOutlined className="text-xs p-1 hover:bg-gray-400 transition-opacity rounded-full" />
                                :
                                <DownOutlined className="text-xs p-1 hover:bg-gray-400 transition-opacity rounded-full" />
                            }
                        </button>
                    </div>
                </Link>
                <Link to="/admin/demande/notorganized" className="md:hidden block">
                    <div className={`my-0.5 items-center flex gap-2 py-2 px-4 hover:bg-four-custom rounded transition-colors ${location.pathname === "/admin/demande/notorganized" && "bg-four-custom rounded"}`} >
                        {location.pathname === "/admin/demande/notorganized" ? <ExceptionOutlined  /> : <ExceptionOutlined />}
                        <div className="md:block hidden">Anomalie</div>
                    </div>
                </Link>
                <div className="md:block hidden">
                    {
                        (isFailRequest || (location.pathname === "/admin/demande/notorganized")) &&
                            <Link to="/admin/demande/notorganized">
                                <div className={`my-0.5 items-center flex gap-2 py-2 px-4 ml-6 hover:bg-four-custom rounded transition-colors ${location.pathname === "/admin/demande/notorganized" && "bg-four-custom rounded"}`} >
                                    {location.pathname === "/admin/demande/notorganized" ? <ExceptionOutlined /> : <ExceptionOutlined />}
                                    <div className="md:block hidden">Anomalie</div>
                                </div>
                            </Link>
                    }
                </div>
                <Link to="/admin/audience">
                    <div className={`my-0.5 items-center flex gap-2 py-2 px-4 hover:bg-four-custom rounded transition-colors ${location.pathname === "/admin/audience" && "bg-four-custom rounded"}`} >
                        {location.pathname === "/admin/audience" ? <ContactsFilled /> : <ContactsOutlined />}
                        <div className="md:block hidden">Audience</div>
                        <button onClick={setAudienceDropdown} className="md:block hidden">
                            {
                                isFailRequest ?
                                <UpOutlined className="text-xs p-1 hover:bg-gray-400 transition-opacity rounded-full" />
                                :
                                <DownOutlined className="text-xs p-1 hover:bg-gray-400 transition-opacity rounded-full" />
                            }
                        </button>
                    </div>
                </Link>
                <div className="md:block hidden">
                    {
                        (isAudienceSearch || (location.pathname === "/admin/audience/search")) &&
                            <Link to="/admin/audience/search">
                                <div className={`my-0.5 items-center flex gap-2 py-2 px-4 ml-6 hover:bg-four-custom rounded transition-colors ${location.pathname === "/admin/audience/search" && "bg-four-custom rounded"}`} >
                                    {location.pathname === "/admin/audience/search" ? <ContainerFilled /> : <ContainerOutlined />}
                                    <div className="md:block hidden">Rapport</div>
                                </div>
                            </Link>
                    }
                </div>
                <Link to="/admin/availability">
                    <div className={`my-0.5 items-center flex gap-2 py-2 px-4 hover:bg-four-custom rounded transition-colors ${location.pathname === "/admin/availability" && "bg-four-custom rounded"}`} >
                        {location.pathname === "/admin/availability" ? <CalendarFilled /> : <CalendarOutlined />}
                        <div className="md:block hidden">Disponibilité</div>
                    </div>
                </Link>
                <Link to="/admin/account">
                    <div className={`my-0.5 items-center flex gap-2 py-2 px-4 hover:bg-four-custom rounded transition-colors ${location.pathname === "/admin/account" && "bg-four-custom rounded"}`} >
                        {location.pathname === "/admin/account" ? <UserOutlined /> : <UserOutlined />}
                        <div className="md:block hidden">Citoyen</div>
                    </div>
                </Link>
            </div>
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <MidCopyright />
            </Suspense>
        </div>
    )
}

export default AdminNavigation;