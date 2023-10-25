import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Link } from '@mui/material';
import { AuthContext } from 'contexts/AuthContext';
import { Form, Formik, FormikHelpers } from 'formik';
import Cookies from 'js-cookie';
import { signinSchema } from 'schemas/signinSchema';
import { SigninPayload } from 'types/signin';

import { TextInput } from 'components/TextInput/TextInput';
import { routes } from 'constants/routes';
import { login } from 'services/authService';

export const SigninForm = (): JSX.Element => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (values: SigninPayload, { setFieldError }: FormikHelpers<SigninPayload>) => {
      await login(values)
        .then(({ data }) => {
          const { authtoken, userId } = data.payload;

          Cookies.set('authtoken', authtoken, {
            expires: 1 / 24,
            sameSite: 'strict',
            secure: window.location.protocol === 'https:',
          });
          Cookies.set('userId', userId, {
            expires: 1 / 24,
            sameSite: 'strict',
            secure: window.location.protocol === 'https:',
          });
          setIsAuthenticated(true);
          navigate(routes.jobs);
        })
        .catch(() => {
          setFieldError('password', 'Sign-in failed. Check your details and try again.');
        });
    },
    [navigate, setIsAuthenticated]
  );

  return (
    <>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit} validationSchema={signinSchema}>
        {() => (
          <Form>
            <TextInput fullWidth name="email" label="Email Address" type="email" autoComplete="email" />
            <TextInput fullWidth name="password" label="Password" type="password" autoComplete="current-password" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
      <Link href={routes.signup} variant="body2" underline="hover">
        Don't have an account? Sign Up
      </Link>
    </>
  );
};
