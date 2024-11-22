import { FunctionComponent, useEffect, useState } from "react";
import UserNavigation from "../../components/Navigation/UserNavigation";
import { getUserById } from "../../api/users";
import Typewriter from "../../components/TypeWritter";
import Ministre from '../../assets/image/ministre.jpg';
import { ministre } from "../../constants/Ministre";

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
        <div className="w-full flex flex-col justify-center bg-four min-h-screen">
            <UserNavigation />
            <div className="pt-16 sm:px-20 px-4">
                {
                user && 
                    <div className="sm:flex block items-center gap-5">
                        <div className="sm:w-1/4 w-full">
                            <img src={`data:image/png;base64,${user.profile_photo}`} className="w-52 h-52 object-cover border mx-auto" />
                        </div>
                        <div className="sm:w-2/4 w-full sm:text-left text-center sm:my-0 my-4">
                            <div className="text-5xl font-bold whitespace-normal">
                                <Typewriter text={`Bonjour, ${user.nom} ${user.prenom}`} />
                            </div>
                        </div>
                        <div className="sm:w-1/4 w-full bg-white shadow-md rounded">
                            <img src={Ministre} className="w-full object-cover border mx-auto" />
                            <div className="p-2">
                                <div className="text-center text-lg font-latobold"> Madame { ministre.nom } {ministre.prenom}</div>
                                <div className="text-center text-md text-gray-800"> Ministre de l'Intérieur</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserHome;