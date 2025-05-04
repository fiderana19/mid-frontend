import { EyeInvisibleOutlined, EyeOutlined, LoadingOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import MidLogo from '../assets/image/mid-logo.jpg';
import Bg from '../assets/image/bg-login.jpeg'
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form'
import React, { useState } from 'react';
import { LoginInterface } from '../interfaces/User';
import { useAuth } from '../context/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoginValidation } from '@/validation/login.validation';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginPage: React.FC = () => {
    const { handleSubmit: loginSubmit, control , formState: { errors, isSubmitting, },  } = useForm<LoginInterface>({
        resolver: yupResolver(LoginValidation)
    })
    const { login } = useAuth();
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const handleLoginUser = async (data: LoginInterface) => {
        await login(data);
    }

    const handlePasswordVisible = async () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <div className='min-h-screen flex flex-col justify-center'>
            <div className='sm:flex block justify-between'>
                <div className="lg:w-2/3 sm:w-1/2 w-full bg-transparent relative">
                    <img src={Bg} alt="" className='-z-50 absolute w-full h-full object-cover' />
                    <div className='z-50 flex flex-col justify-center h-screen bg-black opacity-45'>
                        <div className='text-white lg:px-20 sm:px-10 px-4'>
                            <img src={MidLogo} alt='Logo du ministere' className='w-28 h-28 object-cover' />
                            <div className='text-4xl font-latobold mt-5 mb-4'>MINISTERE DE L'INTERIEUR</div>
                            <div>Demander une audience avec le ministre en ligne </div>
                            <a href="#login" className='transition-transform'>
                            <button className='sm:hidden block bg-gray-500 hover:bg-gray-700 text-white mx-auto font-latobold py-2 my-4 px-4 rounded w-64'>SE CONNECTER</button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='lg:w-1/3 sm:w-1/2 w-full bg-second-custom h-screen text-center py-5 sm:px-10 px-4 flex flex-col justify-center'>
                    <div className='text-2xl font-latobold mb-10'>Connexion à votre compte</div>
                    <form onSubmit={loginSubmit(handleLoginUser)}>
                        <div className='w-64 mx-auto'>
                            <Label htmlFor='email' className='mb-1'>Adresse mail </Label>
                            <div className='relative'>
                                <Controller 
                                    control={control}
                                    name='email'
                                    render={({
                                        field: { value, onChange, onBlur }
                                    }) => (
                                        <Input value={value} onChange={onChange} onBlur={onBlur} className={`${errors.email ? 'border border-red-500 text-red-500' : ''} pl-10`} />
                                    )}
                                />
                                <MailOutlined className="absolute top-1.5 left-1.5 bg-gray-400 text-white p-1.5 rounded text-sm" />
                            </div>
                            {errors.email && <div className='text-xs text-red-500 text-left w-full'>{ errors.email.message }</div>}
                            <Label htmlFor='password' className='mb-1 mt-4'>Mot de passe </Label>
                            <div className='relative'>
                                <Controller 
                                    control={control}
                                    name='password'
                                    render={({
                                        field: { value, onChange, onBlur }
                                    }) => (
                                        <Input value={value} onChange={onChange} onBlur={onBlur} type={!!(isPasswordVisible) ? 'text' : 'password'} className='pl-10' />
                                    )}
                                />
                                <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-400 text-white p-1.5 rounded text-sm' />
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
                            {errors.password && <div className='text-xs text-red-500 text-left w-full'>{ errors.password.message }</div>}
                            <Button variant={'secondary'} size={'lg'} disabled={isSubmitting ? true : false } className={`${isSubmitting ? 'cursor-not-allowed' : ''} w-full mt-4`} type='submit'>{ isSubmitting && <LoadingOutlined /> }  SE CONNECTER</Button>
                        </div>
                    </form>
                    <div className='text-xs mt-10 flex items-center mx-auto max-w-max gap-2'>
                        <div>Vous n'avez pas encore un compte ?</div>
                        <Link to="/signup">
                            <Button variant={'link'} size={'sm'}>S'inscrire</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;