import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import React, { lazy, Suspense, useState } from "react";
import { UpdateUserPassword } from "../../../interfaces/User";
import { useNavigate } from "react-router-dom";
const AdminNavigation = lazy(() => import("../../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../../components/Header"));
import { HttpStatus } from "../../../constants/Http_status";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserChangePasswordValidation } from "@/validation/user.validation";
import { usePatchPassword } from "@/hooks/usePatchPassword";

const AdminChangePassword: React.FC = () => {
    const { token } = useAuth();
    const { control, handleSubmit: submit, formState: { errors } } = useForm<UpdateUserPassword>({
        resolver: yupResolver(UserChangePasswordValidation)
    });
    const { mutateAsync: updatePassword, isPending: updateLoading } = usePatchPassword();
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [matchPasswordError, setMatchPasswordError] = useState<string>('');
    const navigate = useNavigate();

    async function handleChangePasswordSubmit(data: UpdateUserPassword) {
        setMatchPasswordError('');

        if(data.new_password !== confirmPassword) {
            setMatchPasswordError('Confirmation mot de passe incorrecte !')
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
                navigate("/admin/info");
            }
        }
    }

    const handleConfirmChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatchPasswordError('');

        const {value} = e.target;
        setConfirmPassword(value);
    }

    return (
        <>
            <div className="w-full flex min-h-screen bg-four">
                <div className="md:w-52 sm:block hidden">
                    <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                        <AdminNavigation />
                    </Suspense>
                </div>
                <div className="w-full">
                    <div className="z-40 fixed top-0 right-0 w-full">
                        <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                            <Header />
                        </Suspense>
                    </div>
                    <div className="pl-10 pr-5 py-16">
                    <div className="w-80 mx-auto mt-10 mb-5">
                        <div className="font-latobold text-xl my-4 text-center">Changer mot de passe</div>
                            <form onSubmit={submit(handleChangePasswordSubmit)} className="border rounded p-4 bg-white shadow-md">
                                <div className='w-64 my-2 mx-auto'>
                                    <Label className="mb-1 mt-4">
                                        Mot de passe actuel
                                    </Label>
                                    <div className="relative">
                                        <Controller 
                                            control={control}
                                            name="old_password"
                                            render={({
                                                field: { value, onChange, onBlur }
                                            }) => (
                                                <Input 
                                                    type="password"
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    className={`w-full bg-transparent pr-3 pl-10 ${errors?.old_password ? 'border border-red-500 text-red-500 rounded' : ''}`}
                                                />
                                            )}
                                        />
                                        <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                    </div>
                                    { errors?.old_password && <div className="text-xs text-red-500">{ errors?.old_password.message }</div> }
                                    <Label className="mb-1 mt-4">
                                        Nouveau mot de passe
                                    </Label>
                                    <div className="relative">
                                        <Controller 
                                            control={control}
                                            name="new_password"
                                            render={({
                                                field: { value, onChange, onBlur }
                                            }) => (
                                                <Input 
                                                    type="password"
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    className={`w-full bg-transparent pr-3 pl-10 ${errors?.new_password ? 'border border-red-500 text-red-500 rounded' : ''}`}
                                                />
                                            )}
                                        />
                                        <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                    </div>
                                    { errors?.new_password && <div className="text-xs text-red-500">{ errors?.new_password.message }</div> }
                                    <Label className="mb-1 mt-4">
                                        Confirmation nouveau mot de passe
                                    </Label>
                                    <div className="relative">
                                        <Input 
                                            onChange={handleConfirmChange}
                                            type="password"
                                            className={`w-full bg-transparent pr-3 pl-10 ${matchPasswordError ? 'border border-red-500 text-red-500 rounded' : ''}`}
                                        />
                                        <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                    </div>
                                    { matchPasswordError && <div className="text-xs text-red-500">{ matchPasswordError }</div> }
                                    <div className="flex justify-center mt-4">
                                        <Button
                                            type="submit"
                                        >
                                            { updateLoading && <LoadingOutlined className="text-xs" /> }
                                            CHANGER
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminChangePassword;
