import Header from "../../../components/Header";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import { useState, useEffect } from "react";
import { DatePicker, DatePickerProps, Modal, Select } from "antd";
import { getWeekDates } from "../../../utils/GetWeek";
import { getMonthDates } from "../../../utils/GetMonth";
import { getYearDates } from "../../../utils/GetYear";
import { audienceSearch } from "../../../api/audience";
import GeneratePdf from "../../../utils/setPdfGenerate";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";

function AdminAudienceSearch() {
    const [selectedDateType, setSelectedDateType] = useState<string>('week');
    const [selectDateError, setSelectDateError] = useState<string>('');
    const [totalAudiences, setTotalAudiences] = useState<number>();
    const [searchCredentials, setSearchCredentials] = useState<any>({status_audience: 'Fixé', date_debut: '', date_end: ''});
    const [audiences, setAudiences] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [isPdfModalVisible, setIsPdfModalVisible] = useState(false);
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    );

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            setAccessToken(token);
        }
    }, [])

    const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        if(selectedDateType === 'week') {
            const { date_debut, date_end } = getWeekDates(dateString);
            setSearchCredentials({
                ...searchCredentials,
                date_debut: date_debut,
                date_end: date_end
            });
            console.log(date_debut, date_end)
        } else if(selectedDateType === 'month') {
            const { date_debut, date_end } = getMonthDates(dateString);
            setSearchCredentials({
                ...searchCredentials,
                date_debut: date_debut,
                date_end: date_end
            });
        } else if(selectedDateType === 'year') {
            const { date_debut, date_end } = getYearDates(dateString);
            setSearchCredentials({
                ...searchCredentials,
                date_debut: date_debut,
                date_end: date_end
            });
        }
    };

    const handleSelectDateChange = (value: string) => {
        setSelectedDateType(value);
    };

    const handleStatusChange = (value: string) => {
        setSearchCredentials({
            ...searchCredentials,
            status_audience: value,
        });
    };

    const handleSearchSubmit = async () => {
        setSelectDateError("");

        if(searchCredentials.date_debut === '' && searchCredentials.date_end === '') {
            setSelectDateError("Veuillez selectionner un date !");
        }
        if(searchCredentials.date_end !== '' && searchCredentials.date_end !== '') {
            console.log(searchCredentials, access_token);
            setIsLoading(true);
            const response = await audienceSearch(access_token, searchCredentials);
            setIsSearching(true);
            if(response?.status === 200 || response?.status === 201) {
                setAudiences(response.data);
                setTotalAudiences(response.data.length);
                setIsLoading(false);
            }
        }
    }

    const handleGenerateSubmit = async () => {
        setIsPdfModalVisible(true);
    }

    return(
        <>
            <div className="w-full flex min-h-screen bg-four">
                <div className="md:w-52 sm:block hidden">
                    <AdminNavigation />
                </div>
                <div className="w-full">
                    <div className="z-40 fixed top-0 right-0 w-full">
                        <Header />
                    </div>
                    <div className="pl-10 pr-5 py-16 relative">
                        <div className="flex justify-between items-center my-4">
                            <div className="text-lg font-latobold">Rechercher des audiences</div>
                        </div>
                        <div className="flex gap-1 justify-center">
                            <div>
                                <div className="text-left text-xs font-latobold">
                                    Statut
                                </div>
                                <Select
                                    defaultValue="Fixé"
                                    style={{ width: 120 }}
                                    onChange={handleStatusChange}
                                    className="bg-transparent"
                                    options={[
                                        { value: 'Fixé', label: 'Fixé' },
                                        { value: 'Reporté', label: 'Reporté' },
                                        { value: 'Annulé', label: 'Annulé' },
                                        { value: 'Classé', label: 'Classé' },
                                        { value: 'Absent', label: 'Absent' },
                                    ]}
                                />
                            </div>
                            <div>
                                <div className="text-left text-xs font-latobold">
                                    Date
                                </div>
                                <div className="flex gap-1">
                                    <Select
                                        defaultValue="Semaine"
                                        style={{ width: 120 }}
                                        onChange={handleSelectDateChange}
                                        className={selectDateError ? "border rounded-lg border-red-500 max-w-max" : "max-w-max" } 
                                        options={[
                                            { value: 'week', label: 'Semaine' },
                                            { value: 'month', label: 'Mois' },
                                            { value: 'year', label: 'Année' },
                                        ]}
                                    />
                                    {
                                        (selectedDateType && selectedDateType === "week") ?
                                        <DatePicker onChange={onDateChange} className={selectDateError ? "border border-red-500 max-w-max" : "max-w-max" } picker="week" /> 
                                        :
                                        (
                                            (selectedDateType && selectedDateType === "month") ?
                                            <DatePicker onChange={onDateChange} className={selectDateError ? "border border-red-500 max-w-max" : "max-w-max" } picker="month" />
                                            :
                                            (
                                                <DatePicker onChange={onDateChange} className={selectDateError ? "border border-red-500 max-w-max" : "max-w-max" }  picker="year" />
                                            )
                                        )
                                    }
                                </div>
                                { selectDateError && <div className="text-xs text-red-500"> {selectDateError} </div> }
                            </div>
                            <div>
                                <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-latobold py-1 px-4 rounded' onClick={handleSearchSubmit}>RECHERCHER</button>
                            </div>
                        </div>
                        {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
                        {
                            isSearching && 
                            <div className="">
                                <div className="font-latobold my-4 mx-auto max-w-max text-xl">RESULTAT DE LA RECHERCHE</div>
                                <table className='min-w-full divide-y divide-gray-200'>
                                    <thead>
                                        <tr>
                                            <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom et prenom(s)</th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>CIN</th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Ref</th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                        </tr>
                                    </thead> 
                                    <tbody className='bg-white divide-y divide-gray-200'>
                                        {
                                            audiences && audiences.map((audience: any, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className='md:px-6 py-1 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>
                                                            <img src={`data:image/png;base64,${audience.user_profile_photo}`} className="rounded-full border border-slate-400 w-9 h-9 object-cover" />
                                                        </td>
                                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.user_nom } { audience.user_prenom }  </td>
                                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.user_cni }  </td>
                                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.ref_audience }  </td>
                                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.request_type }  </td>
                                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.availability_date } de { audience.availability_hour_debut } à { audience.availability_hour_end }  </td>
                                                    <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>   
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
                                                    </td>
                                                </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                {
                                    (audiences && audiences.length) < 1 &&
                                        <div className="mx-auto flex justify-center w-full my-4 text-gray-500">
                                            <div className="text-center">
                                                <CloseOutlined className="text-5xl" />
                                                <div className="my-2">
                                                Aucune audience
                                                </div>
                                            </div>
                                        </div>                                
                                }
                        </div>
                        }
                        {
                            isSearching && audiences &&
                            <div className="fixed bottom-4 right-0 px-4 bg-four">
                                <button 
                                    className='bg-green-500 hover:bg-green-700 text-white font-latobold py-1 px-4 rounded'
                                    onClick={handleGenerateSubmit}
                                > GENERER UN RAPPORT</button>
                            </div>
                        }
                    </div>
                    <div className="mx-auto my-10 w-full bg-red-500">
                    </div>
                </div>
                <Modal 
                    title="Rapport"
                    open={isPdfModalVisible}
                    onCancel={() => setIsPdfModalVisible(false)}
                    onClose={() => setIsPdfModalVisible(false)}
                    footer={null}
                >
                    <div className="w-full h-3/4">
                    {
                        audiences && searchCredentials && totalAudiences &&
                        <GeneratePdf audiences={audiences} audience_status={searchCredentials.status_audience} date_debut={searchCredentials.date_debut} date_end={searchCredentials.date_end} total={totalAudiences} />
                    }
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminAudienceSearch;

