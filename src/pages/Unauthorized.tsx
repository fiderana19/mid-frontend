import MidLogo from '../assets/image/mid-logo.jpg'

function Unauthoriezd() {
    return(
        <>
            <div className=' h-screen flex flex-col justify-center'>
                <div className='w-80 mx-auto'>
                    <div className='text-center'>
                        <img src={MidLogo} className='h-36 w-36 object-cover mx-auto' alt="Logo du ministere" />
                        <div className='text-lg font-latobold'>MININTER: Audience</div>
                    </div>
                    <div className='text-xl font-latobold my-4 text-center'>Erreur 403 : Page non autorisé !</div>
                </div>
        </div>
        </>
    )
}

export default Unauthoriezd;