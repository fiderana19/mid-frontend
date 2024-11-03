import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { FunctionComponent, useState } from "react";

interface StepsProp {
    handlePrev: () => void;
    handleNext: () => void;
    handleChange: (e: any) => void;
    handleKeyPress: (e: any) => void;
    handleDateNaissanceChange: (e: any) => void;
    formData: any;
}

const SignupBirth: FunctionComponent<StepsProp> = ({handleDateNaissanceChange, handleKeyPress, formData, handlePrev, handleNext, handleChange}) => {
    const [lieuNaissError, setLieuNaissError] = useState<string>('');
    const [telephoneError, setTelephoneError] = useState<string>('');

    async function handleSubmit () {
        setLieuNaissError('');
        setTelephoneError('');

        if(formData.lieu_naissance === "") {
            setLieuNaissError("Veuillez remplir votre lieu de naissance !")
        }
        if(formData.telephone.lenght !== 9) {
            setTelephoneError("Le numero de telephone doit être 9 chiffres !")
        }

        if(formData.lieu_naissance !== "" && formData.telephone.length === 9) {
            handleNext();
        }
    }
    
    return(
        <div>
            <div className='w-60 my-4 mx-auto'>
                <DatePicker onChange={handleDateNaissanceChange} className="w-full py-1.5 bg-transparent placeholder:text-slate-400" placeholder="Date de naissance..." />
            </div>
            <div className='w-60 my-4 mx-auto'>
                <div className="relative">
                    <input value={formData.lieu_naissance} onChange={handleChange} name="lieu_naissance"
                        className={lieuNaissError ? "border-red-500 peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-red-300 shadow-sm focus:shadow" : "peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"}
                    />
                    <label className={(formData.lieu_naissance == '') ? 'absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-1.5 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400  peer-focus:scale-90' : `absolute cursor-text px-7 transition-all transform origin-left -top-1.5 left-2.5 text-xs text-slate-400 scale-90`}>
                        Lieu de naissance...
                    </label>
                    <EnvironmentOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {lieuNaissError && <div className="text-left text-red-500 text-xs">{lieuNaissError}</div>}
            </div>
            <div className='w-60 my-4 mx-auto'>
                <div className="relative">
                    <input value={formData.telephone} onChange={handleChange} onKeyPress={handleKeyPress} name="telephone"
                        className={telephoneError ? "border-red-500 peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md pr-3 pl-20 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-red-300 shadow-sm focus:shadow" : "peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"}
                        />
                    <label className={(formData.telephone == '') ? 'absolute cursor-text px-4 left-16 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-1.5 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400  peer-focus:scale-90' : `absolute cursor-text px-7 transition-all transform origin-left -top-1.5 left-2.5 text-xs text-slate-400 scale-90`}>
                        Telephone...
                    </label>
                    <label className="absolute top-1.5 left-9 bg-gray-700 text-white p-0.5 rounded text-sm">
                        +261
                    </label>
                    <PhoneOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {telephoneError && <div className="text-left text-red-500 text-xs">{telephoneError}</div>}
            </div>
            <div className="flex justify-end gap-2">
                <button onClick={handlePrev} className="border hover:border-gray-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500">Précédent</button>
                <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'>Suivant</button>
            </div>        
        </div>
    )
}

export default SignupBirth;