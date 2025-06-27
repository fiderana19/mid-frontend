import { ACCOUNT_STATUS } from "@/constants/StatusValue";
import React from "react";

interface StatusProps  {
    value?: boolean;
}

const AccountStatus: React.FC<StatusProps> = ({ value }) => {
    switch (value) {
        case true:
            return <div className="max-w-max">
                <div className="flex items-center bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                    { ACCOUNT_STATUS.Valid }
                </div>       
            </div>                                 
        case false:
            return <div className="max-w-max">
                <div className="flex items-center bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                    { ACCOUNT_STATUS.Invalid }
                </div>       
            </div>  
    }
}

export default AccountStatus;