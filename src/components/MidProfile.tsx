import MidLogo from '../assets/image/mid-logo.jpg';
import { FunctionComponent } from 'react';

const MidProfile: FunctionComponent = () => {
    return(
        <div className="">
            <img src={MidLogo} alt="Logo du ministere" className="w-20 h-20 object-cover rounded-full mx-auto" />
            <div className="text-md font-semibold mt-2">Gestion d'audience avec le ministre</div>
        </div>
    )
}

export default MidProfile;