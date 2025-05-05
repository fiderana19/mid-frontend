import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingOutlined, MailOutlined } from "@ant-design/icons";
import { FunctionComponent } from 'react';

interface StepsProp {
    handlePrev: () => void;
    handleSignupUser: () => void;
    handleChange: (e: any) => void;
    handleChangeFile: (e: any) => void;
    apiLoading: boolean;
    formData: any;
}

const SignupFile: FunctionComponent<StepsProp> = ({formData, apiLoading, handlePrev, handleSignupUser, handleChangeFile, handleChange}) => {

    async function handleSubmit () {
        handleSignupUser();
    }
    
    return(
        <div>
            <div className='w-60 my-4 mx-auto'>
                <div className="text-left text-xs font-bold">
                    Adresse mail
                </div>
                <div className="relative">
                    <Input 
                        value={formData.email} 
                        onChange={handleChange} 
                        name="email"
                        placeholder="Saisir votre adresse mail..."
                        className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                    <MailOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                </div>
            </div>
            <div className='w-60 my-4 mx-auto overflow-hidden'>
                <div className="">
                    <div className="text-left text-xs font-bold">
                        Photo d'identité
                    </div>
                    <Input onChange={handleChangeFile} name="profile_photo" type="file" className="text-sm w-full whitespace-normal rounded border border-white" />
                </div>
            </div>
            <div className='w-60 my-4 mx-auto overflow-hidden'>
                <div className="">
                    <div className="text-left text-xs font-bold">
                        Scan du CIN
                    </div>
                    <Input onChange={handleChangeFile} name="cni_photo" type="file" className="text-sm w-full whitespace-normal rounded border border-white" />
                </div>
            </div>
            <div className="flex justify-end gap-2 items-center">
                <Button variant={'default'} onClick={handlePrev} className="border hover:border-gray-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-gray-500">Précédent</Button>
                <Button
                    variant={'secondary'} 
                    onClick={handleSubmit} 
                    disabled={ apiLoading ? true : false }
                    className= { apiLoading ? "bg-green-400 cursor-not-allowed flex gap-2 items-center border text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500" : "flex gap-2 items-center border bg-green-500 hover:border-green-600 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500" } 
                    >   
                    { apiLoading && <LoadingOutlined /> }
                    <div>S'incrire</div>
                </Button>
            </div>  
        </div>
    )
}

export default SignupFile;