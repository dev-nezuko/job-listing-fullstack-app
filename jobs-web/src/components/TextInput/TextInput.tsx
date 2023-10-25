import { TextField, TextFieldProps } from '@mui/material';
import { ErrorMessage, useField, useFormikContext } from 'formik';

type TextInputProps = TextFieldProps & {
  name: string;
};
export const TextInput = ({ name, ...props }: TextInputProps): JSX.Element => {
  const [, meta] = useField(name);
  const { handleChange } = useFormikContext();

  return (
    <>
      <TextField
        margin="normal"
        fullWidth
        id={name}
        name={name}
        {...{ ...meta, error: !!meta.error }}
        {...props}
        onChange={handleChange}
      />
      <ErrorMessage className="error-message" component="span" name={name} />
    </>
  );
};
