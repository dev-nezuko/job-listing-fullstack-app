import { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import Cookies from 'js-cookie';
import { JobType } from 'types/job';

import { Header } from 'components/Header/Header';
import { Job } from 'components/Job/Job';
import { getJobs } from 'services/postService';

export const Jobs = (): JSX.Element => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const updateJob = (id: number): void => {
    const userId = Cookies.get('userId');
    const updatedArray = [...jobs].map((job) =>
      job.id === id ? { ...job, applications: [...job.applications, userId as string] } : job
    );

    setJobs(updatedArray);
  };

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        const response = await getJobs(Cookies.get('authtoken') as string);

        setJobs(response.data.payload);
      } catch (error) {
        throw new Error('Cannot get jobs');
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={4} sx={{ mt: 3 }}>
            {jobs.map((job) => (
              <Job key={job.id} job={job} updateJob={updateJob} />
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
