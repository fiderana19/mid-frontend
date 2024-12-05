import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { FunctionComponent, useState } from 'react';

interface StepsProp {
    handleNext: () => void;
    handleChange: (e: any) => void;
    formData: any;
}

const SignupPersonnal: FunctionComponent<StepsProp> = ({formData, handleNext, handleChange}) => {
    const [nomError, setNomError] = useState<string>('');
    const [adresseError, setAdresseError] = useState<string>('');

    async function handleSubmit () {
        setNomError('');
        setAdresseError('');
        
        if(formData.nom === '') {
            setNomError("Le champ nom ne doit pas être vide !");
        }
        if(formData.adresse === '') {
            setAdresseError("Le champ adresse ne doit pas être vide !");
        }

        if(formData.nom !== "" && formData.adresse !== "") {
            handleNext();
        }
    }
    
    return(
        <div>
            <div className='w-60 my-4 mx-auto'>
                <div className="text-left text-xs font-bold">
                    Nom
                </div>
                <div className="relative">
                    <input 
                        value={formData.nom} 
                        onChange={handleChange} 
                        name="nom"
                        placeholder="Saisir votre nom..."
                        className={nomError ? "border-red-500 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-red-300 shadow-sm focus:shadow" : "peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"}
                    />
                    <UserOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {nomError && <div className="text-left text-red-500 text-xs">{nomError}</div>}
            </div>
            <div className='w-60 my-4 mx-auto'>
                <div className="text-left text-xs font-bold">
                    Prenom(s)
                </div>
                <div className="relative">
                    <input 
                        value={formData.prenom} 
                        onChange={handleChange} 
                        name="prenom"
                        placeholder="Saisir votre prenom..."
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                    <UserOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
            </div>
            <div className='w-60 my-4 mx-auto'>
                <div className="text-left text-xs font-bold">
                    Adresse
                </div>
                <div className="relative">
                    <input 
                        value={formData.adresse} 
                        onChange={handleChange} 
                        name="adresse"
                        placeholder="Saisir votre adresse..."
                        className={adresseError ? "border-red-500 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-red-300 shadow-sm focus:shadow" : "peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"}
                    />
                    <MailOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {adresseError && <div className="text-left text-red-500 text-xs">{adresseError}</div>}
            </div>
            <div className="flex justify-end gap-2">
                <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'>Suivant</button>
            </div>        
        </div>
    )
}

export default SignupPersonnal;