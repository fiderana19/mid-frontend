import { Link } from "react-router-dom";
import UserNavigation from "../../components/Navigation/UserNavigation";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllRequestByUser } from "../../api/request";

function UserDemande() {
    const [requests, setRequests] = useState<any[]>([]);
    const [access_token, setAccessToken] = useState<string>('')

    useEffect(() => {
        async function fetchUserRequest () {
            const token = localStorage.getItem('token');
            if(token) {
                setAccessToken(token)
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const response = await getAllRequestByUser(access_token, decodedToken.id);
                if(response) {
                    setRequests(response);
                }
            }
        }
        fetchUserRequest()
    }, [])
    
    return(
        <div className="w-full">
            <UserNavigation />
            <div className="pt-16 px-10">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-bold m-4">LISTE DE VOS DEMANDES D'AUDIENCES</div>
                    <Link to="/user/add/demande">
                        <div className="flex items-center gap-2 border px-2 py-1">
                            <PlusOutlined />
                            <div>Faire une demande</div>
                        </div>
                    </Link>
                </div>
                <div className='my-7 grid gap-2 justify-center grid-cols-customized'>
                    { requests && requests.map((request, index) => {
                        return(
                            <div key={index} className="rounded bg-gray-100 w-72">
                                <div className="flex gap-2 p-2">
                                    <div className="h-9 w-9 bg-black rounded-full">
                                    </div>
                                    <div className="">
                                        <div className="font-bold">
                                            { request.type_request }
                                        </div>
                                        <div className="text-xs">
                                            soumise le { request.request_creation }
                                        </div>
                                    </div>
                                </div>
                                <div className="h-28 bg-red-400">

                                </div>
                                <div className="p-2">
                                    <div className="flex justify-end">
                                        {
                                            request.status_request[0] === "En attente" ? 
                                            <div className="rounded bg-yellow-500 px-2"> { request.status_request } </div>
                                            : (
                                                request.status_request[0] === "Accepté" ?
                                                <div className="rounded bg-green-300 px-2"> { request.status_request } </div> 
                                                :
                                                <div className="rounded bg-red-300 px-2"> { request.status_request } </div>
                                            )

                                        }
                                    </div>
                                    <div className="font-semibold"> { request.object } </div>
                                    <div className="flex gap-2">
                                        <div>Pour la semaine de </div>
                                        <div className="bg-gray-400 px-1 rounded"> { request.date_wanted_debut } </div>
                                    </div>
                                    <div className="flex justify-end mt-2 gap-2">
                                        <div className="rounded bg-blue-300 px-2">Modifier</div>
                                        <div className="rounded bg-red-300 px-2">Supprimer</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="rounded bg-gray-100 w-72">
                        <div className="flex gap-2 p-2">
                            <div className="h-9 w-9 bg-black rounded-full">
                            </div>
                            <div className="">
                                <div className="font-bold">
                                    Proposition
                                </div>
                                <div className="text-xs">
                                    soumise le 15-12-2024
                                </div>
                            </div>
                        </div>
                        <div className="h-28 bg-red-400">

                        </div>
                        <div className="p-2">
                            <div className="flex justify-end">
                                <div className="rounded bg-red-300 px-2">Refusé</div>
                            </div>
                            <div className="font-semibold">veyufvbuejvhvhrvuih hvbrivgrhirhglrihbnri</div>
                            <div className="flex gap-2">
                                <div>Pour la semaine de </div>
                                <div className="bg-gray-400 px-1 rounded">25-12-2024</div>
                            </div>
                            <div className="flex justify-end mt-2 gap-2">
                                <div className="rounded bg-blue-300 px-2">Modifier</div>
                                <div className="rounded bg-red-300 px-2">Supprimer</div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded bg-gray-100 w-72">
                        <div className="flex gap-2 p-2">
                            <div className="h-9 w-9 bg-black rounded-full">
                            </div>
                            <div className="">
                                <div className="font-bold">
                                    Proposition
                                </div>
                                <div className="text-xs">
                                    soumise le 15-12-2024
                                </div>
                            </div>
                        </div>
                        <div className="h-28 bg-red-400">

                        </div>
                        <div className="p-2">
                            <div className="flex justify-end">
                                <div className="rounded bg-red-300 px-2">Refusé</div>
                            </div>
                            <div className="font-semibold">veyufvbuejvhvhrvuih hvbrivgrhirhglrihbnri</div>
                            <div className="flex gap-2">
                                <div>Pour la semaine de </div>
                                <div className="bg-gray-400 px-1 rounded">25-12-2024</div>
                            </div>
                            <div className="flex justify-end mt-2 gap-2">
                                <div className="rounded bg-blue-300 px-2">Modifier</div>
                                <div className="rounded bg-red-300 px-2">Supprimer</div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded bg-gray-100 w-72">
                        <div className="flex gap-2 p-2">
                            <div className="h-9 w-9 bg-black rounded-full">
                            </div>
                            <div className="">
                                <div className="font-bold">
                                    Proposition
                                </div>
                                <div className="text-xs">
                                    soumise le 15-12-2024
                                </div>
                            </div>
                        </div>
                        <div className="h-28 bg-red-400">

                        </div>
                        <div className="p-2">
                            <div className="flex justify-end">
                                <div className="rounded bg-red-300 px-2">Refusé</div>
                            </div>
                            <div className="font-semibold">veyufvbuejvhvhrvuih hvbrivgrhirhglrihbnri</div>
                            <div className="flex gap-2">
                                <div>Pour la semaine de </div>
                                <div className="bg-gray-400 px-1 rounded">25-12-2024</div>
                            </div>
                            <div className="flex justify-end mt-2 gap-2">
                                <div className="rounded bg-blue-300 px-2">Modifier</div>
                                <div className="rounded bg-red-300 px-2">Supprimer</div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded bg-gray-100 w-72">
                        <div className="flex gap-2 p-2">
                            <div className="h-9 w-9 bg-black rounded-full">
                            </div>
                            <div className="">
                                <div className="font-bold">
                                    Proposition
                                </div>
                                <div className="text-xs">
                                    soumise le 15-12-2024
                                </div>
                            </div>
                        </div>
                        <div className="h-28 bg-red-400">

                        </div>
                        <div className="p-2">
                            <div className="flex justify-end">
                                <div className="rounded bg-red-300 px-2">Refusé</div>
                            </div>
                            <div className="font-semibold">veyufvbuejvhvhrvuih hvbrivgrhirhglrihbnri</div>
                            <div className="flex gap-2">
                                <div>Pour la semaine de </div>
                                <div className="bg-gray-400 px-1 rounded">25-12-2024</div>
                            </div>
                            <div className="flex justify-end mt-2 gap-2">
                                <div className="rounded bg-blue-300 px-2">Modifier</div>
                                <div className="rounded bg-red-300 px-2">Supprimer</div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded bg-gray-100 w-72">
                        <div className="flex gap-2 p-2">
                            <div className="h-9 w-9 bg-black rounded-full">
                            </div>
                            <div className="">
                                <div className="font-bold">
                                    Proposition
                                </div>
                                <div className="text-xs">
                                    soumise le 15-12-2024
                                </div>
                            </div>
                        </div>
                        <div className="h-28 bg-red-400">

                        </div>
                        <div className="p-2">
                            <div className="flex justify-end">
                                <div className="rounded bg-red-300 px-2">Refusé</div>
                            </div>
                            <div className="font-semibold">veyufvbuejvhvhrvuih hvbrivgrhirhglrihbnri</div>
                            <div className="flex gap-2">
                                <div>Pour la semaine de </div>
                                <div className="bg-gray-400 px-1 rounded">25-12-2024</div>
                            </div>
                            <div className="flex justify-end mt-2 gap-2">
                                <div className="rounded bg-blue-300 px-2">Modifier</div>
                                <div className="rounded bg-red-300 px-2">Supprimer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDemande;