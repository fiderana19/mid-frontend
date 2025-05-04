import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleLetterKeyPress } from "@/utils/handleKeyPress";
import { UserPersonnalValidation } from "@/validation/signup.validation";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { FunctionComponent } from 'react';
import { Controller, useForm } from "react-hook-form";

interface StepsProp {
    formData: any;
    handleNext: () => void;
    setFormData: (d: any) => void;
}

const SignupPersonnal: FunctionComponent<StepsProp> = ({formData, setFormData, handleNext}) => {
    const { handleSubmit: submit, control, formState: { errors } } = useForm({
        resolver: yupResolver(UserPersonnalValidation)
    });

    async function handleSubmit (data: any) {
        setFormData({
            ...formData,
            nom: data.nom,
            prenom: data.prenom,
            adresse: data.adresse
        })

        handleNext();
    }
    
    return(
        <form onSubmit={submit(handleSubmit)}>
            <div className="w-60 my-4 mx-auto">
                <Label htmlFor="nom" className="mb-1 mt-4">Nom </Label>
                <div className="relative">
                    <Controller 
                        control={control}
                        name="nom"
                        defaultValue={formData?.nom}
                        render={({
                            field: { value, onChange, onBlur }
                        }) => (
                            <Input value={value} onChange={onChange} onBlur={onBlur} onKeyPress={handleLetterKeyPress} className={`${errors?.nom ? 'border-red-500 border text-red-500' : ''} pl-10`} />
                        )}
                    />
                    <UserOutlined className='absolute top-1.5 left-1.5 bg-gray-400 text-white p-1.5 rounded text-sm' />
                </div>
                {errors?.nom && <div className="text-red-500 text-xs text-left">{ errors?.adresse?.message }</div>}
                <Label htmlFor="prenom" className="mb-1 mt-4">Prenom </Label>
                <div className="relative">
                    <Controller 
                        control={control}
                        name="prenom"
                        defaultValue={formData?.prenom ? formData?.prenom : ''}
                        render={({
                            field: { value, onChange, onBlur }
                        }) => (
                            <Input value={value  ? value : ''} onChange={onChange} onBlur={onBlur} onKeyPress={handleLetterKeyPress} className="pl-10" />
                        )}
                    />
                    <UserOutlined className='absolute top-1.5 left-1.5 bg-gray-400 text-white p-1.5 rounded text-sm' />
                </div>
                <Label htmlFor="adresse" className="mb-1 mt-4">Adresse </Label>
                <div className="relative">
                    <Controller 
                        control={control}
                        name="adresse"
                        defaultValue={formData?.adresse}
                        render={({
                            field: { value, onChange, onBlur }
                        }) => (
                            <Input value={value} onChange={onChange} onBlur={onBlur} className={`${errors?.adresse ? 'border-red-500 border text-red-500' : ''} pl-10`} />
                        )}
                    />
                    <MailOutlined className='absolute top-1.5 left-1.5 bg-gray-400 text-white p-1.5 rounded text-sm' />
                </div>
                {errors?.adresse && <div className="text-red-500 text-xs text-left">{ errors?.adresse?.message }</div>}
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant={'secondary'} type="submit">Suivant</Button>
                </div>
            </div>
            {/* <div className='w-60 my-4 mx-auto'>
                <div className="text-left text-xs font-bold">
                    Nom
                </div>
                <div className="relative">
                    <input 
                        value={formData.nom} 
                        onChange={handleChange} 
                        onKeyPress={handleLetterKeyPress}
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
                        onKeyPress={handleLetterKeyPress}
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
            </div> */}
            {/* <div className="flex justify-end gap-2">
                <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'>Suivant</button>
            </div>         */}
        </form>
    )
}

export default SignupPersonnal;