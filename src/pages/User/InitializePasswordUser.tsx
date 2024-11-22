import { EyeInvisibleOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { InitializeUserPassword } from '../../interfaces/User';
import { checkUserFirstLogin, getUserById, initializePassword } from '../../api/users';
import MidLogo from '../../assets/image/mid-logo.jpg';
import { useNavigate } from 'react-router-dom';

function InitializePasswordUser() {
    const [updatePasswordCredentials, setUpdatePasswordCredentials] = useState<InitializeUserPassword>({ password: '' });
    const [user, setUser] = useState<any>();
    const [newPasswordError, setNewPasswordError] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const navigate = useNavigate();
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    )

    useEffect(() => { 
        fetchUserFirstLogin()
        fetchUser()
    }, [])

    async function fetchUser() {
        const token = localStorage.getItem("token");

        if(token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const response = await getUserById(token,decodedToken.id);
          if(response) {
            setUser(response)
          }
          setAccessToken(token);
        }
      }

    async function fetchUserFirstLogin() {
        const token = localStorage.getItem("token");

        if(token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const response = await checkUserFirstLogin(token,decodedToken.id);
          if(response) {
            const first:boolean = response.data.first_login;
            if (first === true) {
                navigate("/user/home");
            }
          }
          setAccessToken(token);
        }
      }

    const handleChangePasswordSubmit = async () => {
        setNewPasswordError('');

        if(updatePasswordCredentials.password.length < 6) {
            setNewPasswordError('Le mot doit comporter au moins 6 caractères !')
        }

        if(updatePasswordCredentials.password.length > 6) {
            const response = await initializePassword(access_token, user._id, updatePasswordCredentials);
            if(response?.status === 200) {
                navigate("/user/home");
            }
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPasswordError('');

        const {name, value} = e.target;
        setUpdatePasswordCredentials((prev) => ({...prev, [name]: value}));
    }

    const handlePasswordVisible = async () => {
        if(isPasswordVisible) {
            setIsPasswordVisible(false);
        } else {
            setIsPasswordVisible(true);
        }
    }

    return (
        <div className='bg-four h-screen flex flex-col justify-center'>
                <div className='w-80 mx-auto'>
                    <div className='text-center'>
                        <img src={MidLogo} className='h-36 w-36 object-cover mx-auto' alt="Logo du ministere" />
                        <div className='text-lg font-latobold'>MININTER: Audience</div>
                    </div>
                    <div className='text-xl font-latobold my-4 text-center'>Veuillez initialiser votre mot de passe</div>
                    <div className='border border-gray-300 p-2 rounded bg-white'>
                        {
                            user &&
                            <div className='w-64 p-2 mx-auto flex items-center gap-2'>
                                <img src={`data:image/png;base64,${user.profile_photo}`} alt="" className="w-10 h-10 rounded-full  object-cover border" />
                                <div className='font-latobold'>{ user.nom }  {user.prenom} </div>
                            </div>
                        }
                        
                        <div className='w-64 my-2 mx-auto'>
                            <div className="text-left text-xs font-latobold">
                                Mot de passe
                            </div>
                            <div className="relative">
                                <input 
                                    onChange={handleChange}
                                    type={!!(isPasswordVisible) ? 'text' : 'password'}
                                    placeholder='Saisir le mot de passe initial...' 
                                    name='password'
                                    className={ newPasswordError ?  "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-red-500 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" :  "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" }
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
                            { newPasswordError && <div className="text-xs text-red-500">{ newPasswordError }</div> }
                        </div>
                        <div className='flex justify-center'>
                            <button className=' bg-blue-500 hover:bg-blue-700 text-white font-latobold py-2 my-4 px-4 rounded w-64' onClick={handleChangePasswordSubmit}>CONFIRMER</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default InitializePasswordUser;