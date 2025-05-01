import { FunctionComponent, lazy, Suspense, useEffect, useState } from "react";
import { getUserById } from "../../api/users";
const Typewriter = lazy(() => import("../../components/TypeWritter"));
const UserNavigation = lazy(() => import("../../components/Navigation/UserNavigation"));
import Ministre from '../../assets/image/ministre.jpg';
import { LoadingOutlined } from "@ant-design/icons";

const UserHome: FunctionComponent = () => {
    const [user, setUser] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const Ministre_Firstname = `${import.meta.env.VITE_MINISTRE_FIRSTNAME}`;
    const Ministre_Lastname = `${import.meta.env.VITE_MINISTRE_LASTNAME}`;

    useEffect(() => { 
        async function fetchUser() {
          const token = localStorage.getItem("token");
  
          if(token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const response = await getUserById(decodedToken.id);
            setIsLoading(false);

            setUser(response.data)
          }
        }
        fetchUser()
    }, [])


    return(
        <div className="w-full flex flex-col justify-center bg-four min-h-screen">
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <UserNavigation />
            </Suspense>
            <div className="pt-16 lg:px-20 px-4">
                {
                user && 
                    <div className="md:flex block items-center lg:gap-5 gap-2 md:my-0 my-4">
                        <div className="md:w-1/4 w-full">
                            <img src={`data:image/png;base64,${user.profile_photo}`} className="w-52 h-52 object-cover border mx-auto" />
                        </div>
                        <div className="md:w-2/4 w-full md:text-left text-center md:my-0 my-4">
                            <div className="sm:text-5xl text-2xl font-bold whitespace-normal">
                                <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                                    <Typewriter text={`Bonjour, ${user.nom} ${user.prenom}`} />
                                </Suspense>
                            </div>
                        </div>
                        <div className="md:w-1/4 w-full">
                            <div className="sm:w-2/3 md:w-full w-full bg-white shadow-md rounded mx-auto">
                                <img src={Ministre} className="w-full object-cover border mx-auto" />
                                <div className="p-2">
                                    <div className="text-center text-lg font-latobold"> Madame { Ministre_Firstname } { Ministre_Lastname }</div>
                                    <div className="text-center text-md text-gray-800"> Ministre de l'Intérieur</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
            </div>
        </div>
    )
}

export default UserHome;