import AccountDashboard from "../../components/Dashboard/AccountDashboard";
import AccountLast from "../../components/Dashboard/AccountLast";
import AudienceChart from "../../components/Dashboard/AudienceChart";
import RequestChart from "../../components/Dashboard/RequestChart";
import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";

function AdminDashboard() {


    return(
        <>
            <div className="w-full flex">
                <div className="md:w-52 sm:block hidden">
                    <AdminNavigation />
                </div>
                <div className="flex flex-col h-screen justify-center">
                    <div className="z-40 fixed top-0 right-0 w-full">
                        <Header />
                    </div>
                    <div className="pt-12 h-screen">
                        <div className="flex h-full">
                            <div className="w-3/4 bg-gray-300 p-10">
                                <div className="text-xl font-bold">Dashboard</div>
                                <div className="flex justify-between">
                                    <div className="w-5/12">
                                        <RequestChart />
                                    </div>
                                    <div className="w-5/12">
                                        <AudienceChart />
                                    </div>
                                </div>
                            </div>
                            <div className="h-full w-1/4 p-5 bg-gray-400">
                                <div className="text-lg font-bold">CITOYENS</div>
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