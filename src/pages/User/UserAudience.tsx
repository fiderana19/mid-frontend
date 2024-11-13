import { useState, useEffect } from "react";
import { getAudienceByUser } from "../../api/audience";
import UserNavigation from "../../components/Navigation/UserNavigation";

function UserAudience() {
    const [audiences, setAudiences] = useState<any[]>([]);
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    )

    useEffect(() => {
        
        fetchUserRequest()
    }, [])

    async function fetchUserRequest () {
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token)
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const response = await getAudienceByUser(access_token, decodedToken.id);
            if(response) {
                console.log(response)
                setAudiences(response.data);
            }
        }
    }

    return(
        <div className="w-full">
            <UserNavigation />
            <div className="pt-16 px-20">
                <div className="text-lg font-bold my-4">LISTE DE VOS AUDIENCES</div>
                <div className='my-7 grid gap-2 justify-center grid-cols-customized'>
                    <div className="rounded bg-gray-100 w-72">
                        <div className="flex bg-gray-400 justify-between items-center p-2">
                            <div>
                                <div className="flex gap-2">
                                    <div> Date : </div>
                                    <div className="">25-12-2024</div>
                                </div>
                                <div className="flex gap-2">
                                    <div> De  </div>
                                    <div className="font-bold">08:00</div>
                                    <div> à  </div>
                                    <div className="font-bold">10:00</div>
                                </div>
                            </div> 
                            <div className="flex justify-end">
                                <div className="rounded bg-red-300 px-2">Refusé</div>
                            </div>
                        </div>
                            
                        <div className="h-28 bg-red-400">
                        </div>
                        <div className="p-2">
                            <div className="text-lg font-bold">Proposition</div>
                            <div className="font-semibold">veyufvbuejvhvhrvuih hvbrivgrhirhglrihbnri</div>
                            <div className="flex justify-end mt-2 gap-2">
                                <div className="rounded bg-blue-300 px-2">QR CODE</div>
                            </div>
                        </div>
                    </div>
               
                </div>
            </div>
        </div>
    )
}

export default UserAudience;