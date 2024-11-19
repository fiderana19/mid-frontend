import AccountDashboard from "../../components/Dashboard/AccountDashboard";
import AccountLast from "../../components/Dashboard/AccountLast";
import AudienceChart from "../../components/Dashboard/AudienceChart";
import AudienceLast from "../../components/Dashboard/AudienceLast";
import RequestChart from "../../components/Dashboard/RequestChart";
import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";

function AdminDashboard() {

    return(
        <>
            <div className="w-full flex bg-four min-h-screen">
                <div className="md:w-52 sm:block hidden">
                    <AdminNavigation />
                </div>
                <div className=" w-full">
                    <div className="z-40 fixed top-0 right-0 w-full">
                        <Header />
                    </div>
                    <div className="md:pl-10 sm:pl-24 md:pr-5 sm:pr-10 pl-4 pr-4 pt-16 pb-5 md:w-auto min-w-max ">
                        <div className="md:flex block gap-5">
                            <div className="lg:w-3/4 md:w-1/2 w-full">
                                <div className="text-xl font-latobold mb-3">Dashboard</div>
                                <div className="lg:flex block justify-between gap-4 w-full">
                                    <div className="lg:w-1/2 w-5/6 md:h-80 md:mx-0 mx-auto">
                                        <RequestChart />
                                    </div>
                                    <div className="lg:w-1/2 w-5/6 md:h-80 lg:my-0 my-4 md:mx-0 mx-auto">
                                        <AudienceChart />
                                    </div>
                                </div>
                                <div className="text-md font-latobold mt-2">Dernière audience organisée</div>
                                <div className=" p-5 bg-white shadow-md border">
                                    <AudienceLast />
                                </div>
                            </div>
                            <div className="lg:w-1/4 md:w-1/2 w-full p-5 md:my-0 my-4 bg-white shadow-md border">
                                <div className="text-lg font-latobold">CITOYENS</div>
                                <AccountDashboard />
                                <AccountLast />
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default AdminDashboard;