import { useState } from "react";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import Header from "../../../components/Header";
import {QrReader} from "react-qr-reader";
import { useNavigate } from "react-router-dom";

function AdminAudienceQRCode() {
    const [data, setData] = useState<any>('Aucun QR Code scanné !');
    const navigate = useNavigate();

    const handleScan = (data: any) => {
        if (data) {
            setData(data);
            navigate(`/admin/audience/scanned/${data}`)
        }
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
                    <div className="pl-10 px-5 pt-16 pb-5 w-full">
                        <div className="text-lg font-bold mx-auto mt-6 max-w-max">SCANNER UN QRCODE</div>
                        <div className="w-96 mx-auto">
                            <QrReader
                                key="user"
                                constraints={{ facingMode: 'user' }}
                                onResult={(result:any, error) => {
                                    if (!!result) {
                                        console.log(result?.text)
                                        handleScan(result?.text);
                                    }
                        
                                    if (!!error) {
                                    }
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="mx-auto max-w-max bg-white p-4 rounded shadow-md">{ data }</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAudienceQRCode;