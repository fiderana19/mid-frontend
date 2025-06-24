import React, { useState, Suspense, lazy } from "react";
const AdminNavigation = lazy(() => import("../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../components/Header"));
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, DownOutlined, EyeOutlined, FilterOutlined, LoadingOutlined, MenuOutlined, WarningFilled } from "@ant-design/icons";
import { MenuProps, Dropdown, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { HttpStatus } from "../../constants/Http_status";
import { useGetAllRequest } from "@/hooks/useGetAllRequest";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Status from "@/components/status/Status";
import { useDenyRequest } from "@/hooks/useDenyRequest";
import { useValidateRequest } from "@/hooks/useValidateRequest";

const AdminDemande: React.FC = () => {
    const { data: requests, isLoading: requestsLoading, refetch }  = useGetAllRequest();
    const { mutateAsync: denyRequest, isPending: denyLoading } = useDenyRequest({action() {
        refetch()
    },});
    const { mutateAsync: validateRequest, isPending: validateLoading } = useValidateRequest({action() {
        refetch()
    },});
    const [filteredRequests, setFilteredRequests] = useState<any[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<any>();
    const [isDenyModalVisible, setIsDenyModalVisible] = useState(false);
    const [isValidateModalVisible, setIsValidateModalVisible] = useState(false);
    const navigate = useNavigate();
    const [filterRef, setFilterRef] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<string>('');
    const [searchRef, setSearchRef] = useState<string>('');

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
        const acc = requests.filter((requests: any) => requests.status_request[0] === filter);
        setFilteredRequests(acc);
    }
      
    const handleDenyConfirm = async () => {
        if(selectedRequest) {
            const response = await denyRequest(selectedRequest?._id);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                setIsDenyModalVisible(false);
            }
        }
    }

    const handleDenyCancel = async () => {
        setIsDenyModalVisible(false)
    }

    const handleValidateConfirm = async () => {
        if(selectedRequest) {
            const response = await validateRequest(selectedRequest?._id);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                setIsValidateModalVisible(false);    
                navigate(`/admin/organize/audience/${selectedRequest?._id}`);
            }    
        }
    }

    const handleValidateCancel = async () => {
        setIsValidateModalVisible(false)
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
                            <div className="text-lg font-latobold ">Les demandes d'audience</div>
                            <div className="flex items-center gap-1">
                                <Input name="filter" type="text" placeholder="Saisir le CIN..."  value={searchRef} onChange={(e) => setSearchRef(e.target.value)} onKeyPress={handleNumberKeyPress}  />
                                <Dropdown className="rounded hover:bg-gray-200 cursor-pointer" menu={{ items: filter }} trigger={['click']}>
                                    <a onClick={(e) => {e.preventDefault()}}>
                                        <Button>
                                            <FilterOutlined className="text-md mr-1"/>
                                            {
                                                (filterRef && filterText) ?
                                                <div className="min-w-max"> {filterText} </div>
                                                :
                                                <div className="min-w-max">Tout</div>
                                            }
                                            <DownOutlined />
                                        </Button>
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
                                                        <Status type="alert" data={`${request.status_request}`} />
                                                        : (
                                                            request.status_request[0] === "Accepté" ?
                                                            <Status type="success" data={`${request.status_request}`} />
                                                            :
                                                            <Status type="danger" data={`${request.status_request}`} />
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
                                    requests && requests.map((request: any, index: any) => {
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
                                                        <Status type="alert" data={`${request.status_request}`} />
                                                        : (
                                                            request.status_request[0] === "Accepté" ?
                                                            <Status type="success" data={`${request.status_request}`} />
                                                            :
                                                            <Status type="danger" data={`${request.status_request}`} />
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
                            (!requestsLoading && requests && requests.length < 1) &&
                                <div className="mx-auto flex justify-center w-full my-4 text-gray-500">
                                    <div className="text-center">
                                        <CloseOutlined className="text-5xl" />
                                        <div className="my-2">
                                        Aucune demande
                                        </div>
                                    </div>
                                </div>
                        }
                        {                          
                            (!requestsLoading && filterRef && filteredRequests.length < 1) &&
                                <div className="mx-auto flex justify-center w-full my-4 text-gray-500">
                                    <div className="text-center">
                                        <CloseOutlined className="text-5xl" />
                                        <div className="my-2">
                                        Aucune demande
                                        </div>
                                    </div>
                                </div>
                        }
                        {requestsLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
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
                        <div className='flex justify-end gap-2 mt-2'>
                            <Button
                                variant={'secondary'} 
                                onClick={handleDenyCancel}
                            >   
                                Annuler
                            </Button>
                            <Button
                                variant={'destructive'} 
                                onClick={handleDenyConfirm}
                                disabled={ denyLoading ? true : false }
                                className={`${ denyLoading ? 'cursor-not-allowed' : '' }`}
                            >   
                                { denyLoading && <LoadingOutlined className="text-xs" /> }
                                <div>Refuser</div>
                            </Button>
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
                        <div className='flex justify-end gap-2 mt-2'>
                            <Button 
                                variant={'secondary'}
                                onClick={handleValidateCancel}
                            >   
                                Annuler
                            </Button>
                            <Button 
                                variant={'success'}
                                onClick={handleValidateConfirm}
                                disabled={ validateLoading ? true : false }
                                className={`${ validateLoading ? 'cursor-not-allowed' : '' }`}
                            >   
                                { validateLoading && <LoadingOutlined className="text-xs" /> }
                                <div>Approuver</div>
                            </Button>
                        </div> 
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminDemande;