import { EyeOutlined, LockOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { UpdateUserPassword } from '../../interfaces/User';
import { message } from 'antd';
import { getUserById, initializePassword } from '../../api/users';
import { useNavigate } from 'react-router-dom';

function InitializePasswordUser() {
    const [updatePasswordCredentials, setUpdatePasswordCredentials] = useState<UpdateUserPassword>({ password: '' });
    const [user, setUser] = useState<any>();
    const navigate = useNavigate();
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    )

    useEffect(() => { 
        async function fetchUser() {
          const token = localStorage.getItem("token");
  
          if(token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const response = await getUserById(token,decodedToken.id);
  
            setUser(response)
            setAccessToken(token);
          }
        }
        fetchUser()
    }, [])

    const handleChangePasswordSubmit = async () => {
        message.success(`eto eee ${user._id} ${access_token} ${updatePasswordCredentials.password}`);
        const response = await initializePassword(access_token, user._id, updatePasswordCredentials);
        console.log(response);
        if(response?.status === 200) {
            navigate("/user/home");
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUpdatePasswordCredentials((prev) => ({...prev, [name]: value}));
    }

    return (
        <div className='bg-red-300 h-screen flex flex-col justify-center'>
                <div className='bg-gray-500 h-screen text-center py-5 px-10 flex flex-col justify-center'>
                    {/* <img src={MidLogo} className='h-60 w-60 object-cover' alt="Logo du ministere" /> */}
                    <div className='text-2xl font-lato font-bold my-4'>Veuillez initialiser votre mot de passe</div>
                    <div className='w-64 my-2 mx-auto'>
                        <div className="relative">
                            <input onChange={handleChange} name='password'
                            className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            />
                            <label className={(updatePasswordCredentials.password == '') ? 'absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-1.5 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400  peer-focus:scale-90' : `absolute cursor-text px-7 transition-all transform origin-left -top-1.5 left-2.5 text-xs text-slate-400 scale-90`}>
                            Mot de passe...
                            </label>
                            <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                            <EyeOutlined className='absolute top-1.5 right-1.5 cursor-pointer p-1.5' />
                        </div>
                    </div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white mx-auto font-bold py-2 my-4 px-4 rounded w-64' onClick={handleChangePasswordSubmit}>SE CONNECTER</button>
                </div>
        </div>
    )
}

export default InitializePasswordUser;