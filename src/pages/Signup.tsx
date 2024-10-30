import { Link } from "react-router-dom";
import { DatePicker, Modal } from 'antd';
import MidLogo from '../assets/image/mid-logo.jpg'
import { UserOutlined, LockOutlined, EyeOutlined, MailOutlined, PhoneOutlined, CreditCardOutlined, ContactsOutlined, EnvironmentOutlined, CheckCircleFilled } from "@ant-design/icons";
import { useState } from 'react';
import { SignupInterface } from '../interfaces/User';
import dayjs from "dayjs";
import { userSignup } from "../api/users";

function Signup() {
    const [signupCredentials, setSignupCredentials] = useState<SignupInterface>({nom: '', prenom: '', email: '', telephone: '', date_naissance: '', lieu_naissance: '', cni: '', date_cni: '', lieu_cni: '', password: ''});
    const [isRegisteredModalVisible, setIsRegisteredModalVisible] = useState<boolean>(false);

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

    const handleSignupUser = async () => {
        console.log(signupCredentials);
        const response = await userSignup(signupCredentials);
        console.log(response);
        if(response?.status === 201) {
            setIsRegisteredModalVisible(true);
        }
    }

    const handleModalOk = async () => {
        setIsRegisteredModalVisible(false);
    }

    return(
        <div className='bg-red-300 h-screen flex flex-col justify-center'>
            <div className='flex justify-between '>
                <div>
                    <div className='text-2xl font-bold font-lato'>MINISTERE DE L'INTERIEUR</div>
                    <div>Demander une audience avec le ministre en ligne </div>
                    <img src={MidLogo} alt='Logo du ministere' className='w-14 h-14' />
                </div>
                <div className='w-1/3 bg-gray-500 h-screen text-center border border-black-1 py-5 px-10 justify-center'>
                    <div className='text-2xl font-lato font-bold my-4'>Inscription</div>
                    <div className='w-60 my-4 mx-auto'>
                        <div className="relative">
                            <input onChange={handleChange} name="nom"
                            className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
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
                            className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
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
                            className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
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
                            className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
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
                            className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
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
                            className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
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
                            className="peer w-full bg-transparent focus:bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            />
                            <label className="absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                            Lieu CNI...
                            </label>
                            <EnvironmentOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                        </div>
                    </div>
                    <div className='w-60 my-4 mx-auto'>
                        <div className="relative">
                            <input onChange={handleChange} name="password"
                            className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            />
                            <label className="absolute cursor-text px-7 left-3 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                            Mot de passe...
                            </label>
                            <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                            <EyeOutlined className='absolute top-1.5 right-1.5 cursor-pointer p-1.5' />
                        </div>
                    </div>
                    <button onClick={handleSignupUser} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>S'INSCRIRE</button>
                    <div className='text-xs my-7 flex mx-auto max-w-max gap-2'>
                        <div>Vous avez déjà un compte ?</div>
                        <Link to="/">
                            <div className='text-blue-400 underline'>
                                Se connecter
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Modal title="Inscription réussie" 
                open={isRegisteredModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalOk}
            >
                <div className='text-red-900'>
                    <CheckCircleFilled className='mr-2' />  
                    Vos informations sont bien envoyés et en attente du validation de l'administrateur.
                    Vous serez notifier par email quand votre compte sera validé !
                </div>
            </Modal>
        </div>
    )
}

export default Signup;