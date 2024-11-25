import { useState, useEffect } from "react";
import { denyRequest, getAllRequest, validateRequest } from "../../api/request";
import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, DownOutlined, EyeOutlined, FilterOutlined, LoadingOutlined, MenuOutlined, WarningFilled } from "@ant-design/icons";
import { MenuProps, Dropdown, Modal, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

function AdminDemande() {
    const [requests, setRequests] = useState<any[]>([]);
    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filteredRequests, setFilteredRequests] = useState<any[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<any>();
    const [isDenyModalVisible, setIsDenyModalVisible] = useState(false);
    const [isValidateModalVisible, setIsValidateModalVisible] = useState(false);
    const navigate = useNavigate();
    const [filterRef, setFilterRef] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<string>('');
    const [searchRef, setSearchRef] = useState<string>('');
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
            const response = await getAllRequest(token);
            if(response) {
                setIsLoading(false);
                setRequests(response);
            }
        }
    }


    const items: MenuProps['items'] = [
        {
            label:  <Link to={`/admin/demande/view/${selectedRequest?._id}`} >
                      <div className="flex gap-2">
                          <EyeOutlined  />
                          <div>Voir</div>
                      </div>
                  </Link>,
            key: '0',
          },
        {
          type: 'divider',
        },
        {
          label: <button disabled={(selectedRequest?.status_request[0] === "Refusé" || selectedRequest?.status_request[0] === "Accepté") ? true : false}>
                    <div onClick={() => setIsValidateModalVisible(true)} className={(selectedRequest?.status_request[0] === "Refusé" || selectedRequest?.status_request[0] === "Accepté") ? "flex gap-2 cursor-not-allowed text-gray-400" : "flex gap-2" }>
                        <CheckCircleOutlined  />
                        <div>Approuver</div>
                    </div>
                </button>
          ,
          key: '3',
        },
        {
            label: <button disabled={(selectedRequest?.status_request[0] === "Refusé" || selectedRequest?.status_request[0] === "Accepté") ? true : false}>
                    <div onClick={() => setIsDenyModalVisible(true)} className={(selectedRequest?.status_request[0] === "Refusé" || selectedRequest?.status_request[0] === "Accepté") ? "flex gap-2 cursor-not-allowed text-gray-400" : "flex gap-2" }>
                    <CloseCircleOutlined  />
                    <div>Refuser</div>
                </div>
            </button>
            ,
            key: '4',
          },
  
      ];

      const filter: MenuProps['items'] = [
        {
            label:  <div onClick={() => setFilterRef(false)} className="px-4">
                      Tout                    
                    </div>,
            key: '3',
        },
        {
          label:  <div onClick={() => filterAccounts('En attente')} className="px-4">
                    En attente                    
                    </div>,
          key: '0',
        },
        {
            label:  <div onClick={() => filterAccounts('Accepté')} className="px-4">
                      Accepté                    
                    </div>,
            key: '1',
        },
        {
            label:  <div onClick={() => filterAccounts('Refusé')} className="px-4">
                      Refusé                    
                    </div>,
            key: '2',
        },
      ];

    async function filterAccounts (filter: string) {
        setFilterRef(true);
        setFilterText(filter);
        const acc = requests.filter(requests => requests.status_request[0] === filter);
        setFilteredRequests(acc);
    }
      

    const handleDenyConfirm = async () => {
        setApiLoading(true);
        if(selectedRequest) {
            const response = await denyRequest(access_token,selectedRequest?._id);
            if(response?.status === 200 || response?.status === 201) {
                fetchUserRequest();        
                setApiLoading(false);
                message.success("Demande refusée !")
                setIsDenyModalVisible(false);
            }
        }
    }
    //handling delete cancel
    const handleDenyCancel = async () => {
        setIsDenyModalVisible(false)
    }
    const showDenyConfirmation = async () => {
        setIsDenyModalVisible(true);
    }   
    
    const handleValidateConfirm = async () => {
        setApiLoading(true);
        if(selectedRequest) {
            const response = await validateRequest(access_token,selectedRequest?._id);
            if(response?.status === 200 || response?.status === 201) {
                fetchUserRequest();
                setApiLoading(false);
                message.success("Demande approuvée !");
                setIsValidateModalVisible(false);    
                navigate(`/admin/organize/audience/${selectedRequest?._id}`);
            }    
        }
    }
    //handling delete cancel
    const handleValidateCancel = async () => {
        setIsValidateModalVisible(false)
    }

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
                    <AdminNavigation />
                </div>
                <div className="w-full">
                    <div className="z-40 fixed top-0 right-0 w-full">
                        <Header />
                    </div>
                    <div className="pl-10 pr-5 py-16">
                        <div className="flex justify-between items-center mt-4 mb-6">
                            <div className="text-lg font-latobold ">Les demandes d'audience</div>
                            <div className="flex items-center gap-1">
                                <Input name="filter" type="text" className="h-8 py-1" placeholder="Saisir le CIN..."  value={searchRef} onChange={(e) => setSearchRef(e.target.value)} onKeyPress={handleKeyPress}  />
                                <Dropdown className="rounded hover:bg-gray-200 cursor-pointer" menu={{ items: filter }} trigger={['click']}>
                                    <a onClick={(e) => {e.preventDefault()}}>
                                        <button className='bg-gray-500 bg-opacity-70 hover:bg-gray-700 hover:bg-opacity-70 text-white flex font-latobold py-1 px-3 rounded items-center gap-1'>
                                            <FilterOutlined className="text-md mr-1"/>
                                            {
                                                (filterRef && filterText) ?
                                                <div className="min-w-max"> {filterText} </div>
                                                :
                                                <div className="min-w-max">Filtrer</div>
                                            }
                                            <DownOutlined />
                                        </button>
                                    </a>
                                </Dropdown>
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
                            <tbody className='bg-white divide-y divide-gray-200 w-full'>
                                {
                                    filterRef ? 
                                    filteredRequests && filteredRequests.map((request, index) => {
                                        if (searchRef && !request.user_cni.includes(searchRef)) {
                                            return null;
                                        }
                                        return(
                                            <tr key={index}>
                                                <td className='md:px-6 py-1  lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>
                                                    <img src={`data:image/png;base64,${request.profile_photo}`} className="rounded-full border min-w-max border-slate-400 w-9 h-9 object-cover" />
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
                                                            <a onClick={(e) => {e.preventDefault(); setSelectedRequest(request)}}>
                                                                <MenuOutlined />
                                                            </a>
                                                        </Dropdown>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    requests && requests.map((request, index) => {
                                        if (searchRef && !request.user_cni.includes(searchRef)) {
                                            return null;
                                        }
                                        return(
                                            <tr key={index}>
                                                <td className='md:px-6 py-1 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>
                                                    <img src={`data:image/png;base64,${request.profile_photo}`} className="rounded-full min-w-max border border-slate-400 w-9 h-9 object-cover" />
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
                                                            <a onClick={(e) => {e.preventDefault(); setSelectedRequest(request); console.log(selectedRequest)}}>
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
                <Modal title="Refus d'une demande" 
                    open={isDenyModalVisible}
                    onOk={handleDenyConfirm}
                    onCancel={handleDenyCancel}
                    onClose={handleDenyCancel}
                    footer={null}
                >
                    <div>
                        <WarningFilled className='mr-2 text-red-500 text-xl' />  
                        Êtes-vous sûr de vouloir refuser ce demande d'audience ?
                        <div className='flex justify-end gap-2'>
                            <button 
                                onClick={handleDenyCancel}
                                className="border mt-2 hover:bg-gray-100 py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >   
                                Annuler
                            </button>
                            <button 
                                onClick={handleDenyConfirm}
                                disabled={ apiLoading ? true : false }
                                className= { apiLoading ? "bg-red-400 cursor-not-allowed flex gap-2 items-center border mt-2 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-red-500" : "flex gap-2 items-center border mt-2 bg-red-500 hover:border-red-600 hover:bg-red-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-red-500" } 
                            >   
                                { apiLoading && <LoadingOutlined /> }
                                <div>Refuser</div>
                            </button>
                        </div>
                    </div>
                </Modal>
                <Modal title="Approbation d'une demande" 
                    open={isValidateModalVisible}
                    onOk={handleValidateConfirm}
                    onCancel={handleValidateCancel}
                    onClose={handleValidateCancel}
                    footer={null}
                >
                    <div>
                        <WarningFilled className='mr-2 text-green-500 text-xl' />  
                        Êtes-vous sûr de vouloir approuver ce demande d'audience ?
                        <div className='flex justify-end gap-2'>
                            <button 
                                onClick={handleValidateCancel}
                                className="border mt-2 hover:bg-gray-100 py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >   
                                Annuler
                            </button>
                            <button 
                                onClick={handleValidateConfirm}
                                disabled={ apiLoading ? true : false }
                                className= { apiLoading ? "bg-green-400 cursor-not-allowed flex gap-2 items-center border mt-2 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500" : "flex gap-2 items-center border mt-2 bg-green-500 hover:border-green-600 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500" } 
                            >   
                                { apiLoading && <LoadingOutlined /> }
                                <div>Approuver</div>
                            </button>
                        </div> 
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminDemande;