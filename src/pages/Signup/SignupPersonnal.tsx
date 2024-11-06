import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { FunctionComponent, useState } from 'react';

interface StepsProp {
    handleNext: () => void;
    handleChange: (e: any) => void;
    formData: any;
}

const SignupPersonnal: FunctionComponent<StepsProp> = ({formData, handleNext, handleChange}) => {
    const [nomError, setNomError] = useState<string>('');

    async function handleSubmit () {
        setNomError('');
        
        if(formData.nom === '') {
            setNomError("Le champ nom ne doit pas être vide !");
        }

        if(formData.nom !== "") {
            handleNext();
        }
    }
    
    return(
        <div>
            <div className='w-60 my-4 mx-auto'>
                <div className="relative">
                    <input value={formData.nom} onChange={handleChange} name="nom"
                        className={nomError ? "border-red-500 peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-red-300 shadow-sm focus:shadow" : "peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"}
                    />
                    <label className={(formData.nom == '') ? 'absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-1.5 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400  peer-focus:scale-90' : `absolute cursor-text px-7 transition-all transform origin-left -top-1.5 left-2.5 text-xs text-slate-400 scale-90`}>
                        Nom...
                    </label>
                    <UserOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {nomError && <div className="text-left text-red-500 text-xs">{nomError}</div>}
            </div>
            <div className='w-60 my-4 mx-auto'>
                <div className="relative">
                    <input value={formData.prenom} onChange={handleChange} name="prenom"
                        className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                    <label className={(formData.prenom == '') ? 'absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-1.5 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400  peer-focus:scale-90' : `absolute cursor-text px-7 transition-all transform origin-left -top-1.5 left-2.5 text-xs text-slate-400 scale-90`}>
                        Prenom(s)...
                    </label>
                    <UserOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
            </div>
            <div className='w-60 my-4 mx-auto'>
                <div className="relative">
                    <input value={formData.adresse} onChange={handleChange} name="adresse"
                        className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                    <label className={(formData.adresse == '') ? 'absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-1.5 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400  peer-focus:scale-90' : `absolute cursor-text px-7 transition-all transform origin-left -top-1.5 left-2.5 text-xs text-slate-400 scale-90`}>
                        Adresse...
                    </label>
                    <MailOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'>Suivant</button>
            </div>        
        </div>
    )
}

export default SignupPersonnal;