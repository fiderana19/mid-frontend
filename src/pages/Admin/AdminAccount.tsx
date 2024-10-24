import { Input } from "antd";
import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import { useEffect, useState } from "react";
import { getAllUser } from "../../api/users";
import { MenuOutlined } from "@ant-design/icons";

function AdminAccount() {
    const [accounts, setAccounts] = useState<any[]>([]);

    useEffect(() => {
        async function fetchAccount () {
            const response = await getAllUser();

            console.log(response)
            if(response) {
                setAccounts(response.data)
            }
        }
        fetchAccount()
    }, [])
    
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
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.nom } { account.prenom }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.cni } </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.email }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.createdAt }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { account.validation }  </td>
                                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                                                <div className='flex justify-center'>
                                                    <MenuOutlined className="p-1 border-gray-600 bg-gray-400 rounded" />
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
            </div>
        </>

    )
}

export default AdminAccount;


