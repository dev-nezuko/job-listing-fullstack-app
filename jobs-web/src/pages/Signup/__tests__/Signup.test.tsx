import { Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { AuthProvider } from 'contexts/AuthContext';
import { createMemoryHistory } from 'history';

import { routes } from 'constants/routes';

import { Signup } from '../Signup';

const history = createMemoryHistory();
const renderComponent = (): void => {
  (axios.post as jest.Mock).mockImplementation((requestUrl) => {
    if (requestUrl.includes('/signup')) {
      return Promise.resolve({ data: {} });
    }

    return Promise.reject();
  });

  render(
    <Router location={routes.signup} navigator={history}>
      <AuthProvider>
        <Signup />
      </AuthProvider>
    </Router>
  );
};

describe('<Signup />', () => {
  it('renders signup form', () => {
    renderComponent();

    expect(screen.getByRole('heading', { level: 1, name: 'Sign up' })).toBeInTheDocument();

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Already have an account? Sign In' })).toHaveAttribute(
      'href',
      routes.signin
    );
  });

  it('renders error if values are missing or invalid', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    userEvent.click(submitButton);

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();

    const emailField = screen.getByLabelText('Email Address');

    userEvent.type(emailField, 'email');

    expect(await screen.findByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('allows submitting form once required fields are filled', async () => {
    renderComponent();

    const nameField = screen.getByLabelText('Full Name');
    const emailField = screen.getByLabelText('Email Address');
    const passwordField = screen.getByLabelText('Password');

    userEvent.type(nameField, 'name');
    userEvent.type(emailField, 'email@email.com');
    userEvent.type(passwordField, 'password');

    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    userEvent.click(submitButton);

    await waitFor(() => expect(history.location.pathname).toBe(routes.signin));
  });
});
