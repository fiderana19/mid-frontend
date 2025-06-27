import { EyeInvisibleOutlined, EyeOutlined, LoadingOutlined, LockOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { InitializeUserPassword } from '../../interfaces/User';
import MidLogo from '../../assets/image/mid-logo.jpg';
import { useNavigate } from 'react-router-dom';
import { HttpStatus } from '../../constants/Http_status';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserFirstPasswordValidation } from '@/validation/user.validation';
import { useAuth } from '../../context/AuthContext';
import { useGetUserById } from '@/hooks/useGetUserById';
import { useInitializePassword } from '@/hooks/useInitializePassword';
import AccountStatus from '@/components/status/AccountStatus';

const InitializePasswordAdmin: React.FC = () => {
    const { token } = useAuth();
    const { handleSubmit: submit, formState: { errors }, control } = useForm<InitializeUserPassword>({
        resolver: yupResolver(UserFirstPasswordValidation)
    });
    const { data: user, isLoading } = useGetUserById(token ? JSON.parse(atob(token.split('.')[1])).id : null);
    const { mutateAsync: initializePassword, isPending: initializeLoading } = useInitializePassword();
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChangePasswordSubmit = async (data: any) => {
        const updatePasswordCredentials = {
            _id: user._id,
            password: data?.password,
        }
        
        const response = await initializePassword(updatePasswordCredentials);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
            navigate("/admin/home");
        }
    }

    const handlePasswordVisible = async () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <div className='bg-four h-screen flex flex-col justify-center'>
                <div className='mx-auto'>
                    <div className='text-center mb-10'>
                        <img src={MidLogo} className='h-28 w-28 object-cover mx-auto' alt="Logo du ministere" />
                        <div className='text-lg font-latobold'>MININTER: Audience</div>
                    </div>
                    <div className='text-xl font-latobold my-4 text-center'>Veuillez initialiser votre mot de passe</div>
                    <div className='border border-gray-300 p-6 rounded bg-white'>
                        {
                            user &&
                            <div className='p-2 mx-auto flex items-center gap-4 mb-4'>
                                <img src={`data:image/png;base64,${user.profile_photo}`} alt="" className="w-16 h-16 rounded-full  object-cover border" />
                                <div>
                                    <div className='font-latobold mb-2'>{ user.nom }  {user.prenom} </div>
                                    <AccountStatus value={user?.validation} />
                                </div>
                            </div>
                        }
                        {
                            isLoading && <div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>
                        }
                        <form onSubmit={submit(handleChangePasswordSubmit)} className='my-2'>
                            <Label htmlFor='' className='mb-1' >Mot de passe</Label>
                            <div className="relative">
                                <Controller 
                                    name='password'
                                    control={control}
                                    render={({
                                        field: { value, onChange, onBlur }
                                    }) => (
                                        <Input
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            type={!!(isPasswordVisible) ? 'text' : 'password'}
                                            name='password'
                                            className={`pl-10 ${errors?.password ? 'border border-red-500 rounded text-red-500' : ''}`}
                                        />
                                    )}
                                />
                                <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                {
                                    isPasswordVisible ?
                                    <EyeInvisibleOutlined 
                                    onClick={handlePasswordVisible}
                                    className='absolute top-1.5 right-1.5 cursor-pointer p-1.5' />
                                    : 
                                    <EyeOutlined 
                                    onClick={handlePasswordVisible}
                                    className='absolute top-1.5 right-1.5 cursor-pointer p-1.5' />
                                }
                            </div>
                            { errors?.password && <div className="text-xs text-red-500">{ errors?.password.message }</div> }
                            <div className='flex justify-center mt-4'>
                                <Button variant={'default'} size={'lg'} type='submit'>
                                    { initializeLoading && <LoadingOutlined /> }
                                    CONFIRMER
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    )
}

export default InitializePasswordAdmin;