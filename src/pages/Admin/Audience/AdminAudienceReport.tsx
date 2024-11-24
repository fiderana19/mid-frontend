import { useState, useEffect } from "react";
import { CheckCircleFilled, CheckCircleOutlined, CheckOutlined, CloseCircleFilled, CloseOutlined, EnvironmentOutlined, LoadingOutlined, MailOutlined, PhoneOutlined, WarningOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import Header from "../../../components/Header";
import { audienceReport, getAudienceById } from "../../../api/audience";
import { getAllFreeAvailability } from "../../../api/availability";
import dayjs from "dayjs";
import { message, Select } from "antd";
const { Option } = Select;

function AdminAudienceReport() {
    const [audience, setAudience] = useState<any>();
    let [apiLoading, setApiLoading] = useState<boolean>(false);
    let [selectError, setSelectError] = useState<string>('');
    let [availabilities_pref, setAvailabilitiesPref] = useState<any[]>([]);
    const [reportCredentials, setReportCredentials] = useState<any>({ new_availability: '', old_availability: '' });
    const [selectedAvailabilityId, setSelectedAvailabilityId] = useState('');
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    );
    let req = useParams();
    const navigate = useNavigate();
    let audienceId = req.id;

    useEffect(() => { 
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token);
        }
        fetchAudience()
        fetchAvailability()
    }, [])

    const fetchAudience = async () => {
        const token = localStorage.getItem('token');
        if(audienceId && token) {
            const response = await getAudienceById(token,audienceId);
            if(response) {
                setAudience(response.data);
                setReportCredentials((prev: any) => ({...prev, old_availability: response?.data.availability}));
            }
        }
    }

    async function fetchAvailability() {
        const token = localStorage.getItem('token');
        if(audienceId && token) {
            const response = await getAllFreeAvailability(token);
            const audi = await getAudienceById(token,audienceId);
            const availability_pref: any = response?.data.filter((item: any) => {
                return (
                    dayjs(item.date_initial) >= dayjs(audi?.data.date_initial) && 
                    dayjs(item.date_initial) <= dayjs(audi?.data.request_date_wanted_end_initial)
                )            
            })  
            setAvailabilitiesPref(availability_pref);
        }
    }

    //handle select change
    const handleSelectChange = (value: any) => {
        setSelectedAvailabilityId(value);
        setReportCredentials((prev: any) => ({...prev, new_availability: value}));
    };
    
    const handleReportSubmit = async () => {
        setSelectError('');
        if(!selectedAvailabilityId) {
            setSelectError("Veuillez selectionner un disponibilité !")
        }
        if(audienceId && selectedAvailabilityId) {
            setApiLoading(true);
            const response = await audienceReport(access_token,audienceId,reportCredentials);
            if(response?.status === 200 || response?.status === 201) {
                setApiLoading(false);
                message.success("Audience reportée !");
                navigate("/admin/audience");    
            }
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
                            {
                                audience && 
                                    <div>
                                   <div className="font-bold text-lg mb-6">Reporter l'audience du { audience.availability_date } </div>
                                    <div className="gap-2 flex justify-between">
                                    <div className="w-1/4">
                                            <div className=" border pt-6 rounded text-center">
                                                <img src={`data:image/png;base64,${audience.user_profile_photo}`} alt="" className="w-3/4 h-48 object-cover mx-auto border" />
                                                <div className="font-bold text-lg">{ audience.user_nom } { audience.user_prenom }</div>
                                                <div className="flex justify-end px-8 py-2">
                                                </div>
                                                <div className="mx-auto w-full bg-gray-200 px-8 py-1">
                                                    <div className="flex gap-4 my-2">
                                                        <PhoneOutlined />
                                                        <div> { audience.user_cni } </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <EnvironmentOutlined />
                                                        <div> { audience.user_adresse } </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <MailOutlined />
                                                        <div> { audience.user_email } </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <PhoneOutlined />
                                                        <div>+261 { audience.user_telephone } </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="w-2/4" >
                                            <div className="border rounded p-4">
                                                <div className="flex justify-end">
                                                    { audience.status_audience[0] === "Fixé" ? 
                                                        <div className="max-w-max">
                                                            <div className="flex items-center bg-blue-200 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                <span className="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                                                                { audience.status_audience }
                                                            </div>       
                                                        </div>                                 
                                                        : (
                                                            audience.status_audience[0] === "Reporté" ?
                                                            <div className="max-w-max">
                                                                <div className="flex items-center bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                    <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                                                                    { audience.status_audience }
                                                                </div>       
                                                            </div>                                 
                                                            : (
                                                                audience.status_audience[0] === "Classé" ?
                                                                <div className="max-w-max">
                                                                    <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                        <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                                        { audience.status_audience }
                                                                    </div>       
                                                                </div>                                 
                                                                :
                                                                (
                                                                    audience.status_audience[0] === "Absent" ?
                                                                    <div className="max-w-max">
                                                                        <div className="flex items-center bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                            <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                                                                            { audience.status_audience }
                                                                        </div>       
                                                                    </div>                                 
                                                                    :
                                                                    <div className="max-w-max">
                                                                        <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                                                            { audience.status_audience }
                                                                        </div>       
                                                                    </div>                                 
                                                                )
                                                            )
                                                        )
                                                    }     
                                                </div>
                                                <div className="mb-3 flex items-center gap-2">
                                                    <div className="text-md font-bold">
                                                        { audience.request_type }
                                                    </div>
                                                    
                                                    <div>soumise le <span className="font-semibold"> {audience.request_creation}</span></div>
                                                </div>
                                                    <div className="text-sm text-gray-500">Motif: </div>
                                                    <div className=""> { audience.request_object } </div>
                                            </div>
                                            
                                        </div>
                                        <div className="w-1/4">
                                            <div className="border rounded p-5">
                                                <div className="font-bold text-md mb-3">Organisation</div>
                                                <div className="text-sm text-gray-500">Cette audience est organisée pour :</div>
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm text-gray-500">Date</div>
                                                    <div className="font-semibold"> { audience.availability_date } </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm text-gray-500">De</div>
                                                    <div className="font-semibold"> { audience.availability_hour_debut } </div>
                                                    <div className="text-sm text-gray-500">à</div>
                                                    <div className="font-semibold"> { audience.availability_hour_end } </div>
                                                </div>
                                            </div>
                                            <div className="border rounded p-5">
                                                <div className="font-bold text-md mb-3">Report</div>
                                                    <label htmlFor='idproduit' className="text-sm text-gray-500">Les disponibilités pour le report : </label><br />
                                                    <Select
                                                        value={selectedAvailabilityId}
                                                        onChange={handleSelectChange}
                                                        className={ selectError ? 'w-full my-1 border border-red-500 rounded' : 'w-full my-1'  }
                                                        showSearch
                                                        optionFilterProp="children"
                                                        filterOption={(input: any, option: any) =>
                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        <Option value="">Sélectionnez un disponibilité</Option>
                                                        {
                                                        availabilities_pref.map((ava: any, index) => {
                                                            if(availabilities_pref.length < 1) {
                                                                return(
                                                                    <Option key={index}>
                                                                        <div>
                                                                            <CloseOutlined className="" />
                                                                            Pas de disponibilité pour la semaine preféré
                                                                        </div>
                                                                    </Option>
                                                                )
                                                            }
                                                                return(
                                                                    <Option key={index} value={ava._id}>
                                                                        <div className="flex gap-1">
                                                                            <CheckCircleOutlined className="text-green-500" />
                                                                            { `${ava.date_availability} de ${ava.hour_debut} à ${ava.hour_end}` }
                                                                        </div>
                                                                    </Option>
                                                                )
                                                        })
                                                        }
                                                    </Select>
                                                    {selectError && <div className="text-left text-red-500 text-xs">{selectError}</div>}
                                                    <div className="flex justify-end mt-2">
                                                        <button 
                                                            onClick={handleReportSubmit} 
                                                            disabled={ apiLoading ? true : false }
                                                            className= { apiLoading ? "bg-blue-400 cursor-not-allowed flex gap-2 items-center border mt-2 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500" : "flex gap-2 items-center border mt-2 bg-blue-500 hover:border-blue-600 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500" } 
                                                        >   
                                                        { apiLoading && <LoadingOutlined /> }
                                                        <div>Reporter</div>                                                    
                                                    </button>
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

export default AdminAudienceReport;