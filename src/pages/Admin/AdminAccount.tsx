import { Dropdown, Input, MenuProps, Modal } from "antd";
import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import { useEffect, useState } from "react";
import { getAllUser, validateUser } from "../../api/users";
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleFilled, DeleteOutlined, EditOutlined, MenuOutlined, UserOutlined, WarningOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function AdminAccount() {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [access_token, setAccessToken] = useState<string>('');
    const [selectedAcount, setSelectedAccount] = useState<string>()
    const [isValidateModalVisible, setIsValidateModalVisible] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token)
        }
        
        fetchAccount()
    }, [])

    async function fetchAccount () {
        const response = await getAllUser(access_token);

        console.log(response)
        if(response) {
            setAccounts(response.data)
        }
    }
   
    
    const items: MenuProps['items'] = [
        {
          label:  <Link to={`/admin/account/view/${selectedAcount}`} >
                    <div className="flex gap-2">
                        <UserOutlined  />
                        <div>Voir</div>
                    </div>
                </Link>,
          key: '0',
        },
        {
          label:  <Link to={`/admin/account/edit/${selectedAcount}`} >
                    <div className="flex gap-2">
                        <EditOutlined />
                        <div>Modifier</div>
                    </div>
                </Link>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: <div onClick={() => setIsValidateModalVisible(true)}>
                <div className="flex gap-2">
                    <CheckCircleOutlined />
                    <div>Valider</div>
                </div>
            </div>,
          key: '3',
        },
      ];
      
    const handleValidateConfirm = async () => {
        if(selectedAcount) {
            const response = await validateUser(access_token,selectedAcount);
            setIsValidateModalVisible(false);
            fetchAccount();
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
                <div className="p-4 w-1/6 flex flex-col justify-between h-screen bg-green-900 text-center">
                    <AdminNavigation />
                </div>
                <div className="w-5/6">
                <Header />
                <div className="p-4">
                    <div className="flex justify-between">
                        <div className="text-lg font-bold mb-4">LISTE DES CITOYENS INSCRITS</div>
                        <div className="flex">
                            <Input name="filter" type="text" className="h-9" placeholder="Saisir le CNI..." />
                        </div>
                    </div>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead>
                            <tr>
                                <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                                <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom et prenom(s)</th>
                                <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>CNI</th>
                                <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Mail</th>
                                <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Creation</th>
                                <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Validation</th>
                                <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                            </tr>
                        </thead> 
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {
                                accounts.map((account, index) => {
                                    return(
                                        <tr key={index}>
                                            <td className='md:px-6 py-1 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>
                                                <img src={`data:image/png;base64,${account.profile_photo}`} className="rounded-full border border-slate-400 w-9 h-9 object-cover" />
                                            </td>
                                            <td className='md:px-6 pr-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                { account.nom } { account.prenom }  
                                            </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.cni } </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.email }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.user_creation }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                { account.validation ? 
                                                <div className="flex gap-2 text-green-500">
                                                    <CheckCircleFilled /><div>Validé</div>
                                                </div> 
                                                : 
                                                <div className="flex gap-2 text-red-500">
                                                    <CloseCircleFilled /><div>Non Validé</div>
                                                </div>
                                                }  
                                            </td>
                                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                                                <Dropdown className="p-2 rounded hover:bg-gray-200 cursor-pointer" menu={{ items }} trigger={['click']}>
                                                    <a onClick={(e) => {e.preventDefault(); setSelectedAccount(account._id)}}>
                                                        <MenuOutlined />
                                                    </a>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
                </div>
            </div>
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
        </>

    )
}

export default AdminAccount;


