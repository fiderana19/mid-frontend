import { DatePicker, Dropdown, MenuProps, Modal, TimePicker, message } from 'antd';
import { CloseCircleFilled, CloseOutlined, DownOutlined, FilterOutlined, LoadingOutlined, PlusOutlined, WarningFilled } from "@ant-design/icons";
import React, { lazy, Suspense, useState } from "react";
import dayjs from "dayjs";
import { AssignDateToTime, ToLocalISOString } from '../../utils/toIsoString';
import { CreateAvailabilityInterface } from "../../interfaces/Availability";
import { HttpStatus } from "../../constants/Http_status";
import { useGetAllAvailability } from "@/hooks/useGetAllAvailability";
import { useForm } from "react-hook-form";
import { useCancelAvailability } from "@/hooks/useCancelAvailability";
import { useCreateAvailability } from "@/hooks/useCreateAvailability";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateAvailabilityValidation } from "@/validation/availability.validation";
import AvailabilityStatus from "@/components/status/AvailabilityStatus";
const AdminNavigation = lazy(() => import("../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../components/Header"));

const AdminAvailability: React.FC = () => {
    const { data: availabilities, isLoading, refetch } = useGetAllAvailability();
    const { mutateAsync: cancelAvailability, isPending: cancelLoading } = useCancelAvailability({action() {
        refetch()
    },});
    const { mutateAsync: createAvailability, isPending: createLoading } = useCreateAvailability({action() {
        refetch()
    },})
    const { handleSubmit: submit, formState: { errors }, setValue, setError } = useForm<CreateAvailabilityInterface>({
        resolver: yupResolver(CreateAvailabilityValidation)
    });
    const [filteredAvailabilities, setFilteredAvailabilities] = useState<any[]>([]);
    const [createAvailabilityCredentials, setCreateAvailabilityCredentials] = useState<CreateAvailabilityInterface>({date_availability: '', hour_debut: '', hour_end: ''});
    const [isAddAvailabilityModalVisible, setIsAddAvailabilityModalVisible] = useState<boolean>(false);
    const [selectedAvailability, setSelectedAvailability] = useState<string>();
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [day, setDay] = useState<any>();
    const [filterRef, setFilterRef] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<string>('');

    const handleCloseAddAvailabilityModal = async () => {
        setIsAddAvailabilityModalVisible(false);
    }

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            const isoDate = ToLocalISOString(date);
            setDay(isoDate)
            
            setCreateAvailabilityCredentials((prev) => ({
                ...prev,
                date_availability: isoDate,
            }))
            setValue('date_availability', isoDate);
            
            if(createAvailabilityCredentials.hour_debut !== '' || createAvailabilityCredentials.hour_end !== '') {
                const debuttime = AssignDateToTime(date,createAvailabilityCredentials.hour_debut);
                const debutdate_time = ToLocalISOString(debuttime)
                
                setCreateAvailabilityCredentials((prev) => ({
                    ...prev,
                    hour_debut: debutdate_time,
                }))
                setValue('hour_debut', debutdate_time);
                
                const endtime = AssignDateToTime(date,createAvailabilityCredentials.hour_end);
                const enddate_time = ToLocalISOString(endtime)
                
                setCreateAvailabilityCredentials((prev) => ({
                    ...prev,
                    hour_end: enddate_time,
                }))
                setValue('hour_end', enddate_time);
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
            setValue('hour_debut', date_time);
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
            setValue('hour_end', date_time);
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
        setFilteredAvailabilities(acc);
    }

    const handleAddAvailabilitySubmit = async (data: CreateAvailabilityInterface) => {
        const dayToVerify = new Date(data.date_availability);

        if(dayToVerify.getDay() === 0 || dayToVerify.getDay() === 6) {
            setError('date_availability' , {type: "required", message : "Impossible d'ajouter un jour de weekend !"});
        }

        if(dayToVerify.getDay() !== 0 && dayToVerify.getDay() !== 6) {
            const response = await createAvailability(data);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                setIsAddAvailabilityModalVisible(false);    
            }
        }
    }

    const handleCancelClose = async () => {
        setIsCancelModalVisible(false);
    }

    const handleCancelOk = async () => {
        if(selectedAvailability) {
            const response = await cancelAvailability(selectedAvailability);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                setIsCancelModalVisible(false);  
            }
        }
    }

    // Disabled hour debut for creating availability
    const disabledDebutHours = () => {
        const hours = [0,1,2,3,4,5,6,7,12,13,16,17,18,19,20,21,22,23];
      
        return hours;
    };

    // Disabled hour end for creating availability
    const disabledEndHours = () => {
        const hours = [0,1,2,3,4,5,6,7,13,16,17,18,19,20,21,22,23];
      
        return hours;
    };

    return(
        <>
            <div className="w-full flex">
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
                    <div className="pl-10 pr-5 py-16 min-h-screen bg-four">
                        <div className="flex justify-between items-center my-4">
                            <div className="text-lg font-latobold">Les disponibilités du ministre</div>
                            <div className="flex items-center gap-1">
                                <Button 
                                    onClick={()=> setIsAddAvailabilityModalVisible(true)}
                                >
                                    <PlusOutlined />
                                    <span>Nouvelle disponibilité</span>
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
                                                    <AvailabilityStatus value={availability.status_availability[0]} />    
                                                </td>
                                                <td className='text-center px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                    {
                                                        availability.status_availability[0] === "Annulé" ?
                                                        <Button
                                                            size={'sm'} 
                                                            variant={'destructive'}
                                                            disabled 
                                                            onClick={() => {setSelectedAvailability(availability._id); setIsCancelModalVisible(true)}} 
                                                            className='bg-red-400 cursor-not-allowed'>
                                                            <CloseCircleFilled /> Annuler 
                                                        </Button>
                                                        :
                                                        <Button 
                                                            size={'sm'}
                                                            variant={'destructive'}
                                                            onClick={() => {setSelectedAvailability(availability._id); setIsCancelModalVisible(true)}} 
                                                        >
                                                            <CloseCircleFilled /> Annuler 
                                                        </Button>
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
                                                    <AvailabilityStatus value={availability.status_availability[0]} />    
                                                </td>
                                                <td className='text-center px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  
                                                    {
                                                        availability.status_availability[0] === "Annulé" ?
                                                        <Button
                                                            size={'sm'} 
                                                            variant={'destructive'}
                                                            disabled 
                                                            onClick={() => {setSelectedAvailability(availability._id); setIsCancelModalVisible(true)}} 
                                                            className='bg-red-400 cursor-not-allowed'>
                                                            <CloseCircleFilled /> Annuler 
                                                        </Button>
                                                        :
                                                        <Button 
                                                            size={'sm'}
                                                            variant={'destructive'}
                                                            onClick={() => {setSelectedAvailability(availability._id); setIsCancelModalVisible(true)}} 
                                                        >
                                                            <CloseCircleFilled /> Annuler 
                                                        </Button>
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
                                {                          
                                    (!isLoading && filterRef && filteredAvailabilities.length < 1) &&
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
                onCancel={handleCloseAddAvailabilityModal}
                onClose={handleCloseAddAvailabilityModal}
                footer={null}
                 >
                    <form onSubmit={submit(handleAddAvailabilitySubmit)} className="my-4">
                        <div className='w-60 my-4 mx-auto'>
                            <Label className="mb-1">Date de la disponibilité :</Label>
                            <DatePicker 
                                name="date_availability" 
                                onChange={handleDateChange} 
                                className={`w-full py-1.5 bg-transparent placeholder:text-slate-400 ${errors?.date_availability ? 'text-red-500 border border-red-500 rounded' : ''} `}
                                placeholder="Date de la disponibilité..."  
                            />
                            {errors?.date_availability && <div className="text-left text-red-500 text-xs">{ errors?.date_availability.message }</div>}                        
                            <Label className="mb-1 mt-4">Heure debut de la disponibilité :</Label>
                            <TimePicker 
                                name="hour_debut" 
                                disabledHours={disabledDebutHours} 
                                format="HH:mm" 
                                onChange={handleDebutTimeChange} 
                                className={`w-full  py-1.5 bg-transparent placeholder:text-slate-400 ${errors?.hour_debut ? ' border border-red-500 rounded' : ''} `}
                                placeholder="Début de la disponibilité..."  
                            />
                            {errors?.hour_debut && <div className="text-left text-red-500 text-xs">{ errors?.hour_debut.message }</div>}                        
                            <Label className="mb-1 mt-4">Heure fin de la disponibilité :</Label>
                            <TimePicker 
                                name="hour_end" 
                                disabledHours={disabledEndHours} 
                                format="HH:mm" 
                                onChange={handleEndTimeChange} 
                                className={`w-full py-1.5 bg-transparent placeholder:text-slate-400 ${errors?.hour_end ? ' border border-red-500 rounded' : ''} `}
                                placeholder="Fin de la disponibilité..."  
                            />
                            {errors?.hour_end && <div className="text-left text-red-500 text-xs">{ errors?.hour_end?.message }</div>}                        
                        </div>    
                        <div className="flex justify-center">
                            <Button 
                                variant={'success'} 
                                type="submit"
                                className={`${createLoading ? 'cursor-not-allowed' : ''}`}
                            >
                                { createLoading && <LoadingOutlined className="text-xs" /> }
                                AJOUTER
                            </Button>
                        </div>                              
                    </form>
            </Modal>    
            <Modal title="Annuler une disponibilité" 
                open={isCancelModalVisible}
                onCancel={handleCancelClose}
                onClose={handleCancelClose}
                footer={null}
            >
                <div>
                    <WarningFilled className='mr-2 text-red-500 text-xl' />  
                    Êtes-vous sûr de vouloir annuler cette disponibilité ?
                    <div className='flex justify-end gap-2 mt-2'>
                        <Button
                            variant={'secondary'} 
                            onClick={handleCancelClose}
                        >   
                            Annuler
                        </Button>
                        <Button
                            variant={'destructive'} 
                            onClick={handleCancelOk}
                            disabled={ cancelLoading ? true : false }
                            className={`${cancelLoading ? 'cursor-not-allowed' : ''}`}
                        >   
                            { cancelLoading && <LoadingOutlined /> }
                            <div>Confirmer</div>
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AdminAvailability;