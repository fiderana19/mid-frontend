import { AVAILABILITY_STATUS } from "@/constants/StatusValue";
import React from "react";

interface StatusProps  {
    value?: string;
}

const AvailabilityStatus: React.FC<StatusProps> = ({ value }) => {
    switch (value) {
        case AVAILABILITY_STATUS.Occuped:
            return <div className="max-w-max">
                <div className="flex items-center bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                    { AVAILABILITY_STATUS.Occuped }
                </div>       
            </div>                                 
        case AVAILABILITY_STATUS.Available:
            return <div className="max-w-max">
                <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                    { AVAILABILITY_STATUS.Available }
                </div>       
            </div> 
        case AVAILABILITY_STATUS.Canceled:
            return <div className="max-w-max">
                <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                    { AVAILABILITY_STATUS.Canceled }
                </div>       
            </div>                                 
    }
}

export default AvailabilityStatus;
