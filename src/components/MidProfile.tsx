import MidLogo from '../assets/image/mid-logo.jpg';
import { FunctionComponent } from 'react';

const MidProfile: FunctionComponent = () => {
    return(
        <div className="">
            <img src={MidLogo} alt="Logo du ministere" className="w-10 h-10 md:w-20 md:h-20 object-cover rounded-full mx-auto" />
            <div className="text-md font-latobold text-white mt-2 md:block hidden">MININTER: Audience</div>
        </div>
    )
}

export default MidProfile;