import UserNavigation from "../../components/Navigation/UserNavigation";
import MidLogo from '../../assets/image/mid-logo.jpg';
import { useState, useEffect } from "react";
import { getUserById } from "../../api/users";
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function UserInfo() {
    const [user, setUser] = useState<any>();
    const navigate = useNavigate();

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
        <div className="w-full min-h-screen bg-four">
            <UserNavigation />
            <div className="sm:px-10 px-4 pt-16 pb-5 w-full">
                    <div className="font-latobold text-lg mb-6">Votre profile</div>
                        {
                            user && 
                            <div>
                                <div className="gap-2 sm:flex block justify-between w-full">
                                    <div className="sm:w-2/4 w-full">
                                        <div className=" border pt-6 rounded text-center shadow-md">
                                            <img src={`data:image/png;base64,${user.profile_photo}`} alt="" className="w-48 h-48  object-cover mx-auto border" />
                                            <div className="font-bold text-lg">{ user.nom } { user.prenom }</div>
                                            <div className="mx-auto w-full bg-gray-200 px-8 py-1">
                                                <div className="flex gap-4 my-2">
                                                    <EnvironmentOutlined />
                                                    <div>{ user.adresse }</div>
                                                </div>
                                                <div className="flex gap-4 my-2">
                                                    <MailOutlined />
                                                    <div>{ user.email }</div>
                                                </div>
                                                <div className="flex gap-4 my-2">
                                                    <PhoneOutlined />
                                                    <div>+261{ user.telephone }</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border rounded p-4 my-2 shadow-md bg-white">
                                            <div className="font-latobold text-md mb-3">Info</div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Date de création</div>
                                                <div className="font-latobold">{ user.user_creation }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:w-2/4 w-full" >
                                        <div className="border rounded p-4 shadow-md bg-white">
                                            <div className="font-latobold text-md mb-3">Naissance</div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Date de naissance</div>
                                                <div className="font-latobold">{ user.date_naissance }</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Lieu de naissance</div>
                                                <div className="font-latobold">{ user.lieu_naissance }</div>
                                            </div>
                                        </div>
                                        <div className="border rounded p-4 sm:my-5 my-2 shadow-md bg-white">
                                            <div className="font-latobold text-md mb-3">Identité Nationale</div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">CIN</div>
                                                <div className="font-latobold">{ user.cni }</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Date de délivrance</div>
                                                <div className="font-latobold">{ user.date_cni }</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Lieu</div>
                                                <div className="font-latobold">{ user.lieu_cni }</div>
                                            </div>
                                        </div>
                                        <div className="border rounded p-4 my-2 shadow-md bg-white">
                                            <div className="font-latobold text-md mb-3">Actions</div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Changer le mot de passe</div>
                                                <button 
                                                    onClick={() => {navigate("/user/change/password")}}
                                                    className='bg-gray-500 border border-gray-600 hover:transition-colors hover:bg-gray-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500'
                                                >
                                                    Changer le mot de passe</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        }
            </div>
        </div>
    )
}

export default UserInfo;