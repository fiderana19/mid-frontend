import { Steps ,Button, Modal  } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import SignupPersonnal from './SignupPersonnal';
import { userSignup } from '../../api/users';
import { useNavigate } from 'react-router-dom';
import { SignupInterface } from '../../interfaces/User';
import dayjs from 'dayjs';
import SignupBirth from './SignupBirth';
import SignupCNI from './SignupCNI';
import { CheckCircleFilled, WarningFilled } from '@ant-design/icons';
import SignupFile from './SignupFile';
import { HttpStatus } from '../../constants/Http_status';
const {Step} = Steps

const AddForms: FunctionComponent = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [signupCredentials, setSignupCredentials] = useState<SignupInterface>({nom: '', prenom: '', email: '', adresse: '', telephone: '', date_naissance: '', lieu_naissance: '', cni: '', date_cni: '', lieu_cni: '', profile_photo: '', cni_photo : ''});
    const [isRegisteredModalVisible, setIsRegisteredModalVisible] = useState<boolean>(false);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState<boolean>(false);
    const [signupError, setSignupError] = useState<string>('');
    const [initialPwd, setInitialPwd] = useState<any>();
    const [apiLoading, setApiLoading] = useState<boolean>(false);
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

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = e.which || e.keyCode;

        if(charCode < 48 || charCode > 57) {
            e.preventDefault();
        }
    }

    const handleDateNaissanceChange = (date: dayjs.Dayjs | null) => {
        if (date) {
        const isoDate = date.toISOString();
        setSignupCredentials({
            ...signupCredentials,
            date_naissance: isoDate,
        });
        }
    };

    const handleDateCNIChange = (date: dayjs.Dayjs | null) => {
        if (date) {
        const isoDate = date.toISOString();
        setSignupCredentials({
            ...signupCredentials,
            date_cni: isoDate,
        });
        }
    };

    const handleSignupUser = async () => {
        setApiLoading(true);
        const response = await userSignup(signupCredentials);
        if(response) {
            if(response?.status === HttpStatus.CREATED) {
                setApiLoading(false);
                setIsRegisteredModalVisible(true);
                setInitialPwd(response?.data.initialPwd);
            }
            if(response?.status === HttpStatus.UNAUTHORIZED) {
                setApiLoading(false);
                setSignupError(response?.response.data.message);
                setIsErrorModalVisible(true);
            }     
        }
    }

    const handleModalOk = async () => {
        setIsRegisteredModalVisible(false);
        navigate("/");
    }

    //handling next or prev page
    const handleNextPage = () => {
      setCurrentStep(currentStep + 1);
    };
  
    const handlePreviousPage = () => {
      setCurrentStep(currentStep - 1);
    };
    
    useEffect(() => {  
     
    }, [])
 
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
                    <SignupPersonnal formData={signupCredentials} handleChange={handleChange} handleNext={handleNextPage} />
                </div>
            )}
            {currentStep === 1 && (
                <div>
                    <SignupBirth formData={signupCredentials} handleChange={handleChange} handleDateNaissanceChange={handleDateNaissanceChange} handleKeyPress={handleKeyPress} handleNext={handleNextPage} handlePrev={handlePreviousPage} />
                </div>
            )}
            {currentStep === 2 && (
                <div>
                    <SignupCNI formData={signupCredentials}  handleChange={handleChange} handleDateCNIChange={handleDateCNIChange} handleKeyPress={handleKeyPress} handleNext={handleNextPage} handlePrev={handlePreviousPage} />
                </div>
            )}
            {currentStep === 3 && (
                <div>
                    <SignupFile formData={signupCredentials} apiLoading={apiLoading} setApiLoading={setApiLoading} handleChangeFile={handleChangeFile} handleChange={handleChange} handlePrev={handlePreviousPage} handleSignupUser={handleSignupUser} />
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
                    <Modal title="Erreur" 
                        open={isErrorModalVisible}
                        onOk={() => setIsErrorModalVisible(false)}
                        onCancel={() => setIsErrorModalVisible(false)}
                        onClose={() => setIsErrorModalVisible(false)}
                    >
                        <div>
                            <WarningFilled className='mr-2 text-red-500 text-lg' /> 
                            {
                                signupError &&
                                <span> {signupError} </span>
                            }
                        </div>
                    </Modal>
                </div>
            )}
        </div>
    </div>
  )
}

export default AddForms