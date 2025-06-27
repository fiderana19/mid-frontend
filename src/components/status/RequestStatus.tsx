import { REQUEST_STATUS } from "@/constants/StatusValue";
import React from "react";

interface StatusProps  {
    value?: string;
}

const RequestStatus: React.FC<StatusProps> = ({ value }) => {
    switch (value) {
        case REQUEST_STATUS.Denied:
            return <div className="max-w-max">
                <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                    { REQUEST_STATUS.Denied }
                </div>       
            </div>                                 
        case REQUEST_STATUS.Waiting:
            return <div className="max-w-max">
                <div className="flex items-center bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                    { REQUEST_STATUS.Waiting }
                </div>       
            </div>  
        case REQUEST_STATUS.Accepted:
            return <div className="max-w-max">
                <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                    { REQUEST_STATUS.Accepted }
                </div>       
            </div>                                 
    }
}

export default RequestStatus;