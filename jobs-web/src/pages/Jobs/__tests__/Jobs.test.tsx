import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cookies from 'js-cookie';

import { applyToJob, getJobs } from 'services/postService';

import { Jobs } from '../Jobs';
jest.mock('services/postService', () => ({ getJobs: jest.fn(), applyToJob: jest.fn() }));
jest.mock('components/Header/Header', () => ({ Header: () => <header>Jobs</header> }));
const mockedGet = getJobs as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  Cookies.set('userId', 'demo-user');
});
it('shows an explicit empty state', async () => {
  mockedGet.mockResolvedValue({ data: { payload: [] } });
  render(<Jobs />);
  expect(await screen.findByText('No open roles are listed yet.')).toBeInTheDocument();
});
it('handles load failure without throwing from an effect', async () => {
  mockedGet.mockRejectedValue(new Error('offline'));
  render(<Jobs />);
  expect(await screen.findByRole('alert')).toHaveTextContent('Jobs could not be loaded');
});
it('retains a retry after failure and disables a pending application', async () => {
  const mockedApply = applyToJob as jest.Mock;

  mockedGet.mockResolvedValue({
    data: {
      payload: [
        {
          id: 'role-1',
          title: 'Platform engineer',
          description: 'Synthetic role',
          experienceLevel: 'Mid-level',
          employmentType: 'Full time',
          createdAt: '2023-10-24T12:00:00Z',
          applications: [],
        },
      ],
    },
  });
  let reject: (error: Error) => void = () => undefined;

  mockedApply.mockImplementationOnce(
    () =>
      new Promise((_resolve, rejectPromise) => {
        reject = rejectPromise;
      })
  );
  render(<Jobs />);
  await userEvent.click(await screen.findByRole('button', { name: 'Apply to job' }));
  expect(screen.getByRole('button', { name: 'Applying…' })).toBeDisabled();
  reject(new Error('offline'));
  expect(await screen.findByRole('alert')).toHaveTextContent('Application was not saved');
  mockedApply.mockResolvedValueOnce({});
  await userEvent.click(screen.getByRole('button', { name: 'Apply to job' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Applied' })).toBeDisabled());
  expect(applyToJob).toHaveBeenCalledTimes(2);
});
