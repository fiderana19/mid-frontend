import { Input } from "antd";
import Header from "../../components/Header";

function AdminAccount() {
    return(
        <>
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
                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Validation</th>
                            <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                        </tr>
                    </thead> 
                    <tbody className='bg-white divide-y divide-gray-200'>
                        <tr>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.titre_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.descri_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.domaine  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.parcours  </td>
                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                            <div className='flex justify-center'>
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.titre_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.descri_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.domaine  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.parcours  </td>
                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                            <div className='flex justify-center'>
                            </div>
                            </td>
                        </tr><tr>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.titre_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.descri_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.domaine  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.parcours  </td>
                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                            <div className='flex justify-center'>
                            </div>
                            </td>
                        </tr><tr>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.titre_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.descri_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.domaine  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.parcours  </td>
                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                            <div className='flex justify-center'>
                            </div>
                            </td>
                        </tr><tr>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.titre_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.descri_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.domaine  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.parcours  </td>
                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                            <div className='flex justify-center'>
                            </div>
                            </td>
                        </tr><tr>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.titre_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.descri_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.domaine  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.parcours  </td>
                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                            <div className='flex justify-center'>
                            </div>
                            </td>
                        </tr><tr>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.titre_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.descri_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.domaine  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.parcours  </td>
                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                            <div className='flex justify-center'>
                            </div>
                            </td>
                        </tr><tr>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.titre_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.descri_niveau  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.domaine  </td>
                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  niv.parcours  </td>
                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                            <div className='flex justify-center'>
                            </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminAccount;