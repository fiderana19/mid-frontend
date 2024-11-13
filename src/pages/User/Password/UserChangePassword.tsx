import { LockOutlined } from "@ant-design/icons";
import UserNavigation from "../../../components/Navigation/UserNavigation";

function UserChangePassword() {

    return (
        <>
            <div className="w-full">
                <UserNavigation />
                <div className="pt-16 px-20">
                    <div className="w-80 mx-auto mt-10 mb-5">
                        <div className="font-bold text-xl my-4 text-center">Changer mot de passe</div>
                            <div className="border rounded p-4">
                                <div className='w-64 my-2 mx-auto'>
                                    <div className="text-left text-xs font-bold">
                                            Mot de passe actuel...
                                    </div>
                                    <div className="relative">
                                        <input 
                                            name='password'
                                            placeholder='Saisir votre mot de passe actuel...'
                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                        />
                                        <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                    </div>
                                </div>
                                <div className='w-64 my-2 mx-auto'>
                                    <div className="text-left text-xs font-bold">
                                            Nouveau mot de passe...
                                    </div>
                                    <div className="relative">
                                        <input 
                                            name='password'
                                            placeholder='Saisir le nouveau mot de passe...'
                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                        />
                                        <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                    </div>
                                </div>
                                <div className='w-64 my-2 mx-auto'>
                                    <div className="text-left text-xs font-bold">
                                            Confirmation nouveau mot de passe...
                                    </div>
                                    <div className="relative">
                                        <input 
                                            name='password'
                                            placeholder='Confirmer le nouveau mot de passe...'
                                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                        />
                                        <LockOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white mx-auto font-bold py-2 my-4 px-4 rounded'>CONFIRMER</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserChangePassword;