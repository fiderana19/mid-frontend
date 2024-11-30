import { LockOutlined, WarningOutlined } from "@ant-design/icons";
import UserNavigation from "../../../components/Navigation/UserNavigation";
import { useEffect, useState } from "react";
import { getUserById, updatePassword } from "../../../api/users";
import { UpdateUserPassword } from "../../../interfaces/User";
import { message } from 'antd';
import { useNavigate } from "react-router-dom";

function UserChangePassword() {
    const [updatePasswordData, setUpdatePasswordData] = useState<UpdateUserPassword>({ old_password: '', new_password: '' });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [user, setUser] = useState<any>();
    const [emptyPasswordError, setEmptyPasswordError] = useState<string>('');
    const [newPassordError, setNewPassordError] = useState<string>('');
    const [matchPassordError, setMatchPassordError] = useState<string>('');
    const [notMatchedError, setNotMatchedPasswordError] = useState<string>('');
    const navigate = useNavigate();
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    )

    useEffect(() => { 
        const token = localStorage.getItem("token");
        if(token) {
            setAccessToken(token);
        }
        fetchUser()
    }, [])

    async function fetchUser() {
        const token = localStorage.getItem("token");

        if(token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const response = await getUserById(token,decodedToken.id);

          setUser(response)
        }
    }

    async function updatePasswordSubmit() {
        setNewPassordError('');
        setMatchPassordError('');
        setNotMatchedPasswordError('');
        setEmptyPasswordError('');

        if(updatePasswordData.old_password === "") {
            setEmptyPasswordError("Veuiller saisir l'ancien mot de passe !")
        }
        if(updatePasswordData.new_password.length < 6) {
            setNewPassordError('Le mot doit comporter au moins 6 caractères !')
        }
        if(updatePasswordData.new_password !== confirmPassword) {
            setMatchPassordError('Confirmation mot de passe incorrecte !')
        }

        if(updatePasswordData.new_password.length >= 6 && updatePasswordData.new_password === confirmPassword && updatePasswordData.old_password !== "") {
            const response = await updatePassword(access_token,user._id,updatePasswordData);
            if(response.status === 401) {
                setNotMatchedPasswordError(response.response.data.message);
            }
            if(response.status === 200) {
                message.success("Mot de passe changé !");
                navigate("/user/info");
            }
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassordError('');
        setMatchPassordError('');
        setNotMatchedPasswordError('');
        setEmptyPasswordError('');

        const {name, value} = e.target;
        setUpdatePasswordData((prev) => ({...prev, [name]: value}));
    }

    const handleConfirmChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassordError('');
        setMatchPassordError('');
        setNotMatchedPasswordError('');
        setEmptyPasswordError('');

        const {value} = e.target;
        setConfirmPassword(value);
    }

    return (
        <>
            <div className="w-full min-h-screen bg-four">
                <UserNavigation />
                <div className="pt-16 sm:px-20 px-4">
                    <div className="sm:w-80 w-full mx-auto mt-10 mb-5">
                        <div className="font-latobold text-xl my-4 text-center">Changer mot de passe</div>
                            <div className="border rounded p-4 bg-white shadow-md">
                                {
                                    notMatchedError &&  
                                    <div className="bg-red-300 w-64 transition-opacity mx-auto p-2 border border-red-500 rounded text-xs">
                                        <WarningOutlined />
                                        <span className="ml-2"> { notMatchedError } </span>
                                    </div>
                                }
                               
                                <div className='w-64 my-2 mx-auto'>
                                    <div className="text-left text-xs font-latobold">
                                            Mot de passe actuel
                                    </div>
                                    <div className="relative">
                                        <input 
                                            type="password"
                                            onChange={handleChange}
                                            name='old_password'
                                            placeholder='Saisir votre mot de passe actuel...'
                                            className={ emptyPasswordError ?  "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-red-500 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" :  "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" }
                                        />
                                        <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                    </div>
                                    { emptyPasswordError && <div className="text-xs text-red-500">{ emptyPasswordError }</div> }
                                </div>
                                <div className='w-64 my-2 mx-auto'>
                                    <div className="text-left text-xs font-latobold">
                                            Nouveau mot de passe
                                    </div>
                                    <div className="relative">
                                        <input 
                                            type="password"
                                            onChange={handleChange}
                                            name='new_password'
                                            placeholder='Saisir le nouveau mot de passe...'
                                            className={ newPassordError ?  "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-red-500 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" :  "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" }
                                        />
                                        <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                    </div>
                                    { newPassordError && <div className="text-xs text-red-500">{ newPassordError }</div> }
                                </div>
                                <div className='w-64 my-2 mx-auto'>
                                    <div className="text-left text-xs font-latobold">
                                            Confirmation nouveau mot de passe
                                    </div>
                                    <div className="relative">
                                        <input 
                                            onChange={handleConfirmChange}
                                            type="password"
                                            name='password'
                                            placeholder='Confirmer le nouveau mot de passe...'
                                            className={ matchPassordError ?  "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-red-500 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" :  "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" }
                                        />
                                        <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                    </div>
                                    { matchPassordError && <div className="text-xs text-red-500">{ matchPassordError }</div> }
                                </div>
                                <div className="flex justify-center">
                                    <button 
                                        onClick={updatePasswordSubmit}
                                        className='bg-blue-500 hover:bg-blue-700 text-white mx-auto font-latobold py-2 mt-2 px-4 rounded'
                                    >CHANGER</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserChangePassword;