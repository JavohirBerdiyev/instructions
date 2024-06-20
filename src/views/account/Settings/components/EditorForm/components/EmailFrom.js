import React from "react";
import {
    Button,
    FormContainer, FormItem, Input, Notification, toast
} from 'components/ui'
import {Field, Form, Formik} from 'formik'
import * as Yup from 'yup'


import {HiOutlineMail} from "react-icons/hi";

import FormDesription from "../../FormDesription";
import {useTranslation} from "react-i18next";
import ProfileService from "../../../services/profile-settings";
import {t} from "i18next";


const validationSchema = Yup.object().shape({
    email: Yup.string().required(`${t('profile_settings.err_mes.email_val')}`),
})

const EmailFrom = ({data = {email: ''}, onNextChange, currentStepStatus}) => {
    const {t} = useTranslation();
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'changeEmail', setSubmitting)
    }
    const postChangeEmail = async (data) => {
        try {
            const response = await ProfileService.postChangeEmail(data)
            return {response, success: true}
        } catch (error) {
            return {error, success: false};
        }
    }
    const handlerSubmitted = async (values, setSubmitting) => {
        console.log(values)
        try {
            const success = await postChangeEmail({email: values.email });
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
                    {t("profile_settings.alert_mes.email_sent")}
                </Notification>,
                { placement: "top-center" }
            );
            onNext(values);
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
                                title={t("profile_settings.email")}
                            />
                            <FormItem
                                invalid={errors.email && touched.email}
                                errorMessage={t("profile_settings.err_mes.email_val")}
                                name="email"
                                label={t("profile_settings.enter_new_email")}>
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder={t("profile_settings.email")}
                                    component={Input}
                                    prefix={<HiOutlineMail className="text-xl"/>}
                                />
                            </FormItem>

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
    );
}

export default EmailFrom;


