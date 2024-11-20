import Header from "../../../components/Header";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker, DatePickerProps, Select, Space, TimePicker, TimePickerProps } from "antd";
import dayjs from "dayjs";

function AdminAudienceSearch() {
    const [selectedDateType, setSelectedDateType] = useState<string>('week');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [audiences, setAudiences] = useState<any[]>([]);
    const [filteredAudiences, setFilteredAudiences] = useState<any[]>([]);
    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [selectedAudience, setSelectedAudience] = useState<string>();
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [filterRef, setFilterRef] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<string>('');
    const [searchRef, setSearchRef] = useState<string>('');
    const navigate = useNavigate();
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
        console.log(dateString);
    };

    const handleSelectDateChange = (value: string) => {
        setSelectedDateType(value);
        console.log(`selected ${value}`);
    };

    const handleStatusChange = (value: string) => {
        setSelectedStatus(value);
        console.log(`selected ${value}`);
    };
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
                    <div className="pl-10 pr-5 py-16">
                        <div className="flex justify-between items-center my-4">
                            <div className="text-lg font-latobold">Rechercher des audiences</div>
                        </div>
                        <div className="flex gap-1 justify-center">
                            <div>
                                <div className="text-left text-xs font-latobold">
                                    Statut
                                </div>
                                <Select
                                    defaultValue="Semaine"
                                    style={{ width: 120 }}
                                    onChange={handleStatusChange}
                                    className="bg-transparent"
                                    options={[
                                        { value: 'week', label: 'Semaine' },
                                        { value: 'month', label: 'Mois' },
                                        { value: 'year', label: 'Année' },
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
                                        className="bg-transparent max-w-max"
                                        options={[
                                            { value: 'week', label: 'Semaine' },
                                            { value: 'month', label: 'Mois' },
                                            { value: 'year', label: 'Année' },
                                        ]}
                                    />
                                    {
                                        (selectedDateType && selectedDateType === "week") ?
                                        <DatePicker onChange={onDateChange} picker="week" /> 
                                        :
                                        (
                                            (selectedDateType && selectedDateType === "month") ?
                                            <DatePicker onChange={onDateChange} picker="month" />
                                            :
                                            (
                                                <DatePicker onChange={onDateChange} picker="year" />
                                            )
                                        )
                                    }
                                </div>
                            </div>
                            <div>
                                <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-latobold py-1 px-4 rounded'>RECHERCHER</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAudienceSearch;

