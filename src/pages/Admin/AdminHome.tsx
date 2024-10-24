import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import Typewriter from "../../components/TypeWritter";

function AdminHome() {
    return(
        <>
            <div className="w-full flex">
                <div className="p-4 w-1/6 flex flex-col justify-between h-screen bg-green-900 text-center">
                    <AdminNavigation />
                </div>
                <div className="w-5/6">
                <Header />
                <div className="p-4">
                    ato lah ry admin a
                    <Typewriter text={`Bonjour Mr Administrateur`} />
                </div>
                </div>
            </div>
        </>
    )
}

export default AdminHome; 