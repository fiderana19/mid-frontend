import { ContactsOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { FunctionComponent, useState } from 'react';

interface StepsProp {
    handlePrev: () => void;
    handleSignupUser: () => void;
    handleChange: (e: any) => void;
    handleKeyPress: (e: any) => void;
    handleDateCNIChange: (e: any) => void;
    formData: any;
}

const SignupCNI: FunctionComponent<StepsProp> = ({handleDateCNIChange, handleKeyPress, formData, handlePrev, handleSignupUser, handleChange}) => {
    const [cniError, setCNIError] = useState<string>('');
    const [lieuCniError, setLieuCNIError] = useState<string>('');

    async function handleSubmit () {
        setCNIError('');
        setLieuCNIError('');

        if(formData.cni.length !== 12) {
            setCNIError("Le CNI doit être composé de 12 chiffres !");
        }
        if(formData.lieu_cni === "") {
            setLieuCNIError("Le lieu de delivrance CNI ne doit pas être nul !")
        }

        if(formData.cni.length === 12 && formData.lieu_cni !== "") {
            handleSignupUser();
        }
    }
    
    return(
        <div>
            <div className='w-60 my-4 mx-auto'>
                <div className="relative">
                    <input value={formData.cni} onKeyPress={handleKeyPress} name="cni" onChange={handleChange}
                        className={cniError ? "border-red-500 peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-red-300 shadow-sm focus:shadow" : "peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"}
                        />
                    <label className={(formData.cni == '') ? 'absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-1.5 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400  peer-focus:scale-90' : `absolute cursor-text px-7 transition-all transform origin-left -top-1.5 left-2.5 text-xs text-slate-400 scale-90`}>
                        CNI...
                    </label>
                    <ContactsOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {cniError && <div className="text-left text-red-500 text-xs">{cniError}</div>}
            </div>
            <div className='w-60 my-4 mx-auto'>
                <DatePicker onChange={handleDateCNIChange} className="w-full py-1.5 bg-transparent placeholder:text-slate-400" placeholder="Date CNI..."  />
            </div>
            <div className='w-60 my-4 mx-auto'>
                <div className="relative">
                    <input value={formData.lieu_cni} onChange={handleChange} name="lieu_cni"
                        className={lieuCniError ? "border-red-500 peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-red-300 shadow-sm focus:shadow" : "peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"}
                        />
                    <label className={(formData.lieu_cni == '') ? 'absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-1.5 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400  peer-focus:scale-90' : `absolute cursor-text px-7 transition-all transform origin-left -top-1.5 left-2.5 text-xs text-slate-400 scale-90`}>
                        Lieu CNI...
                    </label>
                    <EnvironmentOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {lieuCniError && <div className="text-left text-red-500 text-xs">{lieuCniError}</div>}
            </div>
            <div className="flex justify-end gap-2">
                <button onClick={handlePrev} className="border hover:border-gray-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500">Précédent</button>
                <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'>S'incrire</button>
            </div>  
        </div>
    )
}

export default SignupCNI;