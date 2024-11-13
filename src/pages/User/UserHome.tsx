import { FunctionComponent, useEffect, useState } from "react";
import UserNavigation from "../../components/Navigation/UserNavigation";
import { getUserById } from "../../api/users";
import Typewriter from "../../components/TypeWritter";

const UserHome: FunctionComponent = () => {
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
        <div className="w-full flex flex-col justify-center h-screen">
            <UserNavigation />
            <div className="pt-16 px-20">
                {
                user && 
                    <div className="flex items-center gap-10">
                        <div className="1/4">
                            <img src={`data:image/png;base64,${user.profile_photo}`} className="w-52 h-52 object-cover border" />
                        </div>
                        <div className="w-3/4">
                            <div className="text-5xl font-bold whitespace-normal">
                                <Typewriter text={`Bonjour, ${user.nom} ${user.prenom}`} />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserHome;