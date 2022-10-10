import React from 'react';
import { useField } from "formik";
import { DropdownItemProps, Form, Label, Select } from "semantic-ui-react";

type MySelectInputProps = {
  placeholder: string;
  name: string;
  label?: string;
  options: DropdownItemProps[];
}
const MySelectInput: React.FC<MySelectInputProps> = (props) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      ></Select>
      {meta.touched && meta.error ? (
        <Label basic color="red">{meta.error}</Label>
      ) : null}
    </Form.Field>
  );
};

export default MySelectInput;