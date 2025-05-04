import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { FunctionComponent } from "react";
import dayjs from 'dayjs';
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { UserBirthValidation } from "@/validation/signup.validation";
import { showToast } from "@/utils/Toast";
import { TOAST_TYPE } from "@/constants/ToastType";
import { UserBirthSignup } from "@/interfaces/Signup";

interface StepsProp {
    handlePrev: () => void;
    handleNext: () => void;
    formData: any;
    setFormData: (d: any) => void;
}

const SignupBirth: FunctionComponent<StepsProp> = ({setFormData, formData, handlePrev, handleNext}) => {
    const { handleSubmit: submit, control, formState: { errors } } = useForm<UserBirthSignup>({
        resolver: yupResolver(UserBirthValidation)
    })
    async function handleSubmit (data: any) {
        const now = dayjs(new Date()).toISOString();
        const major = dayjs(data.date_naissance);
        const mj = major.add(18, 'year');
        if(dayjs(now) < mj) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Vous devez avoir au moins 18 pour pouvoir s'inscrire !"
            })
        } else {
            console.log(data)
            setFormData({
                ...formData,
                date_naissance: data?.date_naissance,
                lieu_naissance: data?.lieu_naissance,
                telephone: data?.telephone
            })

            handleNext()
        }
    }
    
    return(
        <form onSubmit={submit(handleSubmit)}>
            <div className='w-60 my-4 mx-auto'>
                <Label htmlFor="date_naissance" className="mb-1 mt-4">Date de naissance </Label>
                <Controller
                    control={control}
                    name="date_naissance"
                    defaultValue={formData?.date_naissance ? formData?.date_naissance : null}
                    render={({
                        field: {value, onChange, onBlur}
                    }) => (
                        <DatePicker onChange={(date) => onChange(date ? date.toISOString() : null)} value={value ? dayjs(value) : null} onBlur={onBlur} className={`w-full ${errors?.date_naissance ? 'text-red-500 border border-red-500 rounded' : ''}`} format="YYYY-MM-DD" />
                    )}
                />
                {errors?.date_naissance && <div className="text-red-500 text-xs text-left w-full">{ errors?.date_naissance.message }</div>}
                <Label htmlFor="lieu_naissance" className="mb-1 mt-4">Lieu de naissance </Label>
                <div className="relative">
                    <Controller 
                        control={control}
                        name="lieu_naissance"
                        defaultValue={formData?.lieu_naissance}
                        render={({
                            field: { value, onChange, onBlur }
                        }) => (
                            <Input value={value} onChange={onChange} onBlur={onBlur} className={`${errors?.lieu_naissance ? 'border-red-500 border text-red-500' : ''} pl-10`} />
                        )}
                    />
                    <EnvironmentOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {errors?.lieu_naissance && <div className="text-red-500 text-xs text-left w-full">{ errors?.lieu_naissance.message }</div>}
                <Label htmlFor="telephone" className="mb-1 mt-4">Telephone </Label>
                <div className="relative">
                    <Controller 
                        control={control}
                        name="telephone"
                        defaultValue={formData?.telephone}
                        render={({
                            field: { value, onChange, onBlur }
                        }) => (
                            <Input value={value} onChange={onChange} onBlur={onBlur} onKeyPress={handleNumberKeyPress} className={`${errors?.telephone ? 'border-red-500 border text-red-500' : ''} pl-20`} />
                        )}
                    />
                    <label className="absolute top-1.5 left-9 bg-gray-700 text-white p-0.5 rounded text-sm">
                        +261
                    </label>
                    <PhoneOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {errors.telephone && <div className="text-red-500 text-xs text-left w-full">{ errors.telephone.message }</div>}
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant={'default'} onClick={handlePrev}>Retour</Button>
                    <Button variant={'secondary'} type="submit">Suivant</Button>
                </div>
            </div>        
        </form>
    )
}

export default SignupBirth;