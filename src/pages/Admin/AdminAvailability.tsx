import { Calendar, DatePicker, Modal, TimePicker } from "antd";
import Header from "../../components/Header";
import AdminNavigation from "../../components/Navigation/AdminNavigation";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { AssignDateToTime, ToLocalISOString } from '../../utils/toIsoString';
import { CreateAvailabilityInterface } from "../../interfaces/Availability";

function AdminAvailability() {
    const [createAvailabilityCredentials, setCreateAvailabilityCredentials] = useState<CreateAvailabilityInterface>({date_availability: '', hour_debut: '', hour_end: ''});
    const [isAddAvailabilityModalVisible, setIsAddAvailabilityModalVisible] = useState<boolean>(false);
    const [day, setDay] = useState<any>()

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
                            <Calendar className="" style={{ height: 800 }} />
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
                        {/* <div className='w-60 my-4 mx-auto'>
                            <DatePicker onChange={handleDateChange} className="w-full py-1.5 bg-transparent placeholder:text-slate-400" placeholder="Date de la disponibilité..."  />
                        </div> */}
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