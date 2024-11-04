import Header from "../../../components/Header";
import AdminNavigation from "../../../components/Navigation/AdminNavigation";
import MidLogo from '../../../assets/image/mid-logo.jpg';
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editUser, getUserById } from "../../../api/users";
import dayjs from "dayjs";
import { SignupInterface } from "../../../interfaces/User";
import { UserOutlined, MailOutlined, EnvironmentOutlined, PhoneOutlined, ContactsOutlined, LockOutlined, EyeOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";

const AdminAccountEdit: React.FC = () => {
    const [user, setUser] = useState<any>();
    const [signupCredentials, setSignupCredentials] = useState<SignupInterface>({nom: '', prenom: '', email: '', telephone: '', date_naissance: '', lieu_naissance: '', cni: '', date_cni: '', lieu_cni: ''});
    const [access_token, setAccessToken] = useState<string | null>(
        localStorage.getItem('token')
    );
    let req = useParams();
    const navigate = useNavigate();
    let userId = req.id;

    useEffect(() => { 
        const token = localStorage.getItem('token');
        if(token) {
            setAccessToken(token);
        }
        fetchUser()
    }, [])

    async function fetchUser() {
        if(userId) {
            console.log("ito le id", userId)

            const response = await getUserById(access_token,userId);

            console.log(response)
            setUser(response)    
            setSignupCredentials(response);
        }
    }    

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setSignupCredentials((prevSignup) => ({...prevSignup, [name]: value}));
    }

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = e.which || e.keyCode;

        if(charCode < 48 || charCode > 57) {
            e.preventDefault();
        }
    }

    const handleDateNaissanceChange = (date: dayjs.Dayjs | null) => {
        if (date) {
        const isoDate = date.toISOString();
        setSignupCredentials({
            ...signupCredentials,
            date_naissance: isoDate,
        });
        }
    };

    const handleDateCNIChange = (date: dayjs.Dayjs | null) => {
        if (date) {
        const isoDate = date.toISOString();
        setSignupCredentials({
            ...signupCredentials,
            date_cni: isoDate,
        });
        }
    };

    const handleUserEdit = async () => {
        const response = await editUser(access_token,user._id, signupCredentials)
        console.log("le vita eto", signupCredentials , "de avy eo eto", response);
        fetchUser();
    }

    return(
        <>
            <div className="w-full flex">
                <div className="w-1/6">
                    <AdminNavigation />
                </div>
                <div className="w-5/6">
                    <div className="z-50 fixed top-0 right-0 w-5/6">
                        <Header />
                    </div>
                    <div className="px-5 py-16">
                        MODIFIER COMPTE DE CITOYEN
                        {
                            user && 
                            <div className="text-center">
                            <img src={MidLogo}  className="mx-auto w-40 h-40 object-cover rounded-full border border-red-200"/>
                            <div className='w-1/3 bg-gray-500 h-screen text-center border border-black-1 py-5 px-10 justify-center'>
                            <div className='w-60 my-4 mx-auto'>
                                <div className="relative">
                                    <input onChange={handleChange} name="nom"
                                       value={signupCredentials.nom} className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    />
                                    <label className="absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                                        Nom...
                                    </label>
                                    <UserOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                </div>
                            </div>
                            <div className='w-60 my-4 mx-auto'>
                                <div className="relative">
                                    <input onChange={handleChange} name="prenom"
                                       value={signupCredentials.prenom} className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    />
                                    <label className="absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                                        Prenom(s)...
                                    </label>
                                    <UserOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                </div>
                            </div>
                            <div className='w-60 my-4 mx-auto'>
                                <div className="relative">
                                    <input onChange={handleChange} name="email"
                                       value={signupCredentials.email} className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    />
                                    <label className="absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                                        Adresse mail...
                                    </label>
                                    <MailOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                </div>
                            </div>
                            <div className='w-60 my-4 mx-auto'>
                                <DatePicker onChange={handleDateNaissanceChange} className="w-full py-1.5 bg-transparent placeholder:text-slate-400" placeholder="Date de naissance..." />
                            </div>
                            <div className='w-60 my-4 mx-auto'>
                                <div className="relative">
                                    <input onChange={handleChange} name="lieu_naissance"
                                       value={signupCredentials.lieu_naissance} className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    />
                                    <label className="absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                                        Lieu de naissance...
                                    </label>
                                    <EnvironmentOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                </div>
                            </div>
                            <div className='w-60 my-4 mx-auto'>
                                <div className="relative">
                                    <input onChange={handleChange} onKeyPress={handleKeyPress} name="telephone"
                                       value={signupCredentials.telephone} className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    />
                                    <label className="absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                                        Telephone...
                                    </label>
                                    <PhoneOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                </div>
                            </div>
                            <div className='w-60 my-4 mx-auto'>
                                <div className="relative">
                                    <input onKeyPress={handleKeyPress} name="cni" onChange={handleChange}
                                       value={signupCredentials.cni} className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    />
                                    <label className="absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                                        CNI...
                                    </label>
                                    <ContactsOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                </div>
                            </div>
                            <div className='w-60 my-4 mx-auto'>
                                <DatePicker onChange={handleDateCNIChange} className="w-full py-1.5 bg-transparent placeholder:text-slate-400" placeholder="Date CNI..."  />
                            </div>
                            <div className='w-60 my-4 mx-auto'>
                                <div className="relative">
                                    <input onChange={handleChange} name="lieu_cni"
                                       value={signupCredentials.lieu_cni} className="peer w-full bg-transparent focus:bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    />
                                    <label className="absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                                        Lieu CNI...
                                    </label>
                                    <EnvironmentOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                </div>
                            </div>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500' onClick={handleUserEdit} >Modifier</button>
                            </div>
                            </div>
                        }
                </div>
            </div>
            </div>
        </>
    )
}

export default AdminAccountEdit;