import { useState, useEffect, lazy, Suspense } from "react";
import { getNotOrganizedRequest } from "../../../api/request";
const AdminNavigation = lazy(() => import("../../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../../components/Header"));
import { CarryOutOutlined, CloseOutlined, LoadingOutlined, MenuOutlined } from "@ant-design/icons";
import { MenuProps, Dropdown, Input } from "antd";
import { Link } from "react-router-dom";

function AdminFailRequest() {
    const [requests, setRequests] = useState<any[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<any>();
    const [searchRef, setSearchRef] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
            const response = await getNotOrganizedRequest(token);
            if(response) {
                setIsLoading(false);
                setRequests(response);
            }
        }
    }


    const items: MenuProps['items'] = [
        {
            label:  <Link to={`/admin/organize/audience/${selectedRequest?._id}`} >
                      <div className="flex gap-2">
                          <CarryOutOutlined  />
                          <div>Organiser</div>
                      </div>
                  </Link>,
            key: '0',
          },  
      ];

    //handling the keypress
    const handleKeyPress =async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = e.which || e.keyCode;

        if (charCode < 48 || charCode > 57) {
        e.preventDefault();
        }
    }
    
    return(
        <>
            <div className="w-full flex min-h-screen bg-four">
                <div className="md:w-52 sm:block hidden">
                    <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                        <AdminNavigation />
                    </Suspense>
                </div>
                <div className="w-full">
                    <div className="z-40 fixed top-0 right-0 w-full">
                        <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                            <Header />
                        </Suspense>
                    </div>
                    <div className="pl-10 pr-5 py-16">
                        <div className="flex justify-between items-center mt-4 mb-6">
                            <div className="text-lg font-latobold ">Les demandes acceptés non oragnisées</div>
                            <div className="flex items-center gap-1">
                                <Input name="filter" type="text" className="h-8 py-1" placeholder="Saisir le CIN..."  value={searchRef} onChange={(e) => setSearchRef(e.target.value)} onKeyPress={handleKeyPress}  />
                            </div>
                        </div>
                        <table className='w-full divide-y divide-gray-200'>
                            <thead>
                                <tr>
                                    <th className='md:px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom et prenom(s)</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>CIN</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Date de soumission</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Semaine preferé</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                    <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                                </tr>
                            </thead> 
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {
                                    requests && requests.map((request, index) => {
                                        if (searchRef && !request.user_cni.includes(searchRef)) {
                                            return null;
                                        }
                                        return(
                                            <tr key={index}>
                                                <td className='md:px-6 py-1 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>
                                                    <img src={`data:image/png;base64,${request.profile_photo}`} className="min-w-max rounded-full border border-slate-400 w-9 h-9 object-cover" />
                                                </td>
                                                <td className='md:px-6 pr-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { request.user_nom } { request.user_prenom }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { request.user_cni }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { request.type_request }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { request.request_creation }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { request.date_wanted_debut } à { request.date_wanted_end }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                    {
                                                        request.status_request[0] === "En attente" ?
                                                        <div className="max-w-max">
                                                            <div className="flex items-center bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                                                                { request.status_request }
                                                            </div>   
                                                        </div>                                     
                                                        : (
                                                            request.status_request[0] === "Accepté" ?
                                                            <div className="max-w-max">
                                                                <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                                    { request.status_request }
                                                                </div>        
                                                            </div>                                                                        
                                                            :
                                                            <div className="max-w-max">
                                                                <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                    <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                                                    { request.status_request }
                                                                </div>     
                                                            </div>                                                                           
                                                        )
                                                    } 
                                                </td>
                                                <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                                                    <div className='flex justify-center'>
                                                        <Dropdown className="p-2 rounded hover:bg-gray-200 cursor-pointer" menu={{ items }} trigger={['click']}>
                                                            <a onClick={(e) => {e.preventDefault(); setSelectedRequest(request);}}>
                                                                <MenuOutlined />
                                                            </a>
                                                        </Dropdown>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        {                          
                            (!isLoading && requests && requests.length < 1) &&
                                <div className="mx-auto flex justify-center w-full my-4 text-gray-500">
                                    <div className="text-center">
                                        <CloseOutlined className="text-5xl" />
                                        <div className="my-2">
                                        Aucune demande
                                        </div>
                                    </div>
                                </div>
                        }
                        {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminFailRequest;