import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import Typewriter from "../../components/TypeWritter";

function AdminHome() {
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
                            ato lah ry admin a
                            <Typewriter text={`Bonjour Mr Administrateur`} />
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default AdminHome; 
