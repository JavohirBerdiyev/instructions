import React from "react";
import {
    Button,
    FormContainer, FormItem, Input, Notification, toast
} from 'components/ui'
import {Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import FormDesription from "../../FormDesription";
import {useTranslation} from "react-i18next";
import ProfileService from "../../../services/profile-settings";
import {t} from "i18next";
import useAuth from "../../../../../../utils/hooks/useAuth";


const validationSchema = Yup.object().shape({
    confirmationCode: Yup.number().required(`${t('profile_settings.err_mes.confirm_code_val')}`),
})

const ConfirmationCodeForm = ({data = {confirmationCode: ''}, onNextChange, onBackChange}) => {
    const { t } = useTranslation();

    const { signOut } = useAuth()

    const logOut = () => {
        console.log('log out')
        // signOut();
    }
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'confirmCode', setSubmitting)
    }
    const postVerificationCode = async (data) => {
        try {
            const response = await ProfileService.postVerificationCode(data)
            return {response, success: true}
        } catch (error) {
            return {error, success: false};
        }
    }
    const handlerSubmitted = async (values, setSubmitting) => {
        try {
            const success = await postVerificationCode({ values });
            handSuccess(success, values, setSubmitting);
        } catch (error) {
            console.error('Error:', error);
            toast.push(
                <Notification
                    title={`${t('notification.error')}: ${error.message}`}
                    type="danger"
                    duration={3500}
                >
                </Notification>,
                { placement: "top-center" }
            );
            setSubmitting(false);
        }
    };

    function handSuccess(success, values, setSubmitting) {
        console.log(success.error.response);
        if (success.success) {
            toast.push(
                <Notification
                    title={t('notification.successfully')}
                    type="success"
                    duration={2500}
                >
                    {t("profile_settings.alert_mes.email_changed")}
                </Notification>,
                { placement: "top-center" }
            );
            onNext(values);
            logOut(  )
        } else {
            toast.push(
                <Notification
                    title={`${t('notification.error')}: ${success.error.response.data.message}`}
                    type="danger"
                    duration={3500}
                >
                </Notification>,
                { placement: "top-center" }
            );
        }
        setSubmitting(false);
    }
    const onBack = () => {
        onBackChange?.();
    };
    return (
        <Formik
            initialValues={data}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => {
                handlerSubmitted(values, setSubmitting);
            }}
        >
            {({values, touched, errors, isSubmitting, resetForm}) => {

                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                title={t('profile_settings.confirmation_code')}
                            />
                            <FormItem
                                invalid={errors.confirmationCode && touched.confirmationCode}
                                errorMessage={t("profile_settings.err_mes.confirm_code_val")}
                                name="confirmationCode"
                               >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="confirmationCode"
                                    placeholder={t('profile_settings.confirmation_code')}
                                    component={Input}
                                />
                            </FormItem>

                            <div className="mt-4 ltr:text-right">
                                <Button type="button" onClick={onBack}>
                                    {t('button.back')}
                                </Button>
                                <Button variant="solid" loading={isSubmitting} type="submit">
                                    {isSubmitting ? `${t('profile_settings.reset')}` : `${t('profile_settings.update_password')}`}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    );
}

export default ConfirmationCodeForm;


