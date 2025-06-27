import { LoadingOutlined } from "@ant-design/icons";
import React, { lazy, Suspense, useState } from "react";
const AdminNavigation = lazy(() => import("../../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../../components/Header"));
import {QrReader} from "react-qr-reader";
import { useNavigate } from "react-router-dom";

const AdminAudienceQRCode: React.FC = () => {
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
                    <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                        <AdminNavigation />
                    </Suspense>
                </div>
                <div className="w-full">
                    <div className="z-40 fixed top-0 right-0 w-full">
                        <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                            <Header />
                        </Suspense>
                    </div>
                    <div className="pl-10 px-5 pt-16 pb-5 w-full">
                        <div className="text-lg font-bold mx-auto mt-6 max-w-max">SCANNER UN QRCODE</div>
                        <div className="w-96 mx-auto">
                            <QrReader
                                key="user"
                                constraints={{ facingMode: 'user' }}
                                onResult={(result:any, error) => {
                                    if (!!result) {
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