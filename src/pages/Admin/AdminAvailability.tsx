import { Calendar } from "antd";
import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";

function AdminAvailability() {
    return(
        <>
            <div className="w-full flex">
                <div className="p-4 w-1/6 flex flex-col justify-between h-screen bg-green-900 text-center">
                    <AdminNavigation />
                </div>
                <div className="w-5/6">
                    <Header />
                    <div className="p-4">
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