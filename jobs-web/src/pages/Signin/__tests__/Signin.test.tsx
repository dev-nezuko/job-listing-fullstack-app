import { Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { AuthProvider } from 'contexts/AuthContext';
import { createMemoryHistory } from 'history';

import { routes } from 'constants/routes';

import { Signin } from '../Signin';

const history = createMemoryHistory();
const renderComponent = (): void => {
  (axios.post as jest.Mock).mockImplementation((requestUrl) => {
    if (requestUrl.includes('/login')) {
      return Promise.resolve({ data: { payload: { authtoke: 'authtoken' } } });
    }

    return Promise.reject();
  });

  render(
    <Router location={routes.signin} navigator={history}>
      <AuthProvider>
        <Signin />
      </AuthProvider>
    </Router>
  );
};

describe('<Signin />', () => {
  it('renders signin form', () => {
    renderComponent();

    expect(screen.getByRole('heading', { level: 1, name: 'Sign in' })).toBeInTheDocument();

    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: "Don't have an account? Sign Up" })).toHaveAttribute('href', routes.signup);
  });

  it('renders error if values are missing or invalid', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    userEvent.click(submitButton);

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();

    const emailField = screen.getByLabelText('Email Address');

    userEvent.type(emailField, 'email');

    expect(await screen.findByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('allows submitting form once required fields are filled', async () => {
    renderComponent();

    const emailField = screen.getByLabelText('Email Address');
    const passwordField = screen.getByLabelText('Password');

    userEvent.type(emailField, 'email@email.com');
    userEvent.type(passwordField, 'password');

    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    userEvent.click(submitButton);

    await waitFor(() => expect(history.location.pathname).toBe(routes.jobs));
  });
});
