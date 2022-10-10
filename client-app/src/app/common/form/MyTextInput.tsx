import React from 'react';
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

type MyTextInputProps = {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
}
const MyTextInput: React.FC<MyTextInputProps> = (props) => {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} type="text" {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">{meta.error}</Label>
      ) : null}
    </Form.Field>
  );
};

export default MyTextInput;