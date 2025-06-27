import React, { useState, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CloseCircleOutlined, CloseOutlined, DownOutlined, EditFilled, EyeOutlined, FilterOutlined, LoadingOutlined, MenuOutlined, QrcodeOutlined, StopOutlined, WarningFilled } from "@ant-design/icons";
import { Dropdown, MenuProps, Modal } from "antd";
import { HttpStatus } from "../../constants/Http_status";
import { useGetAllAudience } from '@/hooks/useGetAllAudience';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Status from '@/components/status/Status';
import { useCancelAudience } from '@/hooks/useCancelAudience';
import { useMissedAudience } from '@/hooks/useMissedAudience';
const AdminNavigation = lazy(() => import("../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../components/Header"));

const AdminAudience: React.FC = () => {
    const { data: audiences, refetch, isLoading } = useGetAllAudience();
    const { mutateAsync: cancelAudience, isPending: cancelLoading } = useCancelAudience({action() {
        refetch()
    },});
    const { mutateAsync: missedAudience, isPending: missedLoading } = useMissedAudience({action() {
        refetch();
    },});
    const [filteredAudiences, setFilteredAudiences] = useState<any[]>([]);
    const [selectedAudience, setSelectedAudience] = useState<any>();
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [isMissingModalVisible, setIsMissingModalVisible] = useState(false);
    const [filterRef, setFilterRef] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<string>('');
    const [searchRef, setSearchRef] = useState<string>('');
    const navigate = useNavigate();

    const items: MenuProps['items'] = [
        {
            label:  <Link to={`/admin/audience/view/${selectedAudience?._id}`} >
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
          label: <button onClick={() => navigate(`/admin/audience/report/${selectedAudience?._id}`)} disabled={!(selectedAudience?.status_audience[0] === "Fixé")}>
                    <div className={`flex gap-2 ${!(selectedAudience?.status_audience[0] === "Fixé") && "cursor-not-allowed text-gray-400"}`}>
                        <div className="flex gap-2">
                            <EditFilled  />
                            <div>Reporter</div>
                        </div>
                    </div>
                </button>
          ,
          key: '3',
        },
        {
            label: <button disabled={!(selectedAudience?.status_audience[0] === "Fixé" || selectedAudience?.status_audience[0] === "Reporté")} onClick={() => setIsMissingModalVisible(true)}>
                        <div className={`flex gap-2 ${!(selectedAudience?.status_audience[0] === "Fixé" || selectedAudience?.status_audience[0] === "Reporté") && "cursor-not-allowed text-gray-400"}`}>
                            <div className="flex gap-2">
                                <StopOutlined  />
                                <div>Absenter</div>
                            </div>
                        </div>
                    </button>
            ,
            key: '4',
          },
        {
            label: <button disabled={!(selectedAudience?.status_audience[0] === "Fixé" || selectedAudience?.status_audience[0] === "Reporté")} onClick={() => setIsCancelModalVisible(true)}>
                        <div className={`flex gap-2 ${!(selectedAudience?.status_audience[0] === "Fixé" || selectedAudience?.status_audience[0] === "Reporté") && "cursor-not-allowed text-gray-400"}`}>
                            <div className="flex gap-2">
                            <CloseCircleOutlined  />
                                <div>Annuler</div>
                            </div>
                        </div>
                    </button>
            ,
            key: '5',
        },  
    ];

    const filter: MenuProps['items'] = [
        {
            label:  <div onClick={() => setFilterRef(false)} className="px-4">
                      Tout                    
                    </div>,
            key: '6',
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
        {
            label:  <div onClick={() => filterAudiences('Classé')} className="px-4">
                      Classé                    
                    </div>,
            key: '3',
        },
        {
            label:  <div onClick={() => filterAudiences('Absent')} className="px-4">
                      Absent                    
                    </div>,
            key: '4',
        },
      ];


    async function filterAudiences (filter: string) {
        setFilterRef(true);
        setFilterText(filter);
        const acc = audiences.filter((audience: any) => audience.status_audience[0] === filter);
        setFilteredAudiences(acc);
    }

    const handleCancelAudienceConfirm = async () => {
        if(selectedAudience) {
            const response = await cancelAudience(selectedAudience?._id);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                setIsCancelModalVisible(false);    
            }
        }
    }

    const handleMissingAudienceConfirm = async () => {
        if(selectedAudience) {
            const response = await missedAudience(selectedAudience?._id);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                setIsMissingModalVisible(false);    
            }
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
                        <div className="flex justify-between items-center my-4">
                            <div className="text-lg font-latobold">Les audiences</div>
                                <div className="flex items-center gap-1">
                                    <Input name="filter" type="text" placeholder="Saisir le ref..."  value={searchRef} onChange={(e) => setSearchRef(e.target.value)} />
                                    <Button 
                                        onClick={() => navigate('/admin/audience/qrcode')}
                                    >
                                        <QrcodeOutlined />
                                        <div className="">Scanner</div>
                                    </Button>
                                    <Dropdown menu={{ items: filter }} trigger={['click']}>
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
                                                    <img src={`data:image/png;base64,${audience.user_profile_photo}`} className="min-w-max rounded-full border border-slate-400 w-9 h-9 object-cover" />
                                                </td>
                                            <td className='md:px-6 px-2 py-4 whitespace-normal text-sm leading-5 text-gray-900'>  { audience.user_nom } { audience.user_prenom }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.user_cni }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.ref_audience }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.request_type }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.availability_date } de { audience.availability_hour_debut } à { audience.availability_hour_end }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>   
                                                { audience.status_audience[0] === "Fixé" ? 
                                                    <Status type='primary' data={`${audience.status_audience}`} />
                                                    : (
                                                        audience.status_audience[0] === "Reporté" ?
                                                        <Status type='alert' data={`${audience.status_audience}`} />
                                                        : (
                                                            audience.status_audience[0] === "Classé" ?
                                                            <Status type='success' data={`${audience.status_audience}`} />
                                                            :
                                                            (
                                                                audience.status_audience[0] === "Absent" ?
                                                                <Status type='gray' data={`${audience.status_audience}`} />
                                                                :
                                                                <Status type='danger' data={`${audience.status_audience}`} />
                                                            )
                                                        )
                                                    )
                                                }     
                                            </td>
                                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                                                <div className='flex justify-center'>
                                                    <Dropdown className="p-2 rounded hover:bg-gray-200 cursor-pointer" menu={{ items }} trigger={['click']}>
                                                        <a onClick={(e) => {e.preventDefault(); setSelectedAudience(audience)}}>
                                                            <MenuOutlined />
                                                        </a>
                                                    </Dropdown>
                                                </div>
                                            </td>
                                        </tr>
                                        )
                                    })
                                    :
                                    audiences && audiences.map((audience: any, index: any) => {
                                        if (searchRef && !audience.ref_audience.includes(searchRef)) {
                                            return null;
                                        }
                                        return (
                                            <tr key={index}>
                                                <td className='md:px-6 py-1 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>
                                                    <img src={`data:image/png;base64,${audience.user_profile_photo}`} className="min-w-max rounded-full border border-slate-400 w-9 h-9 object-cover" />
                                                </td>
                                            <td className='md:px-6 px-2 py-4 whitespace-normal text-sm leading-5 text-gray-900'>  { audience.user_nom } { audience.user_prenom }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.user_cni }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.ref_audience }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.request_type }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.availability_date } de { audience.availability_hour_debut } à { audience.availability_hour_end }  </td>
                                            <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>   
                                                { audience.status_audience[0] === "Fixé" ? 
                                                    <Status type='primary' data={`${audience.status_audience}`} />
                                                    : (
                                                        audience.status_audience[0] === "Reporté" ?
                                                        <Status type='alert' data={`${audience.status_audience}`} />
                                                        : (
                                                            audience.status_audience[0] === "Classé" ?
                                                            <Status type='success' data={`${audience.status_audience}`} />
                                                            :
                                                            (
                                                                audience.status_audience[0] === "Absent" ?
                                                                <Status type='gray' data={`${audience.status_audience}`} />
                                                                :
                                                                <Status type='danger' data={`${audience.status_audience}`} />
                                                            )
                                                        )
                                                    )
                                                }     
                                            </td>
                                            <td className='px-1 py-4 whitespace-nowrap text-sm leading-5 text-gray-900'>
                                                <div className='flex justify-center'>
                                                    <Dropdown className="p-2 rounded hover:bg-gray-200 cursor-pointer" menu={{ items }} trigger={['click']}>
                                                        <a onClick={(e) => {e.preventDefault(); setSelectedAudience(audience)}}>
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
                            (!isLoading && audiences && audiences.length < 1) &&
                                <div className="mx-auto flex justify-center w-full my-4 text-gray-500">
                                    <div className="text-center">
                                        <CloseOutlined className="text-5xl" />
                                        <div className="my-2">
                                        Aucune audience
                                        </div>
                                    </div>
                                </div>
                        }
                        {                          
                            (!isLoading && filterRef && filteredAudiences.length < 1) &&
                                <div className="mx-auto flex justify-center w-full my-4 text-gray-500">
                                    <div className="text-center">
                                        <CloseOutlined className="text-5xl" />
                                        <div className="my-2">
                                        Aucune audience
                                        </div>
                                    </div>
                                </div>
                        }
                        {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
                        </div>
                        <Modal title="Annulation de l'audience" 
                            open={isCancelModalVisible}
                            onOk={handleCancelAudienceConfirm}
                            onCancel={() => {setIsCancelModalVisible(false)}}
                            onClose={() => {setIsCancelModalVisible(false)}}
                            footer={null}
                        >
                            <div>
                                <WarningFilled className='mr-2 text-red-500 text-xl' />  
                                Êtes-vous sûr de vouloir annuler cette audience ?
                                <div className='flex justify-end gap-2 mt-2'>
                                    <Button
                                        variant={'secondary'} 
                                        onClick={() => {setIsCancelModalVisible(false)}}
                                    >   
                                        Annuler
                                    </Button>
                                    <Button
                                        variant={'destructive'}
                                        onClick={handleCancelAudienceConfirm}
                                        disabled={cancelLoading}
                                        className={`${cancelLoading && 'cursor-not-allowed'}`}
                                    >   
                                        { cancelLoading && <LoadingOutlined className='text-xs' /> }
                                        <div>Confirmer</div>
                                    </Button>
                                </div>
                            </div>
                        </Modal>
                        <Modal title="Absence pour l'audience" 
                            open={isMissingModalVisible}
                            onOk={handleMissingAudienceConfirm}
                            onCancel={() => {setIsMissingModalVisible(false)}}
                            onClose={() => {setIsMissingModalVisible(false)}}
                            footer={null}
                        >
                            <div>
                                <WarningFilled className='mr-2 text-gray-500 text-xl' />  
                                Êtes-vous sûr que le citoyen est absent pour cette audience ?
                                <div className='flex justify-end gap-2 mt-2'>
                                    <Button
                                        variant={'secondary'} 
                                        onClick={() => {setIsMissingModalVisible(false)}}
                                    >   
                                        Annuler
                                    </Button>
                                    <Button
                                        variant={'destructive'}
                                        onClick={handleMissingAudienceConfirm}
                                        disabled={missedLoading}
                                        className={`${missedLoading && 'cursor-not-allowed'}`}
                                    >   
                                        { missedLoading && <LoadingOutlined className="text-xs" /> }
                                        <div>Confirmer</div>
                                    </Button>
                                </div>
                            </div>
                        </Modal>
                </div>
            </div>
        </>
    )
}

export default AdminAudience;

