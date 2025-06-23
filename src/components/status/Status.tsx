import { StatusType } from "@/constants/Status_type";
import React from "react";

interface StatusProps  {
    type?: string;
    data?: string;
}

const Status: React.FC<StatusProps> = ({ type, data }) => {
    return <div>
        { type === StatusType.primary ? 
            <div className="max-w-max">
                <div className="flex items-center bg-blue-200 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                    { data }
                </div>       
            </div>                                 
            : (
            type === StatusType.alert ?
                <div className="max-w-max">
                    <div className="flex items-center bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                        { data }
                    </div>       
                </div>                                 
                : (
                    type === StatusType.success ?
                        <div className="max-w-max">
                            <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                { data }
                            </div>       
                        </div>                                 
                        : (
                            type === StatusType.gray ?
                                <div className="max-w-max">
                                    <div className="flex items-center bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                                        { data }
                                    </div>       
                                </div>                                 
                                :
                                <div className="max-w-max">
                                    <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                        { data }
                                    </div>       
                                </div>                                 
                                )
                            )
                        )
                    }     
    </div>
}

export default Status;
