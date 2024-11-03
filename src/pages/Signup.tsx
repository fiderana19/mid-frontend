import { Link } from 'react-router-dom';
import MidLogo from '../assets/image/mid-logo.jpg'
import SignupForm from './Signup/SignupForm';

function Signup() {

    return(
        <div className='bg-red-300 h-screen flex flex-col justify-center'>
            <div className='flex justify-between '>
                <div>
                    <div className='text-2xl font-bold font-lato'>MINISTERE DE L'INTERIEUR</div>
                    <div>Demander une audience avec le ministre en ligne </div>
                    <img src={MidLogo} alt='Logo du ministere' className='w-14 h-14' />
                </div>
                <div className='w-1/3 flex flex-col bg-gray-500 h-screen text-center border border-black-1 py-5 px-10 justify-center'>
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
            </div>
        </div>
    )
}

export default Signup;