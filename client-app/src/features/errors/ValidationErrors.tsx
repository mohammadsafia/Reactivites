import React from 'react';
import { Message } from 'semantic-ui-react';

interface ValidationErrorsProps {
  errors: string[] | null;
}

export default function ValidationErrors({ errors }: ValidationErrorsProps) {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors?.map((err, i: number) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}