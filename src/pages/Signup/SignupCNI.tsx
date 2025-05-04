import { ContactsOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { FunctionComponent } from 'react';
import { Controller, useForm } from "react-hook-form";
import { UserCNISignup } from "@/interfaces/Signup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserCNIValidation } from "@/validation/signup.validation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/Toast";
import { TOAST_TYPE } from "@/constants/ToastType";
import { handleNumberKeyPress } from "@/utils/handleKeyPress";

interface StepsProp {
    handlePrev: () => void;
    handleNext: () => void;
    formData: any;
    setFormData: (d: any) => void;
}

const SignupCNI: FunctionComponent<StepsProp> = ({setFormData, formData, handlePrev, handleNext}) => {
    const { handleSubmit: submit, control, formState: { errors } } = useForm<UserCNISignup>({
        resolver: yupResolver(UserCNIValidation)
    })

    async function handleSubmit (data: UserCNISignup) {

        const now = dayjs(new Date()).toISOString();
        const major = dayjs(data.date_cni);
        const mj = major.add(18, 'year')

        if(dayjs(now) < mj) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Votre CIN doit être délivré après vos 18ans !"
            })
        } else {
            console.log(data)
            setFormData({
                ...formData,
                cni: data?.cni,
                lieu_cni: data?.lieu_cni,
                date_cni: data?.date_cni
            })

            handleNext();
        }
    }
    
    return(
        <form onSubmit={submit(handleSubmit)}>
            <div className='w-60 my-4 mx-auto'>
                <Label htmlFor="cni" className="mb-1 mt-4">Numero CIN</Label>
                <div className="relative">
                    <Controller
                        control={control}
                        name="cni"
                        defaultValue={formData?.cni}
                        render={({
                            field: {value, onChange, onBlur}
                        }) => (
                            <Input value={value} onChange={onChange} onKeyPress={handleNumberKeyPress} onBlur={onBlur} className={`${errors?.cni ? 'border-red-500 border text-red-500' : ''} pl-10`} />
                        )}
                    />
                    <ContactsOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {errors?.cni && <div className="text-red-500 text-xs text-left w-full">{ errors?.cni.message }</div>}
                <Label htmlFor="date_cni" className="mb-1 mt-4">Date de délivrance CIN </Label>
                <Controller
                    control={control}
                    name="date_cni"
                    defaultValue={formData?.date_cni ? formData?.date_cni : null}
                    render={({
                        field: {value, onChange, onBlur}
                    }) => (
                        <DatePicker onChange={(date) => onChange(date ? date.toISOString() : null)} value={value ? dayjs(value) : null} onBlur={onBlur} className={`w-full ${errors?.date_cni ? 'text-red-500 border border-red-500 rounded' : ''}`} format="YYYY-MM-DD" />
                    )}
                />
                {errors?.date_cni && <div className="text-red-500 text-xs text-left w-full">{ errors?.date_cni.message }</div>}
                <Label htmlFor="lieu_cni" className="mb-1 mt-4">Lieu de délivrance CIN</Label>
                <div className="relative">
                    <Controller
                        control={control}
                        name="lieu_cni"
                        defaultValue={formData?.lieu_cni}
                        render={({
                            field: {value, onChange, onBlur}
                        }) => (
                            <Input value={value} onChange={onChange} onBlur={onBlur} className={`${errors?.lieu_cni ? 'border-red-500 border text-red-500' : ''} pl-10`} />
                        )}
                    />
                    <EnvironmentOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
                {errors?.lieu_cni && <div className="text-red-500 text-xs text-left w-full">{ errors?.lieu_cni.message }</div>}
                <div className="flex justify-end mt-4 gap-2">
                    <Button variant={'default'} onClick={handlePrev}>Retour</Button>
                    <Button variant={'secondary'} type="submit">Suivant</Button>
                </div>
            </div>
        </form>
    )
}

export default SignupCNI;