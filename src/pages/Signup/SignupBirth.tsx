import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { FunctionComponent, useState } from "react";
import dayjs from 'dayjs';

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
    const [birthError, setBirthError] = useState<string>('');

    async function handleSubmit () {
        setLieuNaissError('');
        setTelephoneError('');
        setBirthError('');
        const now = dayjs(new Date()).toISOString();
        const major = dayjs(formData.date_naissance);
        const mj = major.add(18, 'year')
    
        if(dayjs(now) < mj || formData.date_naissance === '') {
            setBirthError("Vous devez au moins avoir 18 ans !")
        }

        if(formData.lieu_naissance === "") {
            setLieuNaissError("Veuillez remplir votre lieu de naissance !")
        }
        if(formData.telephone.lenght !== 9) {
            setTelephoneError("Le numero de telephone doit être 9 chiffres !")
        }

        if(formData.lieu_naissance !== "" && formData.telephone.length === 9 && dayjs(now) >= mj) {
            handleNext();
        }
    }
    
    return(
        <div>
            <div className='w-60 my-4 mx-auto'>
                <div className="text-left text-xs font-bold">
                    Date de naissance
                </div>
                <DatePicker 
                    onChange={handleDateNaissanceChange} 
                    className= {birthError ? "border-red-500 w-full py-1.5 bg-transparent placeholder:text-slate-400" : "w-full py-1.5 bg-transparent placeholder:text-slate-400" }  
                    placeholder= { formData.date_naissance ? formData.date_naissance : "Date de naissance..." } />
                    {birthError && <div className="text-left text-red-500 text-xs">{birthError}</div>}
            </div>
            <div className='w-60 my-4 mx-auto'>
                <div className="text-left text-xs font-bold">
                    Lieu de naissance
                </div>
                <div className="relative">
                    <input 
                        value={formData.lieu_naissance} 
                        onChange={handleChange} 
                        name="lieu_naissance"
                        placeholder="Saisir votre lieu de naissance..."
                        className={lieuNaissError ? "border-red-500 peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-red-300 shadow-sm focus:shadow" : "peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"}
                    />
                    <EnvironmentOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {lieuNaissError && <div className="text-left text-red-500 text-xs">{lieuNaissError}</div>}
            </div>
            <div className='w-60 my-4 mx-auto'>
                <div className="text-left text-xs font-bold">
                    Telephone
                </div>
                <div className="relative">
                    <input 
                        value={formData.telephone} 
                        onChange={handleChange} 
                        onKeyPress={handleKeyPress} 
                        name="telephone"
                        placeholder="Saisir votre telephone..."
                        className={telephoneError ? "border-red-500 peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md pr-3 pl-20 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-red-300 shadow-sm focus:shadow" : "peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"}
                    />
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