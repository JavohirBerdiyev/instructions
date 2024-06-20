import React, {useMemo, Suspense, useEffect} from 'react';
import {Container, AdaptableCard} from 'components/shared';
import FormStep from './components/FormStep';
import EmailFrom from './components/EmailFrom';
import ConfirmationCodeForm from './components/ConfirmationCodeForm';

import useStoreProfileSettings from "./store/profile-settings-store";

const DetailForm = () => {
    const {
        currentStep,
        stepStatus,
        formData,
        setStepStatus,
        setFormData,
        setCurrentStep,
    } = useStoreProfileSettings();

    useEffect(() => {
        return () => {
            setStepStatus({
                0: {status: "pending"},
                1: {status: "pending"},
                2: {status: "pending"},
            });
            setCurrentStep(0);
            setFormData({});

        };
    }, []);
    const handleNextChange = (values, name) => {
        setFormData({
                formData: {
                    ...formData.formData,
                    [name]: values
                }
            }
        );

        const nextStep = currentStep + 1;
        setStepStatus({
            [currentStep]: {status: 'complete'},
            [nextStep]: {status: 'current'},
        });
        setCurrentStep(nextStep);
    };


    const handleBackChange = () => {
        const previousStep = currentStep - 1;
        setCurrentStep(previousStep);
    };

    const currentStepStatus = useMemo(() => stepStatus[currentStep].status, [
        stepStatus,
        currentStep,
    ]);

    return (
        <Container className="h-full">
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="grid lg:grid-cols-12 gap-4 ">
                    {currentStep !== 3 && (
                        <div className="lg:col-span-12">
                            <FormStep
                                currentStep={currentStep}
                                currentStepStatus={currentStepStatus}
                                stepStatus={stepStatus}
                            />
                        </div>
                    )}
                    <div
                        className={
                            currentStep !== 3 ? 'lg:col-span-12' : 'lg:col-span-5'
                        }
                    >
                        <Suspense fallback={<></>}>
                            {currentStep === 0 && (
                                <EmailFrom
                                    data={formData.formData?.changeEmail}
                                    onNextChange={handleNextChange}
                                    currentStepStatus={currentStepStatus}
                                />
                            )}
                            {currentStep === 1 && (
                                <ConfirmationCodeForm
                                    data={formData.confirmCode}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                    currentStepStatus={currentStepStatus}
                                />
                            )}

                        </Suspense>
                    </div>
                </div>
            </AdaptableCard>
        </Container>
    )
};

export default DetailForm;
