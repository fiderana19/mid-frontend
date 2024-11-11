import { Link } from 'react-router-dom';
import MidLogo from '../assets/image/mid-logo.jpg'
import SignupForm from './Signup/SignupForm';

function Signup() {

    return(
        <div className='h-screen flex flex-col justify-center'>
            <div className='flex justify-between '>
            <div className='w-1/3 flex flex-col bg-second h-screen text-center py-5 px-10 justify-center'>
                    <SignupForm />
                    <div className='text-xs my-7 flex mx-auto max-w-max gap-2'>
                        <div>Vous avez déjà un compte ?</div>
                        <Link to="/">
                            <div className='text-blue-400 underline'>
                                Se connecter
                            </div>
                        </Link>
                    </div>
                </div>
                <div className=" bg-[url('src/assets/image/bg-login.jpeg')] bg-cover w-full">
                    <div className='flex flex-col justify-center h-screen bg-black bg-opacity-45'>
                        <div className='text-white px-20'>
                            <img src={MidLogo} alt='Logo du ministere' className='w-28 h-28 object-cover' />
                            <div className='text-4xl font-bold font-lato mt-5 mb-4'>MINISTERE DE L'INTERIEUR</div>
                            <div>Demander une audience avec le ministre en ligne </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;