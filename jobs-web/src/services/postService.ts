import { AxiosResponse } from 'axios';
import { JobType } from 'types/job';

import { baseService } from './baseService';

export const jobApi = {
  jobs: '/jobs',
  applyToJob: '/jobs/apply',
};

export function getJobs(authtoken: string): Promise<AxiosResponse<{ payload: JobType[] }>> {
  return baseService.get(jobApi.jobs, { headers: { authtoken } });
}

export function applyToJob(jobId: number): Promise<AxiosResponse<void>> {
  return baseService.post(jobApi.applyToJob, { jobId });
}
