import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import { audienceCancel, getAllAudience } from '../../api/audience';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleFilled, CloseCircleFilled, CloseCircleOutlined, CloseOutlined, DownOutlined, EditFilled, EyeOutlined, FilterOutlined, LoadingOutlined, MenuOutlined, QrcodeOutlined, WarningFilled } from "@ant-design/icons";
import { Dropdown, Input, MenuProps, message, Modal } from "antd";

function AdminAudience() {
    const [audiences, setAudiences] = useState<any[]>([]);
    const [filteredAudiences, setFilteredAudiences] = useState<any[]>([]);
    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [selectedAudience, setSelectedAudience] = useState<string>();
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [filterRef, setFilterRef] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<string>('');
    const [searchRef, setSearchRef] = useState<string>('');
    const navigate = useNavigate();
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    );

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            setAccessToken(token);
        }
        fetchAllAudience()
    }, [])

    async function fetchAllAudience () {
        const token = localStorage.getItem('token');
        if(token) {
            const response = await getAllAudience(token);
            if(response) {
                setAudiences(response.data);
            }
        }
    }

    const items: MenuProps['items'] = [
        {
            label:  <Link to={`/admin/audience/view/${selectedAudience}`} >
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
          label: <Link to={`/admin/audience/report/${selectedAudience}`}>
                    <div className="flex gap-2">
                        <EditFilled  />
                        <div>Reporter</div>
                    </div>
                </Link>
          ,
          key: '3',
        },
        {
            label: <div onClick={() => setIsCancelModalVisible(true)}>
                <div className="flex gap-2">
                    <CloseCircleOutlined  />
                    <div>Annuler</div>
                </div>
            </div>
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
          label:  <div onClick={() => filterAudiences('Fixé')} className="px-4">
                    Fixé                    
                    </div>,
          key: '0',
        },
        {
            label:  <div onClick={() => filterAudiences('Reporté')} className="px-4">
                      Reporté                    
                    </div>,
            key: '1',
        },
        {
            label:  <div onClick={() => filterAudiences('Annulé')} className="px-4">
                      Annulé                    
                    </div>,
            key: '2',
        },
      ];


    async function filterAudiences (filter: string) {
        setFilterRef(true);
        setFilterText(filter);
        const acc = audiences.filter(requests => requests.status_audience[0] === filter);
        console.log(acc)
        setFilteredAudiences(acc);
    }

    const handleCancelAudienceConfirm = async () => {
        setApiLoading(true);
        if(selectedAudience) {
            const response = await audienceCancel(access_token,selectedAudience);
            if(response?.status === 200 || response?.status === 201) {
                fetchAllAudience();
                setApiLoading(false);
                message.success("Audience annulé !")
                setIsCancelModalVisible(false);    
            }
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
                        <div className="flex justify-between items-center my-4">
                            <div className="text-lg font-latobold">Les audiences</div>
                                <div className="flex items-center gap-1">
                                    <Input name="filter" type="text" className="h-8 py-1 " placeholder="Saisir le ref..."  value={searchRef} onChange={(e) => setSearchRef(e.target.value)} />
                                    <button 
                                        className='flex bg-gray-500 bg-opacity-70 hover:bg-gray-700 hover:bg-opacity-70 text-white font-latobold py-1 px-3 rounded items-center gap-1'
                                        onClick={() => navigate('/admin/audience/qrcode')}
                                    >
                                        <QrcodeOutlined />
                                        <div className="">Scanner</div>
                                    </button>
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
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead>
                                <tr>
                                    <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom et prenom(s)</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>CIN</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Ref</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                                    <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                    <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                                </tr>
                            </thead> 
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {
                                    filterRef ? 
                                    filteredAudiences && filteredAudiences.map((audience: any, index) => {
                                        if (searchRef && !audience.ref_audience.includes(searchRef)) {
                                            return null;
                                        }
                                        return (
                                            <tr key={index}>
                                                <td className='md:px-6 py-1 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>
                                                    <img src={`data:image/png;base64,${audience.user_profile_photo}`} className="rounded-full border border-slate-400 w-9 h-9 object-cover" />
                                                </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.user_nom } { audience.user_prenom }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.user_cni }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.ref_audience }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.request_type }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.availability_date } de { audience.availability_hour_debut } à { audience.availability_hour_end }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>   
                                                { audience.status_audience[0] === "Fixé" ? 
                                                    <div className="flex gap-2 text-blue-500">
                                                        <CheckCircleFilled /><div>{ audience.status_audience }</div>
                                                    </div> 
                                                    : (
                                                        audience.status_audience[0] === "Reporté" ?
                                                        <div className="flex gap-2 text-yellow-500">
                                                            <CheckCircleFilled /><div>{ audience.status_audience }</div>
                                                        </div>
                                                        : (
                                                                audience.status_audience[0] === "Classé" ?
                                                                <div className="flex gap-2 text-green-500">
                                                                    <CheckCircleFilled /><div>{ audience.status_audience }</div>
                                                                </div>
                                                                :
                                                                (
                                                                    audience.status_audience[0] === "Absent" ?
                                                                    <div className="flex gap-2 text-gray-500">
                                                                        <CheckCircleFilled /><div>{ audience.status_audience }</div>
                                                                    </div>
                                                                    :
                                                                    <div className="flex gap-2 text-red-500">
                                                                        <CloseCircleFilled /><div>{ audience.status_audience }</div>
                                                                    </div>
                                                            )
                                                        )
                                                    )
                                                }     
                                            </td>
                                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                                                <div className='flex justify-center'>
                                                    <Dropdown className="p-2 rounded hover:bg-gray-200 cursor-pointer" menu={{ items }} trigger={['click']}>
                                                        <a onClick={(e) => {e.preventDefault(); setSelectedAudience(audience._id)}}>
                                                            <MenuOutlined />
                                                        </a>
                                                    </Dropdown>
                                                </div>
                                            </td>
                                        </tr>
                                        )
                                    })
                                    :
                                    audiences && audiences.map((audience: any, index) => {
                                        if (searchRef && !audience.ref_audience.includes(searchRef)) {
                                            return null;
                                        }
                                        return (
                                            <tr key={index}>
                                                <td className='md:px-6 py-1 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>
                                                    <img src={`data:image/png;base64,${audience.user_profile_photo}`} className="rounded-full border border-slate-400 w-9 h-9 object-cover" />
                                                </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.user_nom } { audience.user_prenom }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.user_cni }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.ref_audience }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.request_type }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.availability_date } de { audience.availability_hour_debut } à { audience.availability_hour_end }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>   
                                                { audience.status_audience[0] === "Fixé" ? 
                                                    <div className="flex gap-2 text-blue-500">
                                                        <CheckCircleFilled /><div>{ audience.status_audience }</div>
                                                    </div> 
                                                    : (
                                                        audience.status_audience[0] === "Reporté" ?
                                                        <div className="flex gap-2 text-yellow-500">
                                                            <CheckCircleFilled /><div>{ audience.status_audience }</div>
                                                        </div>
                                                        : (
                                                                audience.status_audience[0] === "Classé" ?
                                                                <div className="flex gap-2 text-green-500">
                                                                    <CheckCircleFilled /><div>{ audience.status_audience }</div>
                                                                </div>
                                                                :
                                                                (
                                                                    audience.status_audience[0] === "Absent" ?
                                                                    <div className="flex gap-2 text-gray-500">
                                                                        <CheckCircleFilled /><div>{ audience.status_audience }</div>
                                                                    </div>
                                                                    :
                                                                    <div className="flex gap-2 text-red-500">
                                                                        <CloseCircleFilled /><div>{ audience.status_audience }</div>
                                                                    </div>
                                                            )
                                                        )
                                                    )
                                                }     
                                            </td>
                                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                                                <div className='flex justify-center'>
                                                    <Dropdown className="p-2 rounded hover:bg-gray-200 cursor-pointer" menu={{ items }} trigger={['click']}>
                                                        <a onClick={(e) => {e.preventDefault(); setSelectedAudience(audience._id)}}>
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
                            (audiences && audiences.length < 1) &&
                                <div className="mx-auto flex justify-center w-full my-4 text-gray-500">
                                    <div className="text-center">
                                        <CloseOutlined className="text-5xl" />
                                        <div className="my-2">
                                        Aucune audience
                                        </div>
                                    </div>
                                </div>
                        }
                        </div>
                        <Modal title="Annulation de l'audience" 
                            open={isCancelModalVisible}
                            onOk={handleCancelAudienceConfirm}
                            onCancel={() => {setIsCancelModalVisible(false)}}
                            footer={null}
                        >
                            <div>
                                <WarningFilled className='mr-2 text-red-500 text-xl' />  
                                Êtes-vous sûr de vouloir annuler cette audience ?
                                <div className='flex justify-end gap-2'>
                                    <button 
                                        onClick={() => {setIsCancelModalVisible(false)}}
                                        className="border mt-2 hover:bg-gray-100 py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    >   
                                        Annuler
                                    </button>
                                    <button 
                                        onClick={handleCancelAudienceConfirm}
                                        disabled={ apiLoading ? true : false }
                                        className= { apiLoading ? "bg-red-400 cursor-not-allowed flex gap-2 items-center border mt-2 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-red-500" : "flex gap-2 items-center border mt-2 bg-red-500 hover:border-red-600 hover:bg-red-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-red-500" } 
                                    >   
                                        { apiLoading && <LoadingOutlined /> }
                                        <div>Confirmer</div>
                                    </button>
                                </div>
                            </div>
                        </Modal>
                </div>
            </div>
        </>
    )
}

export default AdminAudience;

