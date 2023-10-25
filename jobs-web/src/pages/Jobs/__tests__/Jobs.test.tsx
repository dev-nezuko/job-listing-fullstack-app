import { Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { AuthProvider } from 'contexts/AuthContext';
import { createMemoryHistory } from 'history';

import { routes } from 'constants/routes';
import { mockedPosts } from 'fixtures/posts';

import { Jobs } from '../Jobs';

const history = createMemoryHistory();
const renderComponent = (): void => {
  (axios.get as jest.Mock).mockImplementation((requestUrl) => {
    if (requestUrl.includes('/jobs')) {
      return Promise.resolve({ data: { payload: mockedPosts } });
    }

    return Promise.reject();
  });

  render(
    <Router location={routes.signin} navigator={history}>
      <AuthProvider>
        <Jobs />
      </AuthProvider>
    </Router>
  );
};

describe('<Jobs />', () => {
  it('renders jobs page', async () => {
    renderComponent();

    expect(screen.getByRole('button', { name: 'Create New Job' })).toBeInTheDocument();

    expect(await screen.findByText(mockedPosts[0].title)).toBeInTheDocument();

    mockedPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.content)).toBeInTheDocument();
      expect(screen.getByText(new Date(post.createdAt).toLocaleString())).toBeInTheDocument();
    });
  });

  it('redirects to create post page when clicked on create new post button', async () => {
    renderComponent();

    userEvent.click(screen.getByRole('button', { name: 'Create New Job' }));

    await waitFor(() => expect(history.location.pathname).toBe(routes.newPost));
  });
});
