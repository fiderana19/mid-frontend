import { Input } from "antd";
import { Link } from "react-router-dom";
import MidLogo from '../assets/image/mid-logo.jpg'

function Signup() {
    return(
        <div className='bg-red-300 h-screen flex flex-col justify-center'>
            <div className='flex justify-between '>
                <div>
                    <div className='text-2xl font-bold font-lato'>MINISTERE DE L'INTERIEUR</div>
                    <div>Demander une audience avec le ministre en ligne </div>
                    <img src={MidLogo} alt='Logo du ministere' className='w-14 h-14' />
                </div>
                <div className='w-1/3 clip-path-mypolygon bg-gray-500 h-screen text-center border border-black-1 py-5 px-10 justify-center'>
                    <div className='text-2xl font-lato font-bold'>Inscription</div>
                    <Input name='email' placeholder='email' className='w-56' /><br />
                    <Input name='password' placeholder='password' className='w-56 mt-5' /><br />
                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>S'INSCRIRE</button>
                    <div className="text-xs">
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