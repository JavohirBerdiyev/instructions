import React from 'react';

import { Menu } from 'components/ui';
import { HiCheckCircle, HiLockClosed } from 'react-icons/hi';
import useThemeClass from 'utils/hooks/useThemeClass';
import useStoreDraftedMessage from "../store/profile-settings-store";
import {useTranslation} from "react-i18next";


const FormStep = () => {
	const { textTheme } = useThemeClass();
	const { t } = useTranslation();
const steps = [
	{ label: `${t("profile_settings.email")}`, value: 0 },
	{ label: `${t("profile_settings.confirmation_code")}`, value: 1 },
];
	const {
		currentStep,
		stepStatus,
		setStepStatus,
		setCurrentStep,
		currentStepStatus,
	} = useStoreDraftedMessage();

	const onStepChange = (step) => {
		const selectedStepStatus = stepStatus[step].status;
		if (selectedStepStatus === 'complete' || selectedStepStatus === 'current') {
			setCurrentStep(step);
			return;
		}
		if (step !== currentStep && step < currentStep) {
			if (currentStepStatus === 'pending') {
				setStepStatus('complete');
			}
			setCurrentStep(step);
		}
	};

	return (
		<Menu variant="transparent" className="px-2 flex">
			{steps.map((step) => (
				<Menu.MenuItem
					key={step.value}
					eventKey={step.value.toString()}
					className={` alfa mb-2 mx-1`}
					onClick={() => onStepChange(step.value)}
					isActive={currentStep === step.value}
				>
          <span className='text-2xl ltr:mr-2 rtl:ml-2 '>
            {stepStatus[step.value].status === 'complete' && <HiCheckCircle className={textTheme} />}
			  {stepStatus[step.value].status === 'current' && <HiCheckCircle className="text-gray-400" />}
			  {(stepStatus[step.value].status === 'pending' && currentStep === step.value) && (
				  <HiCheckCircle className="text-gray-400" />
			  )}
			  {(stepStatus[step.value].status === 'pending' && currentStep !== step.value) && (
				  <HiLockClosed className="text-gray-400" />
			  )}
			  {stepStatus[step.value].status === 'invalid' && <HiCheckCircle className="text-gray-400" />}
          </span>
					<span>{step.label}</span>
				</Menu.MenuItem>
			))}
		</Menu>
	);
};

export default FormStep;
