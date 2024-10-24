import { EyeOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import MidLogo from '../assets/image/mid-logo.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LoginInterface } from '../interfaces/User';
import { message } from 'antd';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const [loginCredentials, setLoginCredentials] = useState<LoginInterface>({ email: '', password: '' });
    const { login } = useAuth();

    const handleLoginUser = async () => {
        await login(loginCredentials.email, loginCredentials.password);

        message.success(`eto eee ${loginCredentials.email} ${loginCredentials.password}`);
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginCredentials((prevLogin) => ({...prevLogin, [name]: value}));
    }

    return (
        <div className='bg-red-300 h-screen flex flex-col justify-center'>
            <div className='flex justify-between '>
                <div>
                    <div className='text-2xl font-bold font-lato'>MINISTERE DE L'INTERIEUR</div>
                    <div>Demander une audience avec le ministre en ligne </div>
                    <img src={MidLogo} alt='Logo du ministere' className='w-14 h-14' />
                </div>
                <div className='w-1/3 bg-gray-500 h-screen text-center border border-black-1 py-5 px-10 justify-center'>
                    <div className='text-2xl font-lato font-bold my-4'>Connexion</div>
                    <div className='w-60 my-4 mx-auto'>
                        <div className="relative">
                            <input
                                onChange={handleChange}
                                name="email"
                                className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            />
                            <label className={(loginCredentials.email == '') ? 'absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-1.5 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400  peer-focus:scale-90' : `absolute cursor-text px-7 transition-all transform origin-left -top-1.5 left-2.5 text-xs text-slate-400 scale-90`}>
                                Adresse mail...
                            </label>
                            <MailOutlined className="absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm" />
                            </div>
                    </div>
                    <div className='w-60 my-4 mx-auto'>
                        <div className="relative">
                            <input onChange={handleChange} name='password'
                            className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            />
                            <label className={(loginCredentials.password == '') ? 'absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-1.5 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400  peer-focus:scale-90' : `absolute cursor-text px-7 transition-all transform origin-left -top-1.5 left-2.5 text-xs text-slate-400 scale-90`}>
                            Mot de passe...
                            </label>
                            <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                            <EyeOutlined className='absolute top-1.5 right-1.5 cursor-pointer p-1.5' />
                        </div>
                    </div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleLoginUser}>SE CONNECTER</button>
                    <div className='text-xs my-7 flex mx-auto max-w-max gap-2'>
                        <div>Vous n'avez pas encore un compte ?</div>
                        <Link to="/signup">
                            <div className='text-blue-400 underline'>
                                S'inscrire
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;