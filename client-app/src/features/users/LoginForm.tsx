import React from 'react';
import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { FormikHelpers } from "formik/dist/types";

type SubmitForm = {
  email: string;
  password: string;
  error: null
}
type LoginFormProps = {}
const LoginForm: React.FC<LoginFormProps> = () => {
  const { userStore } = useStore();
  
  const onSubmit = (values: SubmitForm, { setErrors }: FormikHelpers<SubmitForm>) => {
    const data = { email: values.email, password: values.password };
    userStore.login(data).catch(() => {
      setErrors({ error: 'Invalid email or password' });
    });
  };
  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', error: null }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Header as="h2" content="Login to Reactivities" color="teal" textAlign="center"/>
            <MyTextInput placeholder="Email" name="email"/>
            <MyTextInput placeholder="Password" name="password" type="password"/>
            <ErrorMessage
              name="error"
              render={() => (
                <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error}/>
              )}
            />
            <Button loading={isSubmitting} positive content="Login" type="submit" fluid/>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(LoginForm);