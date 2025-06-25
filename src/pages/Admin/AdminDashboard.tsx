import React, { lazy, Suspense } from "react";
const AccountDashboard = lazy(() => import("../../components/Dashboard/AccountDashboard"));
const AccountLast = lazy(() => import("../../components/Dashboard/AccountLast"));
const AudienceChart = lazy(() => import("../../components/Dashboard/AudienceChart"));
const AudienceLast = lazy(() => import("../../components/Dashboard/AudienceLast"));
const RequestChart = lazy(() => import("../../components/Dashboard/RequestChart"));
import { LoadingOutlined } from "@ant-design/icons";
const AdminNavigation = lazy(() => import("../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../components/Header"));

const AdminDashboard: React.FC = () => {
    return(
        <>
            <div className="w-full flex bg-four min-h-screen">
                <div className="md:w-52 sm:block hidden">
                    <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                        <AdminNavigation />
                    </Suspense>
                </div>
                <div className=" w-full">
                    <div className="z-40 fixed top-0 right-0 w-full">
                        <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                            <Header />
                        </Suspense>
                    </div>
                    <div className="md:pl-10 sm:pl-24 md:pr-5 sm:pr-10 pl-4 pr-4 pt-16 pb-5 md:w-auto min-w-max ">
                        <div className="md:flex block gap-5">
                            <div className="lg:w-3/4 md:w-1/2 w-full">
                                <div className="text-xl font-latobold mb-3">Tableau de bord</div>
                                <div className="lg:flex block justify-between gap-4 w-full">
                                    <div className="lg:w-1/2 w-5/6 md:h-80 md:mx-0 mx-auto">
                                        <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                                            <RequestChart />
                                        </Suspense>
                                    </div>
                                    <div className="lg:w-1/2 w-5/6 md:h-80 lg:my-0 my-4 md:mx-0 mx-auto">
                                        <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                                            <AudienceChart />
                                        </Suspense>
                                    </div>
                                </div>
                                <div className="text-md font-latobold mt-2">Dernière audience organisée</div>
                                <div className=" p-5 bg-white shadow-md border">
                                    <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                                        <AudienceLast />
                                    </Suspense>
                                </div>
                            </div>
                            <div className="lg:w-1/4 md:w-1/2 w-full p-5 md:my-0 my-4 bg-white shadow-md border">
                                <div className="text-lg font-latobold">CITOYENS</div>
                                <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                                    <AccountDashboard />
                                </Suspense>
                                <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                                    <AccountLast />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default AdminDashboard;