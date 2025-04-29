import { CalendarFilled, CalendarOutlined, ContactsFilled, ContactsOutlined, ContainerFilled, ContainerOutlined, DownOutlined, ExceptionOutlined, HomeFilled, HomeOutlined, LoadingOutlined, PieChartFilled, PieChartOutlined, SearchOutlined, SnippetsFilled, SnippetsOutlined, UpOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
const MidProfile = lazy(() => import("../MidProfile"));
const MidCopyright = lazy(() => import("../Midopyright"));

function AdminNavigation() {
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
        <div className="z-50 fixed top-0 left-0 p-1 md:p-4 flex flex-col justify-between h-screen bg-second text-center">
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
              <MidProfile/>
            </Suspense>
            <div className="text-left w-full">
                <Link to="/admin/home">
                    <div className={location.pathname === "/admin/home" ? "flex gap-2 font-latobold py-2 px-4 bg-four rounded items-center" : "items-center flex gap-2 py-2 px-4 hover:bg-four rounded transition-colors" } >
                        {location.pathname === "/admin/home" ? <HomeFilled className="" /> : <HomeOutlined className="" />}
                        <div className="md:block hidden">Accueil</div>
                    </div>
                </Link>
                <Link to="/admin/demande">
                    <div className={location.pathname === "/admin/demande" ? "flex gap-2 font-latobold py-2 px-4 bg-four rounded items-center" : "items-center flex gap-2 py-2 px-4 hover:bg-four rounded transition-colors" } >
                        {location.pathname === "/admin/demande" ? <SnippetsFilled className="" /> : <SnippetsOutlined className="" />}
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
                    <div className={location.pathname === "/admin/demande/notorganized" ? "flex gap-2 font-latobold py-2 px-4 bg-four rounded items-center" : "items-center flex gap-2 py-2 px-4 hover:bg-four rounded transition-colors" } >
                        {location.pathname === "/admin/demande/notorganized" ? <ExceptionOutlined className="" /> : <ExceptionOutlined className="" />}
                        <div className="md:block hidden">Anomalie</div>
                    </div>
                </Link>
                <div className="md:block hidden">
                    {
                        (isFailRequest || (location.pathname === "/admin/demande/notorganized")) &&
                            <Link to="/admin/demande/notorganized">
                                <div className={location.pathname === "/admin/demande/notorganized" ? "flex gap-2 font-latobold py-2 pl-8 pr-4 bg-four rounded items-center" : "items-center flex gap-2 py-2 pl-8 pr-4 hover:bg-four rounded transition-colors" } >
                                    {location.pathname === "/admin/demande/notorganized" ? <ExceptionOutlined className="" /> : <ExceptionOutlined className="" />}
                                    <div className="md:block hidden">Anomalie</div>
                                </div>
                            </Link>
                    }
                </div>
                <Link to="/admin/audience">
                    <div className={location.pathname === "/admin/audience" ? "flex gap-2 font-latobold py-2 px-4 bg-four rounded items-center" : "items-center flex gap-2 py-2 px-4 hover:bg-four rounded transition-colors" } >
                        {location.pathname === "/admin/audience" ? <ContactsFilled className="" /> : <ContactsOutlined className="" />}
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
                                <div className={location.pathname === "/admin/audience/search" ? "flex gap-2 font-latobold py-2 pl-8 pr-4 bg-four rounded items-center" : "items-center flex gap-2 py-2 pl-8 pr-4 hover:bg-four rounded transition-colors" } >
                                    {location.pathname === "/admin/audience/search" ? <ContainerFilled className="" /> : <ContainerOutlined className="" />}
                                    <div className="md:block hidden">Rapport</div>
                                </div>
                            </Link>
                    }
                </div>
                <Link to="/admin/availability">
                    <div className={location.pathname === "/admin/availability" ? "flex gap-2 font-latobold py-2 px-4 bg-four rounded items-center" : "items-center flex gap-2 py-2 px-4 hover:bg-four rounded transition-colors" } >
                        {location.pathname === "/admin/availability" ? <CalendarFilled className="" /> : <CalendarOutlined className="" />}
                        <div className="md:block hidden">Disponibilité</div>
                    </div>
                </Link>
                <Link to="/admin/account">
                    <div className={location.pathname === "/admin/account" ? "flex gap-2 font-latobold py-2 px-4 bg-four rounded items-center" : "items-center flex gap-2 py-2 px-4 hover:bg-four rounded transition-colors" } >
                        {location.pathname === "/admin/account" ? <UserOutlined className="" /> : <UserOutlined className="" />}
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