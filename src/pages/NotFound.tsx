import MidLogo from '../assets/image/mid-logo.jpg'

function NotFound() {
    return(
        <>
            <div className=' h-screen flex flex-col justify-center'>
                <div className='w-80 mx-auto'>
                    <div className='text-center'>
                        <img src={MidLogo} className='h-36 w-36 object-cover mx-auto' alt="Logo du ministere" />
                        <div className='text-lg font-bold'>MINITER: Audience</div>
                    </div>
                    <div className='text-xl font-bold my-4 text-center'>Erreur 404: Page introuvable !</div>
                </div>
            </div>
        </>
    )
}

export default NotFound;