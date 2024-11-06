import { ContactsOutlined, EnvironmentOutlined, MailOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { FunctionComponent, useState } from 'react';

interface StepsProp {
    handlePrev: () => void;
    handleSignupUser: () => void;
    handleChange: (e: any) => void;
    handleChangeFile: (e: any) => void;
    formData: any;
}

const SignupFile: FunctionComponent<StepsProp> = ({formData, handlePrev, handleSignupUser, handleChangeFile, handleChange}) => {

    async function handleSubmit () {
        console.log(formData);
        handleSignupUser();
    }
    
    return(
        <div>
            <div className='w-60 my-4 mx-auto'>
                <div className="relative">
                    <input value={formData.email} onChange={handleChange} name="email"
                        className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                    <label className={(formData.email == '') ? 'absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-1.5 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400  peer-focus:scale-90' : `absolute cursor-text px-7 transition-all transform origin-left -top-1.5 left-2.5 text-xs text-slate-400 scale-90`}>
                        Adresse mail...
                    </label>
                    <MailOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
            </div>
            <div className='w-60 my-4 mx-auto overflow-hidden'>
                <div className="">
                    <div className='text-left text-slate-400 my-1 text-xs'>
                        Photo d'identité(4*4)
                    </div>
                    <input onChange={handleChangeFile} name="profile_photo" type="file" className="text-sm w-full whitespace-normal rounded border border-white" />
                </div>
            </div>
            <div className='w-60 my-4 mx-auto overflow-hidden'>
                <div className="">
                    <div className='text-left text-slate-400 my-1 text-xs'>
                        Scan CNI
                    </div>
                    <input onChange={handleChangeFile} name="cni_photo" type="file" className="text-sm w-full whitespace-normal rounded border border-white" />
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button onClick={handlePrev} className="border hover:border-gray-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500">Précédent</button>
                <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'>S'incrire</button>
            </div>  
        </div>
    )
}

export default SignupFile;