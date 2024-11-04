import { useState, useEffect } from "react";
import { CheckOutlined, CloseOutlined, DownOutlined, MenuOutlined, WarningOutlined } from "@ant-design/icons";
import { MenuProps, Dropdown, Modal, Select } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import Header from "../../../components/Header";
import { getRequestById } from "../../../api/request";
import { getAllFreeAvailability } from '../../../api/availability';
import { audienceCreate } from "../../../api/audience";

const { Option } = Select;

function AdminOrganizeAudience() {
    const [request, setRequest] = useState<any>();
    const [audienceCredentials, setAudienceCredentials] = useState<any>({ user: '', availability: '', request: '' });
    let [availabilities, setAvailabilities] = useState<any[]>([]);
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
    }, [])
    async function fetchRequest() {
        const token = localStorage.getItem('token');

        if(reqestId && token) {
            console.log("ito le id", reqestId)

            const response = await getRequestById(token,reqestId);

            console.log(response)
            setRequest(response)  
            setAudienceCredentials({
                ...audienceCredentials,
                user: response.user,
                request: response._id,
            });  
        }
    }

    async function fetchAvailability() {
        const token = localStorage.getItem('token');

        if(token) {
            const response = await getAllFreeAvailability(token);

            console.log("h777",response)
            if(response) {
                setAvailabilities(response.data);    
            }
        }
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
        console.log(response)
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
                        <label htmlFor='idproduit'>Les disponibilité : </label><br />
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
                            availabilities.map((ava: any, index) => {
                                return(
                                <Option key={index} value={ava._id}>
                                { `${ava.date_availability} - ${ava.hour_debut} ${ava.hour_end}` }
                                </Option>
                                )
                            })
                            }
                        </Select>

                        <div className="">
                            <div className="text-lg font-bold mb-4">ORGANISER UNE AUDIENCE</div>
                            <div className="px-5 py-16">
                                {
                                    request && 
                                    <div className="text-center">
                                    <div className="font-bold">{ request.user_nom }</div>
                                    <div className="font-bold">{ request.user_prenom }</div>
                                    <div className="font-bold">{ request.user_cni }</div>
                                    <div className="font-bold">{ request.type_request }</div>
                                    <div className="font-bold">{ request.date_wanted_debut }</div>
                                    <div className="font-bold">{ request.date_wanted_end }</div>
                                    <div className="font-bold">{ request.object }</div>
                                    {
                                        request.status_request[0] === "En attente" ? 
                                                            <div className="rounded text-yellow-500 flex gap-2 text-xs">
                                                                <WarningOutlined />
                                                                <div>{ request.status_request }</div>  
                                                            </div>
                                                            : (
                                                                request.status_request[0] === "Accepté" ?
                                                            <div className="rounded text-green-500 flex gap-2 text-xs">
                                                                <CheckOutlined />
                                                                <div>{ request.status_request }</div>  
                                                            </div>                                                        :
                                                            <div className="rounded text-yellow-500 flex gap-2 text-xs">
                                                                <CloseOutlined />
                                                                <div>{ request.status_request }</div>  
                                                            </div>                                                    
                                                            )
                                                        }  

                                    <button onClick={handleOrganizeSubmit} className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500' >Organiser</button>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminOrganizeAudience;