import { Steps , Modal  } from 'antd'
import { FunctionComponent, lazy, Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SignupInterface } from '../../interfaces/User';
const SignupBirth = lazy(() => import('./SignupBirth'));
const SignupCNI = lazy(() => import('./SignupCNI'));
const SignupPersonnal = lazy(() => import('./SignupPersonnal'));
const SignupFile = lazy(() => import('./SignupFile'));
import { CheckCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { HttpStatus } from '../../constants/Http_status';
import { useSignupUser } from '@/hooks/useSignupUser';
const {Step} = Steps

const AddForms: FunctionComponent = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [signupCredentials, setSignupCredentials] = useState<SignupInterface>({nom: '', prenom: '', email: '', adresse: '', telephone: '', date_naissance: '', lieu_naissance: '', cni: '', date_cni: '', lieu_cni: '', profile_photo: '', cni_photo : ''});
    const [isRegisteredModalVisible, setIsRegisteredModalVisible] = useState<boolean>(false);
    const [initialPwd, setInitialPwd] = useState<any>();
    const { mutateAsync: userSignup, isPending: apiLoading } = useSignupUser()
    const navigate = useNavigate();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setSignupCredentials((prevSignup) => ({...prevSignup, [name]: value}));
    }

    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files, name } = e.target;
        const selectedFiles = files as FileList;
        const file = selectedFiles[0];
        setSignupCredentials((prevSignup) => ({...prevSignup, [name]: file}));
    }

    const handleSignupUser = async () => {
        const response = await userSignup(signupCredentials);
        if(response) {
            if(response?.status === HttpStatus.CREATED) {
                setIsRegisteredModalVisible(true);
                setInitialPwd(response?.data.initialPwd);
            }
        }
    }

    const handleModalOk = async () => {
        setIsRegisteredModalVisible(false);
        navigate("/");
    }

    const handleNextPage = () => {
      setCurrentStep(currentStep + 1);
    };
  
    const handlePreviousPage = () => {
      setCurrentStep(currentStep - 1);
    };
     
  return (
    <div className="sm:w-60 w-max mx-auto">
        <div className='text-2xl font-bold mb-5'>CREER UN COMPTE</div>
        <div className='sm:block flex'>
            <div className='sm:w-full w-max my-7'>
                <Steps current={currentStep}>
                <Step title="" status={currentStep > 0 ? 'finish' : 'process'} />
                <Step title="" status={currentStep > 1 ? 'finish' : currentStep === 1 ? 'process' : 'wait'} />
                <Step title="" status={currentStep > 2 ? 'finish' : currentStep === 2 ? 'process' : 'wait'} />
                <Step title="" status={currentStep > 3 ? 'finish' : currentStep === 3 ? 'process' : 'wait'} />
                </Steps>
            </div>
            {currentStep === 0 && (
                <div>
                    <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                        <SignupPersonnal formData={signupCredentials} setFormData={setSignupCredentials} handleNext={handleNextPage} />
                    </Suspense>
                </div>
            )}
            {currentStep === 1 && (
                <div>
                    <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                        <SignupBirth setFormData={setSignupCredentials} formData={signupCredentials} handleNext={handleNextPage} handlePrev={handlePreviousPage} />
                    </Suspense>
                </div>
            )}
            {currentStep === 2 && (
                <div>
                    <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                        <SignupCNI setFormData={setSignupCredentials} formData={signupCredentials}  handleNext={handleNextPage} handlePrev={handlePreviousPage} />
                    </Suspense>
                </div>
            )}
            {currentStep === 3 && (
                <div>
                    <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                        <SignupFile formData={signupCredentials} apiLoading={apiLoading} handleChangeFile={handleChangeFile} handleChange={handleChange} handlePrev={handlePreviousPage} handleSignupUser={handleSignupUser} />
                    </Suspense>
                    <Modal title="Inscription réussie" 
                        open={isRegisteredModalVisible}
                        onOk={handleModalOk}
                        closeIcon={false}
                        footer={null}
                    >
                        <div>
                            <CheckCircleFilled  className='text-green-500 mr-2' />  
                            Vos informations sont bien envoyés et en attente du validation de l'administrateur.<br />
                            Vous serez notifier par email quand votre compte sera validé !
                            <div className='mt-4'>
                                Votre mot de passe initial est : { initialPwd }
                            </div>
                            <div className='flex justify-end'>
                            <button 
                            onClick={handleModalOk}
                                className="border mt-2 bg-blue-500 hover:border-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >OK</button>
                            </div>
                        </div>
                    </Modal> 
                </div>
            )}
        </div>
    </div>
  )
}

export default AddForms