import { ContactsOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { FunctionComponent, useState } from 'react';
import { formatDateForPlaceholder } from '../../utils/dateFixation';

interface StepsProp {
    handlePrev: () => void;
    handleNext: () => void;
    handleChange: (e: any) => void;
    handleKeyPress: (e: any) => void;
    handleDateCNIChange: (e: any) => void;
    formData: any;
}

const SignupCNI: FunctionComponent<StepsProp> = ({handleDateCNIChange, handleKeyPress, formData, handlePrev, handleChange, handleNext}) => {
    const [cniError, setCNIError] = useState<string>('');
    const [lieuCniError, setLieuCNIError] = useState<string>('');
    const [dateError, setDateError] = useState<string>('');

    async function handleSubmit () {
        setCNIError('');
        setLieuCNIError('');
        setDateError('');
        const now = dayjs(new Date()).toISOString();
        const major = dayjs(formData.date_cni);
        const mj = major.add(18, 'year')

        if(dayjs(now) < mj || formData.date_cni === '') {
            setDateError("Votre CIN doit être reçu après votre 18 ans !")
        }
        if(formData.cni.length !== 12) {
            setCNIError("Le CNI doit être composé de 12 chiffres !");
        }
        if(formData.lieu_cni === "") {
            setLieuCNIError("Le lieu de delivrance CNI ne doit pas être nul !")
        }

        if(dayjs(now) >= mj && formData.cni.length === 12 && formData.lieu_cni !== "") {
            handleNext();
        }
    }
    
    return(
        <div>
            <div className='w-60 my-4 mx-auto'>
                <div className="text-left text-xs font-bold">
                    Numero CIN
                </div>
                <div className="relative">
                    <input 
                        value={formData.cni} 
                        onKeyPress={handleKeyPress} 
                        name="cni" 
                        onChange={handleChange}
                        placeholder="Saisir votre CIN..."
                        className={cniError ? "border-red-500 peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-red-300 shadow-sm focus:shadow" : "peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"}
                        />
                    <ContactsOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {cniError && <div className="text-left text-red-500 text-xs">{cniError}</div>}
            </div>
            <div className='w-60 my-4 mx-auto relative'>
                <div className="text-left text-xs font-bold">
                    Date du CIN
                </div>
                <DatePicker 
                    onChange={handleDateCNIChange}
                    popupStyle={{position: 'absolute', top: 100,}}
                    className= {dateError ? "relative border-red-500 w-full py-1.5 bg-transparent placeholder:text-slate-400" : "relative w-full py-1.5 bg-transparent placeholder:text-slate-400" }  
                    placeholder= { formData.date_cni ? formatDateForPlaceholder(formData.date_cni) : "Date CNI..." }   />
                    {dateError && <div className="text-left text-red-500 text-xs">{dateError}</div>}
            </div>
            <div className='w-60 my-4 mx-auto'>
                <div className="text-left text-xs font-bold">
                    Lieu du CIN
                </div>
                <div className="relative">
                    <input 
                        value={formData.lieu_cni} 
                        onChange={handleChange} 
                        name="lieu_cni"
                        placeholder="Saisir le lieu du CIN..."
                        className={lieuCniError ? "border-red-500 peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-red-300 shadow-sm focus:shadow" : "peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"}
                        />
                    <EnvironmentOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {lieuCniError && <div className="text-left text-red-500 text-xs">{lieuCniError}</div>}
            </div>
            <div className="flex justify-end gap-2">
                <button onClick={handlePrev} className="border hover:border-gray-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500">Précédent</button>
                <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'>Suivant</button>
            </div>  
        </div>
    )
}

export default SignupCNI;