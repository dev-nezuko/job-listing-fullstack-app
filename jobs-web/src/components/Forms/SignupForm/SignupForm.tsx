import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Link } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { signupSchema } from 'schemas/signupSchema';
import { SignupPayload } from 'types/signupPayload';

import { TextInput } from 'components/TextInput/TextInput';
import { routes } from 'constants/routes';
import { signup } from 'services/authService';

export const SignupForm = (): JSX.Element => {
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (values: SignupPayload, { setFieldError }: FormikHelpers<SignupPayload>) => {
      signup(values)
        .then(() => {
          navigate(routes.signin);
        })
        .catch((error) => {
          setFieldError('password', error.response.data.message);
        });
    },
    [navigate]
  );

  return (
    <>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={signupSchema}
      >
        {() => (
          <Form>
            <TextInput fullWidth name="name" label="Full Name" autoComplete="user-name" />
            <TextInput fullWidth name="email" label="Email Address" type="email" autoComplete="email" />
            <TextInput fullWidth name="password" label="Password" type="password" autoComplete="current-password" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      <Link href={routes.signin} variant="body2" underline="hover">
        Already have an account? Sign In
      </Link>
    </>
  );
};
