import { AUDIENCE_STATUS } from "@/constants/StatusValue";
import React from "react";

interface StatusProps  {
    value?: string;
}

const AudienceStatus: React.FC<StatusProps> = ({ value }) => {
    switch (value) {
        case AUDIENCE_STATUS.Fixed:
            return <div className="max-w-max">
                <div className="flex items-center bg-blue-200 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                    { AUDIENCE_STATUS.Fixed }
                </div>       
            </div>                                 
        case AUDIENCE_STATUS.Postponed:
            return <div className="max-w-max">
                <div className="flex items-center bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                    { AUDIENCE_STATUS.Postponed }
                </div>       
            </div>  
        case AUDIENCE_STATUS.Missed:
            return <div className="max-w-max">
                <div className="flex items-center bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                    { AUDIENCE_STATUS.Missed }
                </div>       
            </div>                                 
        case AUDIENCE_STATUS.Closed:
            return <div className="max-w-max">
                <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                    { AUDIENCE_STATUS.Closed }
                </div>       
            </div> 
        case AUDIENCE_STATUS.Canceled:
            return <div className="max-w-max">
                <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                    { AUDIENCE_STATUS.Canceled }
                </div>       
            </div>                                 
    }
}

export default AudienceStatus;
