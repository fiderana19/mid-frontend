import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import { getAllAudience } from '../../api/audience';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminAudience() {
    const [requests, setRequests] = useState<any[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<string>();
    const [isDenyModalVisible, setIsDenyModalVisible] = useState(false);
    const [isValidateModalVisible, setIsValidateModalVisible] = useState(false);
    const navigate = useNavigate();
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    );

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            setAccessToken(token);
        }
        fetchUserRequest()
    }, [])

    async function fetchUserRequest () {
        const token = localStorage.getItem('token');
        if(token) {
            const response = await getAllAudience();
            if(response) {
                console.log("reto lty ar", response)
            }
        }
    }

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
                        <div className="flex justify-between">
                            <div className="text-lg font-bold mb-4">LISTE DES AUDIENCES</div>
                        </div>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead>
                                <tr>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom et prenom(s)</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>CNI</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Motif</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Debut</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Fin</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                    <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                                </tr>
                            </thead> 
                            <tbody className='bg-white divide-y divide-gray-200'>
                                <tr>
                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.titre_niveau  </td>
                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.descri_niveau  </td>
                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.domaine  </td>
                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.parcours  </td>
                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.titre_niveau  </td>
                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.titre_niveau  </td>
                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.titre_niveau  </td>
                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.titre_niveau  </td>
                                    <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                                    <div className='flex justify-center'>
                                    </div>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                        </div>
                </div>
            </div>
        </>
    )
}

export default AdminAudience;

