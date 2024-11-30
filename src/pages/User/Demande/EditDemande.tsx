import { FunctionComponent, useEffect, useState } from "react";
import UserNavigation from "../../../components/Navigation/UserNavigation";
import { UserOutlined } from "@ant-design/icons";
import { DatePicker, DatePickerProps, message, Select } from "antd";
import { getWeekStartAndEnd } from '../../../utils/GetWeek';
import { RequestAddInterface } from "../../../interfaces/Request";
import { getRequestById, requestEdit } from "../../../api/request";
import { useNavigate, useParams } from "react-router-dom";

const UserEditDemande: FunctionComponent = () => {
    const [request, setRequest] = useState<any>();
    const [requestCredentials, setRequestCredentials] = useState<RequestAddInterface>({type_request: '', object: '', date_wanted_debut: '', date_wanted_end: ''});
    const [access_token, setAccessToken] = useState<string | null>(localStorage.getItem('token'));
    const navigate = useNavigate();
    let req = useParams();
    let reqestId = req.id;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token);
        }
        fetchRequest()
    }, []);

    async function fetchRequest() {
        const token = localStorage.getItem('token');

        if(reqestId && token) {
            const response = await getRequestById(token,reqestId);

            setRequestCredentials({
                ...requestCredentials,
                type_request: response.type_request[0],
                object: response.object,
                date_wanted_debut: response.wanted_debut,
                date_wanted_end: response.wanted_end    
            });
            setRequest(response)    
        }
    }

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
        if(reqestId) {
            const response = await requestEdit(access_token,reqestId, requestCredentials);
            if(response?.status === 200 || response?.status === 201) {
                console.log(response);
                message.success("Demande d'audience modifiée !");
                navigate("/user/demande");
            }    
        }
    }
      

    return(
        <div className="w-full bg-four min-h-screen">
            <UserNavigation />
            <div className="py-16 sm:px-10 px-4 text-center">
                <div className="font-latobold text-2xl mt-10">MODIFIER UNE DEMANDE </div>
                {
                    request &&
                    <div className="mx-auto my-5 p-4 bg-white shadow-md rounded sm:w-80 w-full">
                        <div className="mx-auto flex w-60 items-center gap-2">
                            <img src={`data:image/png;base64,${request.profile_photo}`} alt="" className="w-11 h-11 rounded-full object-cover border" />
                        <div className="">
                                <span>Soumise le </span>
                                <span className="font-latobold">
                                    { request.request_creation }
                                </span>
                            </div>
                        </div>
                        <div className='w-60 my-4 mx-auto shadow-sm focus:shadow'>
                            <div className="text-left text-xs font-latobold">
                                Type de la demande
                            </div>
                            <Select
                                className="w-full text-left"
                                placeholder="Selectionner le type de la requête"
                                onChange={handleSelectChange}
                                defaultValue={requestCredentials.type_request}
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
                            <div className="text-left text-xs font-latobold">
                                Date souhaitée
                            </div>
                            <DatePicker 
                                className="w-full py-1.5 bg-transparent placeholder:text-slate-400" 
                                placeholder={requestCredentials.date_wanted_debut}
                                onChange={handleDateChange} 
                                picker="week" 
                            />
                        </div>
                        <div className='w-60 my-4 mx-auto'>
                            <div className="text-left text-xs font-latobold">
                                Motif de la demande
                            </div>
                            <div className="relative">
                                <input 
                                    name="object" 
                                    value={requestCredentials.object}
                                    onChange={handleChange}
                                    placeholder="Saisir le motif..."
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                />
                                <UserOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                            </div>
                        </div>
                        <button onClick={handleRequestSubmit} className='bg-blue-500 hover:bg-blue-700 text-white font-latobold py-2 px-4 rounded'>MODIFIER</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserEditDemande;