import { Link } from 'react-router-dom';
import MidLogo from '../assets/image/mid-logo.jpg';
import Bg from '../assets/image/bg-login.jpeg';
import React, { lazy, Suspense } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/button';
const SignupForm = lazy(() => import('./Signup/SignupForm'));

const Signup: React.FC = () => {
    return(
        <div className='min-h-screen flex flex-col justify-center'>
            <div className='sm:flex block justify-between '>
                <div className='lg:w-1/3 sm:w-1/2 w-full flex flex-col bg-primary-custom h-screen text-center py-5 sm:px-10 px-4 justify-center'>
                    <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                        <SignupForm />
                    </Suspense>
                    <div className='text-xs my-7 flex items-center mx-auto max-w-max gap-2'>
                        <div>Vous avez déjà un compte ?</div>
                        <Link to="/">
                            <Button variant={'link'} size={'sm'}>Se connecter</Button>
                        </Link>
                    </div>
                </div>
                <div className="lg:w-2/3 sm:w-1/2 w-full relative">
                    <img src={Bg} alt="" className='-z-50 absolute w-full h-full object-cover' />
                    <div className='z-50 flex flex-col justify-center h-screen low-bg-opacity'>
                        <div className='text-white lg:px-20 sm:px-10 px-4'>
                            <img src={MidLogo} alt='Logo du ministere' className='w-28 h-28 object-cover' />
                            <div className='text-4xl font-latobold mt-5 mb-4'>MINISTERE DE L'INTERIEUR</div>
                            <div>Demander une audience avec le ministre en ligne </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;