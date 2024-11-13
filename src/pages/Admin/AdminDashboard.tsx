import AccountDashboard from "../../components/Dashboard/AccountDashboard";
import AccountLast from "../../components/Dashboard/AccountLast";
import AudienceChart from "../../components/Dashboard/AudienceChart";
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
                    <div className="pl-10 pr-5 pt-16 pb-5">
                        <div className="flex gap-10">
                            <div className="w-3/4">
                                <div className="text-xl font-bold mb-3">Dashboard</div>
                                <div className="flex justify-between">
                                    <div className="w-5/12">
                                        <RequestChart />
                                    </div>
                                    <div className="w-5/12">
                                        <AudienceChart />
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/4 p-5 bg-white">
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