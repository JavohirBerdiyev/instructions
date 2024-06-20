import React, {useState} from 'react'
import { 
	Input,
	Button,
	Notification, 
	toast,
	FormContainer 
} from 'components/ui'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'


import * as Yup from 'yup'
import sha1 from "crypto-js/sha1";
import ProfileService from "../services/profile-settings";
import {useTranslation} from "react-i18next";
import useAuth from "../../../../utils/hooks/useAuth";
import {HiOutlineEye, HiOutlineEyeOff} from "react-icons/hi";
import {t} from "i18next";


const validationSchema = Yup.object().shape({
	password: Yup.string().required(`${t('profile_settings.err_mes.pass_val')}`),
	newPassword: Yup.string().required(`${t('profile_settings.err_mes.new_pass_val')}`).min(5, `${t('profile_settings.err_mes.too_short')}`).matches(/^[A-Za-z0-9_-]*$/, `${t('profile_settings.err_mes.pass_symbol_val')}`),
	confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], `${t('profile_settings.err_mes.confirm_pass')}`)
})

const Password = () => {
	const { t } = useTranslation();
	const [pwInputType, setPwInputType] = useState('password')
	const [newPassType, setNewPassType] = useState('password')
	const [confirmPassType, setConfirmPassType] = useState('password')

	const { signOut } = useAuth()

	const logOut = () => {

		signOut();
	}
	const postPassword = async (data) => {
		try {
			const response = await ProfileService.postPassword(data)
			return {response, success: true}
		}catch (error) {
			return {error, success: false};
		}
	}
	const onFormSubmit = async (values, setSubmitting) => {
		const hashedPassword = sha1(values.password).toString(); // Хэширование текущего пароля
		const hashedNewPassword = sha1(values.newPassword).toString(); // Хэширование нового пароля

		const success = await postPassword({
			currentPassword: hashedPassword,
			newPassword: hashedNewPassword

		});
		handSuccess(success);

		setSubmitting(false);
	};
	function handSuccess(success) {
		if (!success.success) {
			toast.push(
				<Notification
					title={`${t('notification.error')}: ${success.error.response.data.message}`}
					type="danger"
					duration={3500}
				>
				</Notification>,
				{
					placement: "top-center",
				},
			);
		} else {
			toast.push(
				<Notification
					title={t('notification.successfully')}
					type="success"
					duration={2500}
				>
					{t("profile_settings.alert_mes.password_changed")}

				</Notification>,
				{
					placement: "top-center",
				},
				logOut()
			);
		}
	}

	const onPasswordVisibleClick = (fieldName) => {
		switch (fieldName) {
			case 'password':
				setPwInputType(pwInputType === 'password' ? 'text' : 'password');
				break;
			case 'newPassword':
				setNewPassType(newPassType === 'password' ? 'text' : 'password');
				break;
			case 'confirmNewPassword':
				setConfirmPassType(confirmPassType === 'password' ? 'text' : 'password');
				break;
			default:
				break;
		}
	};

	const passwordVisible = (fieldName) => (
		<span
			className="cursor-pointer"
			onClick={() => onPasswordVisibleClick(fieldName)}
		>
        {fieldName === 'password' && pwInputType === 'password' ? (
			<HiOutlineEyeOff />
		) : (
			fieldName === 'newPassword' && newPassType === 'password' ? (
				<HiOutlineEyeOff />
			) : (
				fieldName === 'confirmNewPassword' && confirmPassType === 'password' ? (
					<HiOutlineEyeOff />
				) : (
					<HiOutlineEye />
				)
			)
		)}
    </span>
	);


	return (
		<>
			<Formik
				initialValues={{ 
					password: '', 
					newPassword: '',
					confirmNewPassword: ''
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true)
					setTimeout(() => {
						onFormSubmit(values, setSubmitting)
					}, 1000)
				}}
			>
				{({values, touched, errors, isSubmitting, resetForm}) => {
					const validatorProps = {touched, errors}
					return (
						<Form>
							<FormContainer>
								<FormDesription 
									title={t('profile_settings.password')}
									desc={t('profile_settings.pass_desc')}
								/>
								<FormRow name="password" label={t('profile_settings.current_password')} {...validatorProps} >
									<Field
										type={pwInputType}
										suffix={passwordVisible('password')}
										autoComplete="off" 
										name="password" 
										placeholder={t('profile_settings.current_password')}
										component={Input}
									/>
								</FormRow>
								<FormRow name="newPassword" label={t('profile_settings.new_password')} {...validatorProps} >
									<Field
										type={newPassType}
										suffix={passwordVisible('newPassword')}
										autoComplete="off"
										name="newPassword"
										placeholder={t('profile_settings.new_password')}
										component={Input}
									/>
								</FormRow>
								<FormRow name="confirmNewPassword" label={t('profile_settings.confirm_password')} {...validatorProps} >
									<Field
										type={confirmPassType}
										suffix={passwordVisible('confirmNewPassword')}
										autoComplete="off"
										name="confirmNewPassword"
										placeholder={t('profile_settings.confirm_password')}
										component={Input}
									/>
								</FormRow>							
								<div className="mt-4 ltr:text-right">
									<Button className="ltr:mr-2 rtl:ml-2" type="button" onClick={resetForm}>{t('profile_settings.reset')}</Button>
									<Button variant="solid" loading={isSubmitting} type="submit">
										{isSubmitting ? `${t('profile_settings.reset')}` : `${t('profile_settings.update_password')}`}
									</Button>
								</div>
							</FormContainer>
						</Form>
					)
				}}
			</Formik>

		</>
	)
}

export default Password