import { useState, useEffect } from "react";
import { CheckCircleFilled, CheckCircleOutlined, CheckOutlined, CloseOutlined, DownOutlined, EnvironmentOutlined, MailOutlined, MenuOutlined, PhoneOutlined, WarningOutlined } from "@ant-design/icons";
import { MenuProps, Dropdown, Modal, Select } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import Header from "../../../components/Header";
import { getRequestById } from "../../../api/request";
import { getAllFreeAvailability } from '../../../api/availability';
import { audienceCreate } from "../../../api/audience";
import dayjs from "dayjs";

const { Option } = Select;

function AdminOrganizeAudience() {
    const [request, setRequest] = useState<any>();
    const [audienceCredentials, setAudienceCredentials] = useState<any>({ user: '', availability: '', request: '' });
    let [availabilities, setAvailabilities] = useState<any[]>([]);
    let [availabilities_pref, setAvailabilitiesPref] = useState<any[]>([]);
    const [selectedAvailabilityId, setSelectedAvailabilityId] = useState('');
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    );
    let req = useParams();
    const navigate = useNavigate();
    let reqestId = req.id;

    useEffect(() => { 
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token);
        }
        fetchRequest();
        fetchAvailability();
        let count: number = 0;
        if(count < 2) {
        const intervalId = setInterval(() => {
            fetchFilterAvailability();
          }, 1000);
      
          count += 1;
          // Nettoyer l'intervalle lors du démontage
          return () => clearInterval(intervalId);
        }

    }, [])
    async function fetchRequest() {
        const token = localStorage.getItem('token');

        if(reqestId && token) {
            console.log("ito le id", reqestId)

            const response = await getRequestById(token,reqestId);

            if(response) {
                console.log("666",response)
                setRequest(response);
                console.log("777",response);
                setAudienceCredentials({
                    ...audienceCredentials,
                    user: response.user,
                    request: response._id,
                }); 
            }
             
        }
    }

    async function fetchAvailability() {
        const token = localStorage.getItem('token');
        if(token) {
            const response = await getAllFreeAvailability(token);
            if(response) {
                setAvailabilities(response.data);
            }
        }
    }

    async function fetchFilterAvailability() {
        const availability_pref: any = availabilities.filter((item: any) => {
            if(request) {
                return (
                    dayjs(item.date_initial) >= dayjs(request?.debut_initial) && 
                    dayjs(item.date_initial) <= dayjs(request?.end_initial)
                )    
            }
        })  
        setAvailabilitiesPref(availability_pref);
    }

      //handle select change
    const handleSelectChange = (value: any) => {
        setSelectedAvailabilityId(value);
        setAudienceCredentials({
            ...audienceCredentials,
            availability: value,
        });
    };

    const handleOrganizeSubmit = async () => {
        console.log("crevyv", audienceCredentials);
        const response = await audienceCreate(access_token,audienceCredentials);
        if(response?.status === 200 || response?.status === 201) {
            console.log("619",response)
            navigate("/admin/audience");
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
                    <div className="">
                        <div className="pl-10 px-5 pt-16 pb-5 w-full">
                            <div className="font-bold text-lg mb-6">Organiser une audience</div>
                            {
                                request && 
                                    <div>
                                    <div className="gap-2 flex justify-between">
                                        <div className="w-1/4">
                                            <div className=" border pt-6 rounded text-center">
                                                <img src={`data:image/png;base64,${request.profile_photo}`} alt="" className="w-3/4 h-48 object-cover mx-auto border" />
                                                <div className="font-bold text-lg">{ request.user_nom } { request.user_prenom }</div>
                                                <div className="flex justify-end px-8 py-2">
                                                </div>
                                                <div className="mx-auto w-full bg-gray-200 px-8 py-1">
                                                    <div className="flex gap-4 my-2">
                                                        <EnvironmentOutlined />
                                                        <div>cni </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <EnvironmentOutlined />
                                                        <div>user.adresse </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <MailOutlined />
                                                        <div> user.email </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <PhoneOutlined />
                                                        <div>+261 user.telephone </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="w-2/4" >
                                            <div className="border rounded p-4">
                                                <div className="mb-3 flex items-center gap-2">
                                                    <div className="text-md font-bold">
                                                        { request.type_request }
                                                    </div>
                                                    <div >
                                                        {
                                                            request.status_request[0] === "En attente" ? 
                                                            <div className="rounded bg-yellow-200 px-2 border border-yellow-500 flex gap-2 text-xs">
                                                                <WarningOutlined />
                                                                <div>{ request.status_request }</div>  
                                                            </div>
                                                            : (
                                                                request.status_request[0] === "Accepté" ?
                                                            <div className="rounded bg-green-200 px-2 border border-green-500 flex gap-2 text-xs">
                                                                <CheckOutlined />
                                                                <div>{ request.status_request }</div>  
                                                            </div>
                                                            :
                                                            <div className="rounded bg-red-200 px-2 border border-red-500 flex gap-2 text-xs">
                                                                <CloseOutlined />
                                                                <div>{ request.status_request }</div>  
                                                            </div>                                                    
                                                            )
                                                        } 
                                                    </div>
                                                    <div>soumise le <span className="font-semibold"> {request.request_creation}</span></div>
                                                </div>
                                                    <div className="text-sm text-gray-500">Motif: </div>
                                                    <div className=""> { request.object } </div>
                                            </div>
                                            
                                        </div>
                                        <div className="w-1/4">
                                            <div className="border rounded p-5">
                                                <div className="font-bold text-md mb-3">Préférence</div>
                                                <div className="text-sm text-gray-500">Une audience demandé pour la semaine de :</div>
                                                <div className="flex justify-between">
                                                    <div className="font-semibold"> { request.date_wanted_debut } </div>
                                                    <div className="text-sm text-gray-500">à</div>
                                                    <div className="font-semibold"> { request.date_wanted_end } </div>
                                                </div>
                                            </div>
                                            <div className="border rounded my-4 p-5">
                                                <div className="font-bold text-md mb-3">Organisation</div>
                                                <label htmlFor='idproduit' className="text-sm text-gray-500">Les disponibilités : </label><br />
                                                <Select
                                                    value={selectedAvailabilityId}
                                                    onChange={handleSelectChange}
                                                    className='w-full my-1'
                                                    showSearch
                                                    optionFilterProp="children"
                                                    filterOption={(input: any, option: any) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    <Option value="">Sélectionnez un disponibilité</Option>
                                                    {
                                                    availabilities_pref.map((ava: any, index) => {
                                                        if(availabilities.length < 1) {
                                                            return(
                                                                <Option key={index} value={ava._id}>
                                                                    <div>
                                                                        <CloseOutlined className="" />
                                                                        Pas de disponibilité pour la semaine preféré
                                                                    </div>
                                                                </Option>
                                                            )
                                                        } else {
                                                            return(
                                                                <Option key={index} value={ava._id}>
                                                                    <div className="flex gap-1">
                                                                        <CheckCircleOutlined className="text-green-500" />
                                                                        { `${ava.date_availability} de ${ava.hour_debut} à ${ava.hour_end}` }
                                                                    </div>
                                                                </Option>
                                                            )
                                                        }
                                                    })
                                                    }
                                                </Select>
                                                <div className="flex justify-end mt-2">
                                                    <button onClick={handleOrganizeSubmit} className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500' >Organiser</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminOrganizeAudience;