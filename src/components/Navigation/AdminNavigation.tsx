import { CalendarFilled, CalendarOutlined, ContactsFilled, ContactsOutlined, ContainerFilled, ContainerOutlined, DownOutlined, ExceptionOutlined, HomeFilled, HomeOutlined, LoadingOutlined, SnippetsFilled, SnippetsOutlined, UpOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { SOCKET } from "@/socket/sockets";
import { useGetNotOrganizedRequest } from "@/hooks/useGetNotOrganizedRequest";
const MidProfile = lazy(() => import("../MidProfile"));
const MidCopyright = lazy(() => import("../Midopyright"));

const AdminNavigation: React.FC = () => {
    const location = useLocation();
    const [isFailRequest, setIsFailRequest] = useState<boolean>(false);
    const [isAudienceSearch, setIsAudienceSearch] = useState<boolean>(false);
    const [newRequest, setNewRequest] = useState<number>(localStorage.getItem("new_request_count") ? Number(localStorage.getItem("new_request_count")) : 0);
    const [newUser, setNewUser] = useState<number>(localStorage.getItem("new_user_count") ? Number(localStorage.getItem("new_user_count")) : 0);
    const { data: requests, refetch } = useGetNotOrganizedRequest();
    const [notOrganizedRequest, setNotOrganizedRequest] = useState<number>(0);

    useEffect(() => {
        if(location.pathname === "/admin/demande") {
            setNewRequest(0);
            localStorage.setItem("new_request_count", String("0"))
        }
        if(location.pathname === "/admin/account") {
            setNewUser(0);
            localStorage.setItem("new_user_count", String("0"))
        }
        refetch();
        if(requests) {setNotOrganizedRequest(requests.length)}

        SOCKET.on("new_request_created", (data) => {
            setNewRequest(newRequest + 1);
            localStorage.setItem('new_request_count', String(newRequest + 1))
        })        
        
        SOCKET.on("new_user_created", (data) => {
            setNewUser(newRequest + 1);
            localStorage.setItem('new_user_count', String(newUser + 1))
        })

    }, [])

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
                    <div className={`relative my-0.5 items-center flex gap-2 py-2 px-4 hover:bg-four-custom rounded transition-colors ${location.pathname === "/admin/demande" && "bg-four-custom rounded"}`} >
                        {location.pathname === "/admin/demande" ? <SnippetsFilled /> : <SnippetsOutlined />}
                        { (newRequest > 0) && <div className="bg-red-500 text-center w-5 h-5 absolute left-1 top-2 border border-gray-300 text-gray-300 text-xs rounded-full">{ newRequest }</div> }
                        <div className="md:block hidden">Demande</div>
                        { (notOrganizedRequest > 0) && <div className="bg-gray-500 text-center w-5 h-5 absolute right-1 z-0 top-1 border border-gray-300 text-gray-300 text-xs rounded-full">{ notOrganizedRequest }</div> }
                        <button onClick={setRequestDropdown} className="md:block hidden z-10">
                            {
                                isFailRequest ?
                                <UpOutlined className="text-xs p-1 hover:bg-gray-400 transition-opacity rounded-full" />
                                :
                                <DownOutlined className="text-xs p-1 hover:bg-gray-400 transition-opacity rounded-full" />
                            }
                        </button>
                    </div>
                </Link>
                <Link to="/admin/demande/notorganized" className="md:hidden block relative">
                    <div className={`my-0.5 items-center flex gap-2 py-2 px-4 hover:bg-four-custom rounded transition-colors ${location.pathname === "/admin/demande/notorganized" && "bg-four-custom rounded"}`} >
                        {location.pathname === "/admin/demande/notorganized" ? <ExceptionOutlined  /> : <ExceptionOutlined />}
                        { (notOrganizedRequest > 0) && <div className="bg-red-500 text-center w-5 h-5 absolute right-1 z-0 top-1 border border-gray-300 text-gray-300 text-xs rounded-full">{ notOrganizedRequest }</div> }
                        <div className="md:block hidden">Anomalie</div>
                    </div>
                </Link>
                <div className="md:block hidden">
                    {
                        (isFailRequest || (location.pathname === "/admin/demande/notorganized")) &&
                            <Link to="/admin/demande/notorganized">
                                <div className={`my-0.5 relative items-center flex gap-2 py-2 px-4 ml-6 hover:bg-four-custom rounded transition-colors ${location.pathname === "/admin/demande/notorganized" && "bg-four-custom rounded"}`} >
                                    {location.pathname === "/admin/demande/notorganized" ? <ExceptionOutlined /> : <ExceptionOutlined />}
                                    { (notOrganizedRequest > 0) && <div className="bg-red-500 text-center w-5 h-5 absolute right-1 z-0 top-1 border border-gray-300 text-gray-300 text-xs rounded-full">{ notOrganizedRequest }</div> }
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
                    <div className={`relative my-0.5 items-center flex gap-2 py-2 px-4 hover:bg-four-custom rounded transition-colors ${location.pathname === "/admin/account" && "bg-four-custom rounded"}`} >
                        {location.pathname === "/admin/account" ? <UserOutlined /> : <UserOutlined />}
                        { (newUser > 0) && <div className="bg-red-500 text-center w-5 h-5 absolute left-1 top-2 border border-gray-300 text-gray-300 text-xs rounded-full">{ newUser }</div> }
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