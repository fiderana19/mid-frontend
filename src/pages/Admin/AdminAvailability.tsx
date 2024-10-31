import { Calendar, DatePicker, Modal, TimePicker } from "antd";
import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import { CheckOutlined, CloseCircleFilled, CloseOutlined, DeleteFilled, EditFilled, PlusOutlined, WarningOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AssignDateToTime, ToLocalISOString } from '../../utils/toIsoString';
import { CreateAvailabilityInterface } from "../../interfaces/Availability";
import { createAvailability, getAllAvailability, getAvailabilityById } from "../../api/availability";

function AdminAvailability() {
    const [availabilities, setAvailabilities] = useState<any>([]);
    const [createAvailabilityCredentials, setCreateAvailabilityCredentials] = useState<CreateAvailabilityInterface>({date_availability: '', hour_debut: '', hour_end: ''});
    const [isAddAvailabilityModalVisible, setIsAddAvailabilityModalVisible] = useState<boolean>(false);
    const [day, setDay] = useState<any>()
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

    const handleAddAvailabilitySubmit = async () => {
        console.log("reto redential", createAvailabilityCredentials)
        const response = await createAvailability(access_token,createAvailabilityCredentials);
        console.log(response);
        fetchAvailability();
        setIsAddAvailabilityModalVisible(false);
    }

    return(
        <>
            <div className="w-full flex">
                <div className="w-1/6">
                    <AdminNavigation />
                </div>
                <div className="w-5/6">
                    <div className="z-50 fixed top-0 right-0 w-5/6">
                        <Header />
                    </div>
                    <div className="px-5 py-16">
                        <div className="flex justify-between items-center">
                            <div>
                                DISPONIBILITE DU MINSTRE
                            </div> 
                            <div className="flex items-center gap-2 border px-2 py-1" onClick={()=> setIsAddAvailabilityModalVisible(true)}>
                                    <PlusOutlined />
                                    <div>Nouvelle disponibilité</div>
                            </div>
                        </div>
                        disponibilite admin
                        <div className="h-80 w-full">
                            <div className="gap-2">
                                {
                                    availabilities && availabilities.map((availability: any, index: any) => {
                                        return <div key={index} className="border rounded p-2 w-64 bg-gray-500">
                                            <div>Le { availability.date_availability }</div>
                                            <div className="flex gap-2">
                                                <div>De { availability.hour_debut } </div>
                                                <div>à { availability.hour_end } </div>
                                            </div>
                                            <div className="">
                                                {
                                                    availability.status_availability[0] === "Occupé" ? 
                                                    <div className="rounded text-yellow-500 flex gap-2 text-xs">
                                                        <WarningOutlined />
                                                        <div>{ availability.status_availability }</div>  
                                                    </div>
                                                    : (
                                                        availability.status_availability[0] === "Libre" ?
                                                    <div className="rounded text-green-500 flex gap-2 text-xs">
                                                        <CheckOutlined />
                                                        <div>{ availability.status_availability }</div>  
                                                    </div>                                                        
                                                    :
                                                    <div className="rounded text-red-500 flex gap-2 text-xs">
                                                        <CloseOutlined />
                                                        <div>{ availability.status_availability }</div>  
                                                    </div>                                                    
                                                    )
                                                } 
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button className='bg-red-500 hover:bg-red-600 text-white py-1 px-2 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'>
                                                    <CloseCircleFilled /> Annuler 
                                                </button>
                                            </div>
                                        </div>
                                    })
                                }
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
        </>
    )
}

export default AdminAvailability;