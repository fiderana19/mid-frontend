import Header from "../../../components/Header";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import { audienceCancel, getAllAudience } from '../../../api/audience';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleFilled, CloseCircleFilled, CloseCircleOutlined, CloseOutlined, DownOutlined, EditFilled, EyeOutlined, FilterOutlined, LoadingOutlined, MenuOutlined, QrcodeOutlined, WarningFilled } from "@ant-design/icons";
import { DatePicker, Dropdown, Input, MenuProps, message, Modal } from "antd";

function AdminAudienceSearch() {
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
                        <div className='w-60 my-4 mx-auto'>
                        <DatePicker 
                            className="w-full py-1.5 bg-transparent placeholder:text-slate-400"
                            placeholder= "Date debut..."  />
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAudienceSearch;

