import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { Controller, UseControllerProps } from 'react-hook-form';

export type ControlledTextFieldProps = {
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  textFieldProps: Omit<TextFieldProps, 'onChange'>;
  ctrlProps: UseControllerProps;
};

export function ControlledTextField(props: ControlledTextFieldProps) {
  const { onChange, ctrlProps, textFieldProps } = props;
  return (
    <Controller
      key={ctrlProps.name}
      {...ctrlProps}
      render={({ field, fieldState }) => {
        const validationProps = fieldState.error
          ? { error: true, helperText: fieldState.error.message ?? 'Invalid' }
          : undefined;

        const { onChange: fieldOnChange, ...restFieldProps } = field;

        const handleChange: ChangeEventHandler<
          HTMLTextAreaElement | HTMLInputElement
        > = (e) => {
          if (onChange) {
            onChange(e);
            return;
          }

          const { value } = e.target;
          if (value === '') {
            fieldOnChange(value);
            return;
          }

          // https://github.com/orgs/react-hook-form/discussions/8068
          textFieldProps.type === 'number'
            ? fieldOnChange(+value)
            : fieldOnChange(value);
        };

        return (
          <TextField
            required={!!ctrlProps.rules?.required}
            {...textFieldProps}
            {...validationProps}
            {...restFieldProps}
            onChange={handleChange}
          />
        );
      }}
    />
  );
}
