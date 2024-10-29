import { Calendar } from "antd";
import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";

function AdminAvailability() {
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
                        disponibilite admin
                        <div className="h-80 w-full">
                            <Calendar className="" style={{ height: 800 }} />
                        </div>
                    </div>
                </div>
            </div>            
        </>
    )
}

export default AdminAvailability;