import { DatePicker, Dropdown, MenuProps, message, Modal, TimePicker } from "antd";
import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import { CheckOutlined, CloseCircleFilled, CloseOutlined, DownOutlined, FilterOutlined, LoadingOutlined, PlusOutlined, WarningFilled, WarningOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AssignDateToTime, ToLocalISOString } from '../../utils/toIsoString';
import { CreateAvailabilityInterface } from "../../interfaces/Availability";
import { cancelAvailability, createAvailability, getAllAvailability } from "../../api/availability";
import { okConfirmStyle, okDeleteStyle } from "../../utils/ModalStyle";

function AdminAvailability() {
    const [availabilities, setAvailabilities] = useState<any>([]);
    const [filteredAvailabilities, setFilteredAvailabilities] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [createAvailabilityCredentials, setCreateAvailabilityCredentials] = useState<CreateAvailabilityInterface>({date_availability: '', hour_debut: '', hour_end: ''});
    const [isAddAvailabilityModalVisible, setIsAddAvailabilityModalVisible] = useState<boolean>(false);
    const [selectedAvailability, setSelectedAvailability] = useState<string>();
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [day, setDay] = useState<any>();
    const [filterRef, setFilterRef] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<string>('');
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    )

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token)
        }
        fetchAvailability()

    }, [])

    const fetchAvailability = async () => {
        const response = await getAllAvailability(access_token);
        console.log(response)
        if(response?.status === 200) {
            setIsLoading(false);
            setAvailabilities(response.data);
        }
    }

    const handleCloseAddAvailabilityModal = async () => {
        setIsAddAvailabilityModalVisible(false);
    }


    const handleDateChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            const isoDate = ToLocalISOString(date);
            console.log(isoDate)
            setDay(isoDate)
            setCreateAvailabilityCredentials((prev) => ({
                ...prev,
                date_availability: isoDate,
            }))
            if(createAvailabilityCredentials.hour_debut !== '' || createAvailabilityCredentials.hour_end !== '') {
                const debuttime = AssignDateToTime(date,createAvailabilityCredentials.hour_debut);
                const debutdate_time = ToLocalISOString(debuttime)
                setCreateAvailabilityCredentials((prev) => ({
                    ...prev,
                    hour_debut: debutdate_time,
                }))
                const endtime = AssignDateToTime(date,createAvailabilityCredentials.hour_end);
                const enddate_time = ToLocalISOString(endtime)
                setCreateAvailabilityCredentials((prev) => ({
                    ...prev,
                    hour_end: enddate_time,
                }))
            }
        }
    };

    const handleDebutTimeChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            const time = AssignDateToTime(day,date);
            const date_time = ToLocalISOString(time)
            setCreateAvailabilityCredentials((prev) => ({
                ...prev,
                hour_debut: date_time
            }))
        }
    };
    
    const handleEndTimeChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            const time = AssignDateToTime(day,date);
            const date_time = ToLocalISOString(time)
            setCreateAvailabilityCredentials((prev) => ({
                ...prev,
                hour_end: date_time
            }))
        }
    };

    const filter: MenuProps['items'] = [
        {
            label:  <div onClick={() => setFilterRef(false)} className="px-4">
                      Tout                    
                    </div>,
            key: '3',
        },
        {
          label:  <div onClick={() => filterAvailabilities('Libre')} className="px-4">
                    Libre                    
                    </div>,
          key: '0',
        },
        {
            label:  <div onClick={() => filterAvailabilities('Occupé')} className="px-4">
                      Occupé                    
                    </div>,
            key: '1',
        },
        {
            label:  <div onClick={() => filterAvailabilities('Annulé')} className="px-4">
                      Annulé                    
                    </div>,
            key: '2',
        },
    ];

    async function filterAvailabilities (filter: string) {
        setFilterRef(true);
        setFilterText(filter);
        const acc = availabilities.filter((availability: any) => availability.status_availability[0] === filter);
        console.log(acc)
        setFilteredAvailabilities(acc);
    }

    const handleAddAvailabilitySubmit = async () => {
        console.log(createAvailabilityCredentials)
        const response = await createAvailability(access_token,createAvailabilityCredentials);
        if(response?.status === 200 || response?.status === 201) {
            fetchAvailability();
            message.success("Disponiblité ajoutée !");
            setIsAddAvailabilityModalVisible(false);    
        }
    }

    const handleCancelClose = async () => {
        setIsCancelModalVisible(false);
    }

    const handleCancelOk = async () => {
        console.log(selectedAvailability);
        if(selectedAvailability) {
            const response = await cancelAvailability(access_token,selectedAvailability);
            console.log(response);
            fetchAvailability();
            setIsCancelModalVisible(false);    
        }
    }


    return(
        <>
            <div className="w-full flex">
                <div className="md:w-52 sm:block hidden">
                    <AdminNavigation />
                </div>
                <div className="w-full">
                    <div className="z-40 fixed top-0 right-0 w-full">
                        <Header />
                    </div>
                    <div className="pl-10 pr-5 py-16 min-h-screen bg-four">
                        <div className="flex justify-between items-center my-4">
                            <div className="text-lg font-latobold">Les disponibilités du ministre</div>
                            <div className="flex items-center gap-1">
                                <button className="items-center flex gap-2 bg-gray-500 bg-opacity-70 hover:bg-gray-700 hover:bg-opacity-70 text-white font-latobold py-1 px-3 rounded" onClick={()=> setIsAddAvailabilityModalVisible(true)}>
                                    <PlusOutlined />
                                    <span>Nouvelle disponibilité</span>
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
                        <div className="w-full">
                            <div className="gap-2">
                                <table className='w-full divide-y divide-gray-200'>
                                    <thead>
                                        <tr>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Heure debut</th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Heure fin</th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                            <th className='px-1 py-3 max-w-max bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-center'></th>
                                        </tr>
                                    </thead> 
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {
                                        filterRef ? 
                                        filteredAvailabilities && filteredAvailabilities.map((availability: any, index: any) => {
                                            return ( 
                                                <tr key={index}>
                                                <td className='md:px-6 pr-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { availability.date_availability } </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { availability.hour_debut }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { availability.hour_end }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                    {
                                                        availability.status_availability[0] === "Occupé" ? 
                                                        <div className="max-w-max">
                                                            <div className="flex items-center bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                                                                { availability.status_availability }
                                                            </div>    
                                                        </div>                                    
                                                        : (
                                                            availability.status_availability[0] === "Libre" ?
                                                            <div className="max-w-max">
                                                                <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                                    { availability.status_availability }
                                                                </div> 
                                                            </div>                                      
                                                            :
                                                            <div className="max-w-max">
                                                                <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                    <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                                                    { availability.status_availability }
                                                                </div> 
                                                            </div>
                                                        )
                                                    }    
                                                </td>
                                                <td className='text-center px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                    {
                                                        availability.status_availability[0] === "Annulé" ?
                                                        <button disabled onClick={() => {setSelectedAvailability(availability._id); setIsCancelModalVisible(true)}} className='bg-red-300 hover:bg-red-400 cursor-not-allowed text-white py-1 px-2 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'>
                                                            <CloseCircleFilled /> Annuler 
                                                        </button>
                                                        :
                                                        <button onClick={() => {setSelectedAvailability(availability._id); setIsCancelModalVisible(true)}} className='bg-red-500 hover:bg-red-600 text-white py-1 px-2 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'>
                                                            <CloseCircleFilled /> Annuler 
                                                        </button>
                                                    }
                                                </td>
                                            </tr>)
                                        })
                                        :
                                        availabilities && availabilities.map((availability: any, index: any) => {
                                            return ( 
                                                <tr key={index}>
                                                <td className='md:px-6 pr-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'> { availability.date_availability } </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { availability.hour_debut }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { availability.hour_end }  </td>
                                                <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                    {
                                                        availability.status_availability[0] === "Occupé" ? 
                                                        <div className="max-w-max">
                                                            <div className="flex items-center bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                                                                { availability.status_availability }
                                                            </div>    
                                                        </div>                                    
                                                        : (
                                                            availability.status_availability[0] === "Libre" ?
                                                            <div className="max-w-max">
                                                                <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                                    { availability.status_availability }
                                                                </div> 
                                                            </div>                                      
                                                            :
                                                            <div className="max-w-max">
                                                                <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                    <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                                                    { availability.status_availability }
                                                                </div> 
                                                            </div>
                                                        )
                                                    }    
                                                </td>
                                                <td className='text-center px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                    {
                                                        availability.status_availability[0] === "Annulé" ?
                                                        <button disabled onClick={() => {setSelectedAvailability(availability._id); setIsCancelModalVisible(true)}} className='bg-red-300 hover:bg-red-400 cursor-not-allowed text-white py-1 px-2 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'>
                                                            <CloseCircleFilled /> Annuler 
                                                        </button>
                                                        :
                                                        <button onClick={() => {setSelectedAvailability(availability._id); setIsCancelModalVisible(true)}} className='bg-red-500 hover:bg-red-600 text-white py-1 px-2 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'>
                                                            <CloseCircleFilled /> Annuler 
                                                        </button>
                                                    }
                                                </td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                                </table>
                                {                          
                                    (!isLoading && availabilities && availabilities.length < 1) &&
                                        <div className="mx-auto flex justify-center w-full my-4 text-gray-500">
                                            <div className="text-center">
                                                <CloseOutlined className="text-5xl" />
                                                <div className="my-2">
                                                Aucune disponiblité
                                                </div>
                                            </div>
                                        </div>
                                }
                                {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
            <Modal
                title="Nouvelle disponibilité"
                open={isAddAvailabilityModalVisible}
                onOk={handleAddAvailabilitySubmit}
                onCancel={handleCloseAddAvailabilityModal}
                onClose={handleCloseAddAvailabilityModal}
                okButtonProps={{style: okConfirmStyle}}
                okText="Ajouter"
                 >
                    <div>
                        <div className='w-60 my-4 mx-auto'>
                            <DatePicker name="date_availability" onChange={handleDateChange} className="w-full py-1.5 bg-transparent placeholder:text-slate-400" placeholder="Date de la disponibilité..."  />
                        </div>                    
                    
                        <div className='w-60 my-4 mx-auto'>
                            <TimePicker name="hour_debut" format="HH:mm" onChange={handleDebutTimeChange} className="w-full py-1.5 bg-transparent placeholder:text-slate-400" placeholder="Début de la disponibilité..."  />
                        </div>     
                        <div className='w-60 my-4 mx-auto'>
                            <TimePicker name="hour_end" format="HH:mm" onChange={handleEndTimeChange} className="w-full py-1.5 bg-transparent placeholder:text-slate-400" placeholder="Fin de la disponibilité..."  />
                        </div>                                  
                    </div>
            </Modal>    
            <Modal title="Annuler une disponibilité" 
                open={isCancelModalVisible}
                onOk={handleCancelOk}
                onCancel={handleCancelClose}
                okButtonProps={{style: okDeleteStyle}}
                okText="Confirmer"
                cancelText="Annuler"
            >
                <div>
                <WarningFilled className='mr-2 text-red-500 text-xl' />  
                Êtes-vous sûr de vouloir annuler cette disponibilité ?
                </div>
            </Modal>
        </>
    )
}

export default AdminAvailability;