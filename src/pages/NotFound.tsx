import React from 'react';
import MidLogo from '../assets/image/mid-logo.jpg'

const NotFound: React.FC = () => {
    return(
        <>
            <div className='min-h-screen flex flex-col justify-center bg-four'>
                <div className='w-80 mx-auto'>
                    <div className='text-center'>
                        <img src={MidLogo} className='h-36 w-36 object-cover mx-auto' alt="Logo du ministere" />
                        <div className='text-lg font-latobold'>MININTER: Audience</div>
                    </div>
                    <div className='text-xl font-latobold my-4 text-center'>Erreur 404: Page introuvable !</div>
                </div>
            </div>
        </>
    )
}

export default NotFound;