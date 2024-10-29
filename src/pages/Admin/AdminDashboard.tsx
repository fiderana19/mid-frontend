import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";

function AdminDashboard() {
    return(
        <>
            <div className="w-full flex">
                <div className="w-1/6">
                    <AdminNavigation />
                </div>
                <div className="w-5/6">
                    <div className="z-50 fixed top-0 right-0 w-5/6">
                        <Header />
                    </div>
                    <div className="px-5 py-16">
                        <div className="p-4">
                            admin dashboard
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default AdminDashboard;