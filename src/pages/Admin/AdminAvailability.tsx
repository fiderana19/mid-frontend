import { Calendar } from "antd";
import Header from "../../components/Header";

function AdminAvailability() {
    return(
        <>
            <Header />
            disponibilite admin
            <div className="h-80 w-full">
                <Calendar className="" style={{ height: 800 }} />
            </div>
        </>
    )
}

export default AdminAvailability;