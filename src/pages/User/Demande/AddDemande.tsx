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
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [objectError, setObjectError] = useState<string>('');
    const [typeError, setTypeError] = useState<string>('');
    const [newDateError, setDateError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token);
        }
    }, []);

    const handleSelectChange = (value: string) => {
        setDateError('');
        setObjectError('');
        setTypeError('');

        setRequestCredentials({
            ...requestCredentials,
            type_request: value,
        });
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateError('');
        setObjectError('');
        setTypeError('');

        const {name, value} = e.target;
        setRequestCredentials((prev) => ({...prev, [name]: value}));
    }
      
    const handleDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        setDateError('');
        setObjectError('');
        setTypeError('');

        const {date_debut, date_end } = getWeekStartAndEnd(date);
        setSelectedDate(date_debut);
        setRequestCredentials({
            ...requestCredentials,
            date_wanted_debut: date_debut,
            date_wanted_end: date_end
        });
      };
      
    const handleRequestSubmit = async () => {
        setDateError('');
        setObjectError('');
        setTypeError('');

        if(requestCredentials.object === '') {
            setObjectError("Veuillez entrer le motif de votre demande !");
        }
        if(requestCredentials.type_request === '') {
            setTypeError("Veuillez selectionner le type de la demande !");
        }
        if(selectedDate === '') {
            setDateError("Veuillez selectionner un date !");
        }
        if(requestCredentials.object !== '' && selectedDate !== '' && requestCredentials.type_request !== '') {
            const response = await requestCreate(access_token, requestCredentials);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                message.success("Demande d'audience soumise !")
                navigate("/user/demande")    
            }
        }
    }
      

    return(
        <div className="w-full bg-four min-h-screen">
            <UserNavigation />
            <div className="py-16 sm:px-10 px-4 text-center">
                <div className="font-bold text-2xl mt-10">NOUVELLE DEMANDE D'AUDIENCE</div>
                <div className="mx-auto my-5 p-4 bg-white shadow-md rounded sm:w-80 w-full">
                    <div className='w-60 my-4 mx-auto'>
                        <div className="text-left text-xs font-bold">
                            Type de la demande
                        </div>
                        <Select
                            className={ typeError ? "w-full text-left border border-red-500 rounded-md" : "w-full text-left" }
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
                        { typeError && <div className="text-xs text-red-500">{ typeError }</div> }
                    </div>
                    <div className='w-60 my-4 mx-auto'>
                        <div className="text-left text-xs font-bold">
                            Date souhaitée
                        </div>
                        <DatePicker 
                            className={ newDateError ?  "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-red-500 rounded-md py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" :  "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" }
                            placeholder="Date souhaitée..."
                            onChange={handleDateChange} 
                            picker="week" 
                        />
                        { newDateError && <div className="text-xs text-left text-red-500">{ newDateError }</div> }
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
                                className={ objectError ?  "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-red-500 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" :  "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" }
                            />
                            <InfoCircleOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                        </div>
                        { objectError && <div className="text-xs text-red-500">{ objectError }</div> }
                    </div>
                    <button onClick={handleRequestSubmit} className='bg-green-500 border border-green-600 hover:transition-colors hover:bg-green-700 text-white font-latobold py-2 px-4 rounded'>SOUMETTRE</button>
                </div>
            </div>
        </div>
    )
}

export default UserAddDemande;