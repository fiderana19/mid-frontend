import { useState, useEffect } from "react";
import { getUserById } from "../../api/users";
import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import Typewriter from "../../components/TypeWritter";

function AdminHome() {
    const [user, setUser] = useState<any>();

    useEffect(() => { 
        async function fetchUser() {
          const token = localStorage.getItem("token");
  
          if(token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const response = await getUserById(token,decodedToken.id);
  
            setUser(response)
          }
        }
        fetchUser()
    }, [])
  
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
                    {
                        user && 
                        <div className="px-10 flex items-center gap-10">
                            <div className="1/4">
                                <img src={`data:image/png;base64,${user.profile_photo}`} className="w-52 h-52 object-cover" />
                            </div>
                            <div className="w-3/4">
                                <div className="text-5xl font-bold whitespace-normal">
                                    <Typewriter text={`Bonjour, ${user.nom} ${user.prenom} hubhiubnibgjibn vnbujnbirbn i`} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>  
        </>
    )
}

export default AdminHome; 
