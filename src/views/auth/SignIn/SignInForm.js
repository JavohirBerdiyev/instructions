// SignInForm.js
import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Checkbox,
  FormItem,
  FormContainer,
  Alert,
} from "components/ui";
import { PasswordInput, ActionLink } from "components/shared";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useAuth from "utils/hooks/useAuth";
import useAuthStore from "services/authStore";
import LoginService from "services/auth-service";
import sha1 from "crypto-js/sha1";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your user email"),
  password: Yup.string().required("Please enter your password"),
  rememberMe: Yup.bool(),
});

const SignInForm = (props) => {
  const {
    disableSubmit = false,
    className,
    forgotPasswordUrl = "/forgot-password",
    signUpUrl = "/sign-up",
  } = props;

  const { signIn } = useAuth();
  const { email, password, setCredentials } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState({});

  const loginPost = async (data, setSubmitting) => {
    try {
      setSubmitting(true);
      // const response = await LoginService.loginPost({
      //   ...data,
      //   password: password,
      // });

      // if (response.data.accessToken) {
      //   const permissionsObject = response.data.permissions;
      //   sessionStorage.setItem(
      //     "permissions",
      //     JSON.stringify(permissionsObject)
      //   );
      //   setTimeout(() => {
      //     setSubmitting(false);
      //   }, 1000);

        const result = signIn({ email, password });
      //   sessionStorage.setItem("client-token", response.data.accessToken);
      // }
      return { success: true }; // Return the response from removeAgreement
    } catch (error) {
      setErrorMessage(error);
      console.log(error);
      return { error, success: false }; // Return error response
    } finally {
      setTimeout(() => {
        setSubmitting(true);
      }, 500);
    }
  };

  return (
    <div className={className}>
      {errorMessage?.message && (
        <Alert className="mb-4 right-0" type="danger" showIcon>
          Parol yoki login xato
        </Alert>
      )}

      {errorMessage?.message && (
        <Alert
          className="mb-4 absolute right-0"
          style={{ position: "absolute", top: "30px", right: "10px", backgroundColor: "#f0444454" }}
          type="danger"
          showIcon
        >
        {`${errorMessage?.message} (${errorMessage?.code})`}
        </Alert>
      )}
      <Formik
        initialValues={{
          email: email,
          password: password,
          rememberMe: true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            // Store the entered email and password in Zustand store
            setCredentials(values.email, values.password);
            loginPost(
              { email: values.email, password: values.password },
              setSubmitting
            );
          } else {
            setSubmitting(true);
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="User Email"
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="email"
                  placeholder="User Email"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Password"
                invalid={errors.password && touched.password}
                errorMessage={errors.password}
              >
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Password"
                  component={PasswordInput}
                />
              </FormItem>
              <div className="flex justify-between mb-6">
                <Field
                  className="mb-0"
                  name="rememberMe"
                  component={Checkbox}
                  children="Remember Me"
                />
              </div>
              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
