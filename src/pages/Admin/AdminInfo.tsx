import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import MidLogo from '../../assets/image/mid-logo.jpg';

function AdminInfo() {
    return(
        <>
             <div className="w-full flex">
                <div className="p-4 w-1/6 flex flex-col justify-between h-screen bg-green-900 text-center">
                    <AdminNavigation />
                </div>
                <div className="w-5/6">
                    <Header />
                    <div className="p-4">
                        info admin
                        <div className="text-center">
                            <img src={MidLogo}  className="mx-auto w-40 h-40 object-cover rounded-full border border-red-200"/>
                            <div className="">
                                <div className="m-2 border border-b-black flex justify-between w-96 mx-auto h-max">
                                    <div className="font-bold text-gray-600">Nom</div>
                                    <div>eden hazard</div>
                                </div>
                                <div className="m-2 border border-b-black flex justify-between w-96 mx-auto h-max">
                                    <div className="font-bold text-gray-600">Nom</div>
                                    <div>eden hazard</div>
                                </div>

                                <div className="m-2 border border-b-black flex justify-between w-96 mx-auto h-max">
                                    <div className="font-bold text-gray-600">Nom</div>
                                    <div>eden hazard</div>
                                </div>

                                <div className="m-2 border border-b-black flex justify-between w-96 mx-auto h-max">
                                    <div className="font-bold text-gray-600">Nom</div>
                                    <div>eden hazard</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminInfo;