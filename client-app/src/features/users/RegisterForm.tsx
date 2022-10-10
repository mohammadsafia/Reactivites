import React from 'react';
import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "app/common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { FormikHelpers } from "formik/dist/types";
import * as Yup from 'yup';
import ValidationErrors from "features/errors/ValidationErrors";

type SubmitForm = {
  email: string;
  password: string;
  error: null;
  username: string;
  displayName: string;
}
type RegisterFormProps = {}
const RegisterForm: React.FC<RegisterFormProps> = () => {
  const { userStore } = useStore();
  const initialValues = { username: '', displayName: '', email: '', password: '', error: null };
  
  const onSubmit = (values: SubmitForm, { setErrors, setSubmitting }: FormikHelpers<SubmitForm>) => {
    let data = {
      username: values.username,
      displayName: values.displayName,
      email: values.email,
      password: values.password,
    };
    userStore.register(data).catch((error) => {
      setErrors({ error });
      setSubmitting(false)
    });
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={Yup.object({
          displayName: Yup.string().required(),
          email: Yup.string().required().email(),
          password: Yup.string().required(),
          username: Yup.string().required(),
        })}
      >
        {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
          <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
            <Header as="h2" content="Sign up to Reactivities" color="teal" textAlign="center"/>
            <MyTextInput placeholder="Display Name" name="displayName"/>
            <MyTextInput placeholder="Username" name="username"/>
            <MyTextInput placeholder="Email" name="email"/>
            <MyTextInput placeholder="Password" name="password" type="password"/>
            <ErrorMessage
              name="error"
              render={() => (
                <ValidationErrors errors={errors.error}/>
              )}
            />
            <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content="Register"
                    type="submit" fluid/>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(RegisterForm);