import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, MailOutlined, WarningFilled } from '@ant-design/icons';
import MidLogo from '../assets/image/mid-logo.jpg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LoginInterface } from '../interfaces/User';
import { Modal } from 'antd';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const [loginCredentials, setLoginCredentials] = useState<LoginInterface>({ email: '', password: '' });
    const { login } = useAuth();
    const [loginError, setLoginError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [isNotValidModalVisible, setIsNotValidModalVisible] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    useEffect(() => {
    }, [])

    const handleLoginUser = async () => {
        setEmailError('');
        setPasswordError('');

        if(loginCredentials.email === '') {
            setEmailError("Le champ email ne peut pas être vide !");
        }
        if(loginCredentials.password === '') {
            setPasswordError("Mot de passe vide !");
        }

        if(loginCredentials.email !== "" && loginCredentials.password!== "") {
            const response = await login(loginCredentials.email, loginCredentials.password);
            if(response) {
                setLoginError(response?.message)
                setIsNotValidModalVisible(true);
            }
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginCredentials((prevLogin) => ({...prevLogin, [name]: value}));
    }

    const handleModalOk = async () => {
        setIsNotValidModalVisible(false);
    }

    const handlePasswordVisible = async () => {
        if(isPasswordVisible) {
            setIsPasswordVisible(false);
        } else {
            setIsPasswordVisible(true);
        }
    }

    return (
        <div className='h-screen flex flex-col justify-center'>
            <div className='flex justify-between '>
                <div className="bg-[url('src/assets/image/bg-login.jpeg')] bg-cover w-2/3">
                    <div className='flex flex-col justify-center h-screen bg-black bg-opacity-45'>
                        <div className='text-white px-20'>
                            <img src={MidLogo} alt='Logo du ministere' className='w-28 h-28 object-cover' />
                            <div className='text-4xl font-latobold mt-5 mb-4'>MINISTERE DE L'INTERIEUR</div>
                            <div>Demander une audience avec le ministre en ligne </div>
                        </div>
                    </div>
                </div>
                <div className='w-1/3 bg-second h-screen text-center py-5 px-10 flex flex-col justify-center'>
                    <div className='text-2xl font-latobold my-4'>Connexion à votre compte</div>
                    <div className='w-64 my-2 mx-auto'>
                        <div className="text-left text-xs font-latobold">
                                Adresse mail
                        </div>
                        <div className="relative">
                            <input
                                onChange={handleChange}
                                name="email"
                                placeholder="Saisir votre mail..."
                                className={emailError ? "border-red-500 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-red-300 shadow-sm focus:shadow" : "peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"}
                                />
                            <MailOutlined className="absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm" />
                        </div>
                        {emailError && <div className="text-left text-red-500 text-xs">{emailError}</div>}
                    </div>
                    <div className='w-64 my-2 mx-auto'>
                        <div className="text-left text-xs font-latobold">
                                Mot de passe
                        </div>
                        <div className="relative">
                            <input 
                                onChange={handleChange}
                                type={!!(isPasswordVisible) ? 'text' : 'password'}
                                name='password'
                                placeholder='Saisir votre mot de passe...'
                                className={passwordError ? "border-red-500 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-red-300 shadow-sm focus:shadow" : "peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"}
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
                        {passwordError && <div className="text-left text-red-500 text-xs">{passwordError}</div>}
                    </div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white mx-auto font-latobold py-2 my-4 px-4 rounded w-64' onClick={handleLoginUser}>SE CONNECTER</button>
                    <div className='text-xs my-7 flex mx-auto max-w-max gap-2'>
                        <div>Vous n'avez pas encore un compte ?</div>
                        <Link to="/signup">
                            <div className='text-white font-latobold hover:underline'>
                                S'inscrire
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Modal title="Erreur" 
                open={isNotValidModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalOk}
            >
                <div>
                    <WarningFilled className='mr-2 text-red-500 text-lg' /> 
                    {
                        loginError &&
                        <span> {loginError} </span>
                    }
                </div>
            </Modal>
        </div>
    )
}

export default LoginPage;