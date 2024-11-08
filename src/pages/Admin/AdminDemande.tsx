import { useState, useEffect } from "react";
import { denyRequest, getAllRequest, validateRequest } from "../../api/request";
import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import { CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, CloseOutlined, DownOutlined, EyeOutlined, MenuOutlined, WarningOutlined } from "@ant-design/icons";
import { MenuProps, Dropdown, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";

function AdminDemande() {
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
            const response = await getAllRequest(token);
            if(response) {
                console.log("reto lty ar", response)
                setRequests(response);
            }
        }
    }


    const items: MenuProps['items'] = [
        {
            label:  <Link to={`/admin/demande/view/${selectedRequest}`} >
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
          label: <div onClick={() => setIsValidateModalVisible(true)}>
                    <div className="flex gap-2">
                        <CheckCircleOutlined  />
                        <div>Approuver</div>
                    </div>
                </div>
          ,
          key: '3',
        },
        {
            label: <div onClick={() => setIsDenyModalVisible(true)}>
                <div className="flex gap-2">
                    <CloseCircleOutlined  />
                    <div>Refuser</div>
                </div>
            </div>
            ,
            key: '4',
          },
  
      ];

      const handleDenyConfirm = async () => {
        if(selectedRequest) {
            const response = await denyRequest(access_token,selectedRequest);
            console.log(response)
            setIsDenyModalVisible(false)
            fetchUserRequest()    
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
        if(selectedRequest) {
            const response = await validateRequest(access_token,selectedRequest);
            fetchUserRequest();
            setIsValidateModalVisible(false)
            console.log(response)    
        }
    }
    //handling delete cancel
    const handleValidateCancel = async () => {
        setIsValidateModalVisible(false)
    }
    
    return(
        <>
            <div className="w-full flex">
                <div className="md:w-52 sm:block hidden">
                    <AdminNavigation />
                </div>
                <div className="flex flex-col h-screen justify-center">
                    <div className="z-40 fixed top-0 right-0 w-full">
                        <Header />
                    </div>
                    <div className="px-5 py-16">
                        <div className="flex justify-between">
                            <div className="text-lg font-bold mb-4">LISTE DES DEMANDES D'AUDIENCES</div>
                        </div>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead>
                                <tr>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom et prenom(s)</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>CNI</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Motif</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Date de soumission</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Semaine preferé</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                    <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                                </tr>
                            </thead> 
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {
                                    requests && requests.map((request, index) => {
                                        return(
                                            <tr key={index}>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { request.user_nom } { request.user_prenom }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { request.user_cni }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { request.type_request }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { request.object }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { request.request_creation }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { request.date_wanted_debut }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                {
                                                    request.status_request[0] === "En attente" ? 
                                                    <div className="rounded text-yellow-500 flex gap-2 text-xs">
                                                        <WarningOutlined />
                                                        <div>{ request.status_request }</div>  
                                                    </div>
                                                    : (
                                                        request.status_request[0] === "Accepté" ?
                                                    <div className="rounded text-green-500 flex gap-2 text-xs">
                                                        <CheckOutlined />
                                                        <div>{ request.status_request }</div>  
                                                    </div>                                                        
                                                    :
                                                    <div className="rounded text-red-500 flex gap-2 text-xs">
                                                        <CloseOutlined />
                                                        <div>{ request.status_request }</div>  
                                                    </div>                                                    
                                                    )
                                                }    
                                                </td>
                                                <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                                                <div className='flex justify-center'>
                                                <Dropdown className="p-2 rounded hover:bg-gray-200 cursor-pointer" menu={{ items }} trigger={['click']}>
                                                    <a onClick={(e) => {e.preventDefault(); setSelectedRequest(request._id)}}>
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
                    </div>
                </div>
                <Modal title="Refus" 
                    open={isDenyModalVisible}
                    onOk={handleDenyConfirm}
                    onCancel={handleDenyCancel}
                    okText="Refuser"
                    cancelText="Annuler"
                >
                    <div className='text-red-900'>
                    <WarningOutlined className='mr-2' />  
                    Êtes-vous sûr de vouloir refuser ce demande d'audience ?
                    </div>
                </Modal>
                <Modal title="Validation" 
                    open={isValidateModalVisible}
                    onOk={handleValidateConfirm}
                    onCancel={handleValidateCancel}
                    okText="Valider"
                    cancelText="Annuler"
                >
                    <div className=''>
                    <WarningOutlined className='mr-2' />  
                    Êtes-vous sûr de vouloir valider ce demande d'audience ?
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminDemande;