import React, { lazy, Suspense, useState } from "react";
import { Dropdown, MenuProps, Modal } from "antd";
const AdminNavigation = lazy(() => import("../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../components/Header"));
import { CheckCircleOutlined, CloseOutlined, DeleteOutlined, DownOutlined, FilterOutlined, LoadingOutlined, MenuOutlined, UserOutlined, WarningFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { HttpStatus } from "../../constants/Http_status";
import { useGetAllUser } from '../../hooks/useGetAllUser';
import { Input } from "@/components/ui/input";
import { useValidateUser } from "@/hooks/useValidateUser";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";
import { Button } from "@/components/ui/button";

const AdminAccount: React.FC = () => {
    const { data: accounts, isLoading, refetch } = useGetAllUser();
    const { mutateAsync: validateUser, isPending: validateLoading } = useValidateUser({action() {
        refetch();
    }});
    const { mutateAsync: deleteUser, isPending: deleteLoading } = useDeleteUser({action() {
        refetch();
    }})
    const [filteredAccounts, setFilteredAccounts] = useState<any[]>([]);
    const [selectedAcount, setSelectedAccount] = useState<any>()
    const [isValidateModalVisible, setIsValidateModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [filterRef, setFilterRef] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<string>('');
    const [searchRef, setSearchRef] = useState<string>('');

    async function filterAccounts (filter: boolean, text: string) {
        setFilterRef(true);
        setFilterText(text);
        const acc = accounts.filter((accounts: any) => accounts.validation === filter);
        setFilteredAccounts(acc);
    }
       
    const items: MenuProps['items'] = [
        {
          label:  <Link to={`/admin/account/view/${selectedAcount?._id}`} >
                    <div className="flex gap-2">
                        <UserOutlined  />
                        <div>Voir</div>
                    </div>
                </Link>,
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: <button disabled={selectedAcount?.validation ? true : false}>
                <div onClick={() => setIsValidateModalVisible(true)} className={selectedAcount?.validation ? "flex gap-2 cursor-not-allowed text-gray-400" : "flex gap-2" } >
                    <CheckCircleOutlined />
                    <div>Valider</div>
                </div>
            </button>,
          key: '3',
        },
        {
            type: 'divider',
        },
        {
            label: <div onClick={() => setIsDeleteModalVisible(true)}>
                  <div className="flex gap-2">
                      <DeleteOutlined />
                      <div>Supprimer</div>
                  </div>
              </div>,
            key: '4',
        },
      ];
    
      const filter: MenuProps['items'] = [
        {
            label:  <div onClick={() => setFilterRef(false)} className="px-4">
                      Tout                    
                    </div>,
            key: '2',
        },
        {
          label:  <div onClick={() => filterAccounts(true, 'Validé')} className="px-4">
                    Validé                    
                    </div>,
          key: '0',
        },
        {
            label:  <div onClick={() => filterAccounts(false, 'Non validé')} className="px-4">
                      Non validé                    
                    </div>,
            key: '1',
        },
    ];
      
    const handleValidateConfirm = async () => {
        if(selectedAcount) {
            const response = await validateUser(selectedAcount?._id);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                setIsValidateModalVisible(false);
            }
        }
    }

    const handleValidateCancel = async () => {
        setIsValidateModalVisible(false)
    }

    const handleDeleteConfirm = async () => {
        if(selectedAcount) {
            const response = await deleteUser(selectedAcount?._id);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                setIsDeleteModalVisible(false);    
            }
        }
    }

    const handleDeleteCancel = async () => {
        setIsDeleteModalVisible(false)
    }

    return(
        <>
            <div className="w-full flex bg-four min-h-screen">
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
                        <div className="flex justify-between items-center my-4">
                            <div className="text-lg font-latobold">Les comptes des citoyens</div>
                            <div className="flex items-center gap-1">
                                <Input 
                                    name="filter" 
                                    type="text" 
                                    placeholder="Saisir le CIN..."  
                                    value={searchRef} 
                                    onChange={(e) => setSearchRef(e.target.value)} 
                                    onKeyPress={handleNumberKeyPress}  
                                />
                                <Dropdown className="rounded hover:bg-gray-200 cursor-pointer" menu={{ items: filter }} trigger={['click']}>
                                    <a onClick={(e) => {e.preventDefault()}}>
                                        <Button>
                                            <FilterOutlined className="text-md mr-1"/>
                                            {
                                                (filterRef && filterText) ? 
                                                <div className="min-w-max">{filterText}</div>
                                                :
                                                <div className="min-w-max">Tout</div>
                                            }
                                            <DownOutlined />
                                        </Button>
                                    </a>
                                </Dropdown>
                            </div>
                        </div>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead>
                                <tr>
                                    <th className='md:px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom et prenom(s)</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>CIN</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Mail</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Creation</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Validation</th>
                                    <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                                </tr>
                            </thead> 
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {
                                    (filterRef && accounts) ? 
                                    filteredAccounts.map((account: any, index: any) => {
                                        if (searchRef && !account.cni.includes(searchRef)) {
                                            return null;
                                        }
                                        return(
                                            <tr key={index}>
                                                <td className='md:px-6 py-1 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>
                                                    <img src={`data:image/png;base64,${account.profile_photo}`} className="min-w-max rounded-full border border-slate-400 w-9 h-9 object-cover" />
                                                </td>
                                                <td className='md:px-6 pr-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                    { account.nom } { account.prenom }  
                                                </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.cni } </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.email }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.user_creation }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                    { account.validation ? 
                                                    <div className="max-w-max">
                                                        <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                            Validé
                                                        </div>        
                                                    </div>                                                                        
                                                    : 
                                                    <div className="max-w-max">
                                                        <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                                            Non Validé
                                                        </div>        
                                                    </div>
                                                    }  
                                                </td>
                                                <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                                                    <Dropdown className="p-2 rounded hover:bg-gray-200 cursor-pointer" menu={{ items }} trigger={['click']}>
                                                        <a onClick={(e) => {e.preventDefault(); setSelectedAccount(account)}}>
                                                            <MenuOutlined />
                                                        </a>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    accounts && accounts.map((account: any, index: any) => {
                                        if (searchRef && !account.cni.includes(searchRef)) {
                                            return null;
                                        }
                                        return(
                                            <tr key={index}>
                                                <td className='md:px-6 py-1 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>
                                                    <img src={`data:image/png;base64,${account.profile_photo}`} className="min-w-max rounded-full border border-slate-400 w-9 h-9 object-cover" />
                                                </td>
                                                <td className='md:px-6 pr-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                    { account.nom } { account.prenom }  
                                                </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.cni } </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.email }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.user_creation }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                    { account.validation ? 
                                                    <div className="max-w-max">
                                                        <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                            Validé
                                                        </div>        
                                                    </div>                                                                        
                                                    : 
                                                    <div className="max-w-max">
                                                        <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                                            Non Validé
                                                        </div>        
                                                    </div>
                                                    }  
                                                </td>
                                                <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                                                    <Dropdown className="p-2 rounded hover:bg-gray-200 cursor-pointer" menu={{ items }} trigger={['click']}>
                                                        <a onClick={(e) => {e.preventDefault(); setSelectedAccount(account)}}>
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
                        {/* Handling the accounts and filters length */}
                        {                          
                            (!isLoading && accounts && accounts.length < 1) &&
                                <div className="mx-auto flex justify-center w-full my-4 text-gray-500">
                                    <div className="text-center">
                                        <CloseOutlined className="text-5xl" />
                                        <div className="my-2">
                                        Aucun compte de citoyen
                                        </div>
                                    </div>
                                </div>
                        }
                        {                          
                            (!isLoading && filterRef && filteredAccounts.length < 1) &&
                                <div className="mx-auto flex justify-center w-full my-4 text-gray-500">
                                    <div className="text-center">
                                        <CloseOutlined className="text-5xl" />
                                        <div className="my-2">
                                        Aucun compte de citoyen                                        
                                        </div>
                                    </div>
                                </div>
                        }
                        {/* Handling the loading */}
                        {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
                    </div>
                </div>
            </div>
            <Modal title="Validation du compte" 
                open={isValidateModalVisible}
                onOk={handleValidateConfirm}
                onCancel={handleValidateCancel}
                onClose={handleValidateCancel}
                footer={null}
            >
                <div>
                    <WarningFilled className='mr-2 text-green-500 text-xl' />  
                    Êtes-vous sûr de vouloir valider ce demande d'audience ?
                    <div className='flex justify-end gap-2 mt-2'>
                        <Button variant={'secondary'} 
                            onClick={handleValidateCancel}
                        >   
                            Annuler
                        </Button>
                        <Button
                            variant={'success'} 
                            onClick={handleValidateConfirm}
                            disabled={ validateLoading ? true : false }
                            className= {`flex gap-2 items-center ${validateLoading ? 'cursor-not-allowed' : '' }`} 
                        >   
                            { validateLoading && <LoadingOutlined /> }
                            <div>Valider</div>
                        </Button>
                    </div>
                </div>
            </Modal>
            <Modal title="Suppression du compte" 
                open={isDeleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                onClose={handleDeleteCancel}
                footer={null}
            >
                <div>
                    <WarningFilled className='mr-2 text-red-500 text-xl' />  
                    Êtes-vous sûr de vouloir supprimer ce compte de citoyen ?
                    <div className='flex justify-end gap-2 mt-2'>
                        <Button
                            variant={'secondary'} 
                            onClick={handleDeleteCancel}
                        >   
                            Annuler
                        </Button>
                        <Button
                            variant={'destructive'} 
                            onClick={handleDeleteConfirm}
                            disabled={ deleteLoading ? true : false }
                            className= {`flex gap-2 items-center ${deleteLoading ? 'cursor-not-allowed' : '' }`} 
                        >   
                            { deleteLoading && <LoadingOutlined /> }
                            <div>Supprimer</div>
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AdminAccount;


