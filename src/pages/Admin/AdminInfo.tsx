import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import MidLogo from '../../assets/image/mid-logo.jpg';
import { useEffect, useState } from "react";
import { getUserById } from "../../api/users";

function AdminInfo() {
    const [user, setUser] = useState();

    useEffect(() => { 
        async function fetchUser() {
          const token = localStorage.getItem("token");
  
          if(token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const response = await getUserById(decodedToken.id);
  
            setUser(response)
          }
        }
        fetchUser()
    }, [])

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
                        info admin
                        <div className="text-center">
                            <img src={MidLogo}  className="mx-auto w-40 h-40 object-cover rounded-full border border-red-200"/>
                            <div className="font-bold">EDEN Hazard</div>
                            <div className="">
                                <div className="m-2 w-96 mx-auto h-max">
                                    <div className="text-left font-bold text-gray-600">Nom et prenom(s)</div>
                                    <div className="text-right border-b-2 border-gray-500 hover:border-gray-400">eden hazard</div>
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