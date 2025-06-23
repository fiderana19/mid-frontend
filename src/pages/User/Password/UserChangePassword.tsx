import React, { lazy, Suspense, useState } from "react";
import { LoadingOutlined, LockOutlined, WarningOutlined } from "@ant-design/icons";
const UserNavigation = lazy(() => import("../../../components/Navigation/UserNavigation"));
import { UpdateUserPassword } from "../../../interfaces/User";
import { useNavigate } from "react-router-dom";
import { HttpStatus } from "../../../constants/Http_status";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserChangePasswordValidation } from "@/validation/user.validation";
import { Button } from "@/components/ui/button";
import { usePatchPassword } from "@/hooks/usePatchPassword";

const UserChangePassword: React.FC = () => {
    const { token } = useAuth()
    const { mutateAsync: updatePassword, isPending: isLoading } = usePatchPassword();
    const { control, formState, handleSubmit } = useForm<UpdateUserPassword>({
        resolver: yupResolver(UserChangePasswordValidation)
    });
    const { errors } = formState;
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const navigate = useNavigate();

    async function updatePasswordSubmit(data: any) {
        if(data.new_password !== confirmPassword) {
            setConfirmPasswordError('Confirmation mot de passe incorrecte !')
        }

        if(data.new_password === confirmPassword) {
            const id = token ? JSON.parse(atob(token.split('.')[1])).id : null;
            const updatePasswordCredentials = {
                _id: id,
                old_password: data.old_password,
                new_password: data.new_password,
            }
            const response = await updatePassword(updatePasswordCredentials);
            if(response.status === HttpStatus.OK) {
                navigate("/user/info");
            }
        }
    }

    const handleConfirmChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPasswordError('');

        const {value} = e.target;
        setConfirmPassword(value);
    }

    return (
        <>
            <div className="w-full min-h-screen bg-four">
                <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                    <UserNavigation />
                </Suspense>
                <div className="pt-16 sm:px-20 px-4">
                    <form onSubmit={handleSubmit(updatePasswordSubmit)} className="sm:w-80 w-full mx-auto mt-10 mb-5">
                        <div className="font-latobold text-xl my-4 text-center">Changer mot de passe</div>
                            <div className="border rounded p-4 bg-white shadow-md">
                                <div className='w-64 my-2 mx-auto'>
                                    <Label htmlFor="old_password" className="text-left text-xs font-latobold mb-1">
                                        Mot de passe actuel
                                    </Label>
                                    <div className="relative">
                                        <Controller 
                                            control={control}
                                            name="old_password"
                                            render={({
                                                field: { onBlur, onChange, value }
                                            }) => (
                                                <Input
                                                    type="password"
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    className={`w-full text-left pl-10 ${errors.old_password ? "border border-red-500 text-red-500" : ""}`}
                                                    name='old_password'
                                                />
                                            )}
                                        />
                                        <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                    </div>
                                    { errors?.old_password && <div className="text-xs text-red-500 text-left">{ errors?.old_password.message }</div> }
                                </div>
                                <div className='w-64 my-2 mx-auto'>
                                    <Label htmlFor="new_password" className="text-left text-xs font-latobold mb-1">
                                        Nouveau mot de passe
                                    </Label>
                                    <div className="relative">
                                        <Controller 
                                            control={control}
                                            name="new_password"
                                            render={({
                                                field: { onBlur, onChange, value }
                                            }) => (
                                                <Input
                                                    type="password"
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    className={`w-full text-left pl-10 ${errors.new_password ? "border border-red-500 text-red-500" : ""}`}
                                                    name='old_password'
                                                />
                                            )}
                                        />
                                        <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                    </div>
                                    { errors?.new_password && <div className="text-xs text-red-500 text-left">{ errors?.new_password.message }</div> }
                                </div>
                                <div className='w-64 my-2 mx-auto'>
                                    <Label className="text-left text-xs font-latobold mb-1">
                                        Confirmation nouveau mot de passe
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            onChange={handleConfirmChange}
                                            type="password"
                                            name='password'
                                            className={`w-full text-left pl-10 ${confirmPasswordError ? "border border-red-500 text-red-500" : ""}`}
                                            />
                                        <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                    </div>
                                    { confirmPasswordError && <div className="text-xs text-red-500 text-left">{confirmPasswordError }</div> }
                                </div>
                                <div className="flex justify-center w-64 my-2 mx-auto">
                                    <Button variant={'primary'} size={'lg'} disabled={isLoading ? true : false } className={`${isLoading ? 'cursor-not-allowed' : ''} w-full mt-4`} type='submit'>
                                        { isLoading && <LoadingOutlined /> }  
                                        CHANGER
                                    </Button>
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserChangePassword;