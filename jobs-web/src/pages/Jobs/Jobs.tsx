import { useEffect, useState } from 'react';
import { Alert, Box, Container, Grid, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { JobType } from 'types/job';

import { Header } from 'components/Header/Header';
import { Job } from 'components/Job/Job';
import { getJobs } from 'services/postService';

export const Jobs = (): JSX.Element => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const updateJob = (id: string): void => {
    const userId = Cookies.get('userId');

    if (!userId) {
      return;
    }

    setJobs((previous) =>
      previous.map((job) =>
        job.id === id ? { ...job, applications: Array.from(new Set([...job.applications, userId])) } : job
      )
    );
  };

  useEffect(() => {
    let isActive = true;

    getJobs(Cookies.get('authtoken') || '')
      .then((response) => {
        if (isActive) {
          setJobs(response.data.payload);
        }
      })
      .catch(() => {
        if (isActive) {
          setFailed(true);
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg" component="main" sx={{ py: { xs: 4, md: 7 } }}>
        <Typography variant="overline" color="text.secondary">
          The job board
        </Typography>
        <Typography component="h1" variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          Find your next role
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Browse the details, then register your interest with one application.
        </Typography>
        {isLoading && <Box role="status">Loading opportunities…</Box>}
        {failed && <Alert severity="error">Jobs could not be loaded. Refresh to try again.</Alert>}
        {!isLoading && !failed && jobs.length === 0 && <Alert severity="info">No open roles are listed yet.</Alert>}
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Job key={job.id} job={job} updateJob={updateJob} />
          ))}
        </Grid>
      </Container>
    </>
  );
};
