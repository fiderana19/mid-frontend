import { Steps ,Button, Modal  } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import SignupPersonnal from './SignupPersonnal';
import { userSignup } from '../../api/users';
import { useNavigate } from 'react-router-dom';
import { SignupInterface } from '../../interfaces/User';
import dayjs from 'dayjs';
import SignupBirth from './SignupBirth';
import SignupCNI from './SignupCNI';
import { CheckCircleFilled } from '@ant-design/icons';
const {Step} = Steps

const AddForms: FunctionComponent = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [signupCredentials, setSignupCredentials] = useState<SignupInterface>({nom: '', prenom: '', email: '', telephone: '', date_naissance: '', lieu_naissance: '', cni: '', date_cni: '', lieu_cni: ''});
    const [isRegisteredModalVisible, setIsRegisteredModalVisible] = useState<boolean>(false);
    const [initialPwd, setInitialPwd] = useState<any>();
    const navigate = useNavigate();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setSignupCredentials((prevSignup) => ({...prevSignup, [name]: value}));
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
        const response = await userSignup(signupCredentials);
        setInitialPwd(response?.data.initialPwd);
        if(response?.status === 201) {
            setIsRegisteredModalVisible(true);
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
    <div className="w-60 mx-auto">
        <div className='text-2xl font-bold mb-5'>CREER UN COMPTE</div>
        <div className='w-full flex justify-between my-7'>
            <Steps current={currentStep}>
              <Step title="" status={currentStep > 0 ? 'finish' : 'process'} />
              <Step title="" status={currentStep > 1 ? 'finish' : currentStep === 1 ? 'process' : 'wait'} />
              <Step title="" status={currentStep > 2 ? 'finish' : currentStep === 2 ? 'process' : 'wait'} />
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
                <SignupCNI formData={signupCredentials} handleChange={handleChange} handleDateCNIChange={handleDateCNIChange} handleKeyPress={handleKeyPress} handleSignupUser={handleSignupUser} handlePrev={handlePreviousPage} />
                <Modal title="Inscription réussie" 
                    open={isRegisteredModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalOk}
                >
                    <div className='text-red-900'>
                        <CheckCircleFilled className='mr-2' />  
                        Vos informations sont bien envoyés et en attente du validation de l'administrateur.
                        Vous serez notifier par email quand votre compte sera validé !
                        <div>
                            Votre mot de passe initial est : { initialPwd }
                        </div>
                    </div>
                </Modal> 
            </div>
          )}
        </div>
  )
}

export default AddForms