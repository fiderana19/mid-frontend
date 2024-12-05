import { FunctionComponent, useEffect, useState } from "react";
import UserNavigation from "../../../components/Navigation/UserNavigation";
import { InfoCircleOutlined } from "@ant-design/icons";
import { DatePicker, DatePickerProps, message, Select } from "antd";
import { getWeekStartAndEnd } from "../../../utils/GetWeek";
import { RequestAddInterface } from "../../../interfaces/Request";
import { requestCreate } from "../../../api/request";
import { useNavigate } from "react-router-dom";
import { HttpStatus } from "../../../constants/Http_status";

const UserAddDemande: FunctionComponent = () => {
    const [requestCredentials, setRequestCredentials] = useState<RequestAddInterface>({type_request: '', object: '', date_wanted_debut: '', date_wanted_end: ''});
    const [access_token, setAccessToken] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token);
        }
    }, []);

    const handleSelectChange = (value: string) => {
        setRequestCredentials({
            ...requestCredentials,
            type_request: value,
        });
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setRequestCredentials((prev) => ({...prev, [name]: value}));
    }
      

    const handleDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        const {date_debut, date_end } = getWeekStartAndEnd(date);
        setRequestCredentials({
            ...requestCredentials,
            date_wanted_debut: date_debut,
            date_wanted_end: date_end
        });
      };
      
    const handleRequestSubmit = async () => {
        const response = await requestCreate(access_token, requestCredentials);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
            message.success("Demande d'audience soumise !")
            navigate("/user/demande")    
        }
    }
      

    return(
        <div className="w-full bg-four min-h-screen">
            <UserNavigation />
            <div className="py-16 sm:px-10 px-4 text-center">
                <div className="font-bold text-2xl mt-10">NOUVELLE DEMANDE D'AUDIENCE</div>
                <div className="mx-auto my-5 p-4 bg-white shadow-md rounded sm:w-80 w-full">
                    <div className='w-60 my-4 mx-auto shadow-sm focus:shadow'>
                        <div className="text-left text-xs font-bold">
                            Type de la demande
                        </div>
                        <Select
                            className="w-full text-left"
                            placeholder="Selectionner le type de la requête"
                            onChange={handleSelectChange}
                            options={[
                            {
                                value: "Demande d'information",
                                label: "Demande d'information",
                            },
                            {
                                value: 'Requête',
                                label: 'Requête',
                            },
                            {
                                value: 'Proposition',
                                label: 'Proposition',
                            },
                            ]}
                        />
                    </div>
                    <div className='w-60 my-4 mx-auto'>
                        <div className="text-left text-xs font-bold">
                            Date souhaitée
                        </div>
                        <DatePicker 
                            className="w-full py-1.5 bg-transparent placeholder:text-slate-400" 
                            placeholder="Date souhaitée..."
                            onChange={handleDateChange} 
                            picker="week" 
                        />
                    </div>
                    <div className='w-60 my-4 mx-auto'>
                        <div className="text-left text-xs font-bold">
                            Motif du demande
                        </div>
                        <div className="relative">
                            <input 
                                name="object" 
                                onChange={handleChange} 
                                placeholder="Saisir le motif..."
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            />
                            <InfoCircleOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                        </div>
                    </div>
                    <button onClick={handleRequestSubmit} className='bg-green-500 border border-green-600 hover:transition-colors hover:bg-green-700 text-white font-latobold py-2 px-4 rounded'>SOUMETTRE</button>
                </div>
            </div>
        </div>
    )
}

export default UserAddDemande;