import { Input } from 'antd';
import MidLogo from '../assets/image/mid-logo.jpg';

function Login() {
    return (
        <div className='bg-red-300 h-screen flex flex-col justify-center'>
            <div className='flex justify-between '>
                <div>
                    <div className='text-2xl font-bold font-lato'>MINISTERE DE L'INTERIEUR</div>
                    <div>Demander une audience avec le ministre en ligne </div>
                    <img src={MidLogo} alt='Logo du ministere' className='w-14 h-14' />
                </div>
                <div className='w-1/3 clip-path-mypolygon bg-gray-500 h-screen text-center border border-black-1 py-5 px-10 justify-center'>
                    <div className='text-2xl font-lato font-bold'>Connexion</div>
                    <Input name='email' placeholder='email' className='w-56' /><br />
                    <Input name='password' placeholder='password' className='w-56 mt-5' /><br />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>SE CONNECTER</button>
                </div>
            </div>
        </div>
    )
}

export default Login;