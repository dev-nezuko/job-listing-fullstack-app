import { useCallback } from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import { JobType } from 'types/job';

import { applyToJob } from 'services/postService';

interface Props {
  job: JobType;
  updateJob: (id: number) => void;
}

export const Job = ({ job, updateJob }: Props): JSX.Element => {
  console.log('🚀 ~ file: Job.tsx:18 ~ Job ~ job:', job);
  const userId = Cookies.get('userId');
  const isAlreadyApplied = job.applications.includes(userId as string);
  const handleSubmit = useCallback(
    async (jobId: number) => {
      applyToJob(jobId).then(() => {
        updateJob(job.id);
      });
    },
    [job.id, updateJob]
  );

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              Title: {job.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Experience Level: {job.experienceLevel}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Employment type: {job.employmentType}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Job Description: {job.description}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Creation Date: {new Date(job.createdAt).toLocaleString()}
            </Typography>

            <Button
              disabled={isAlreadyApplied}
              onClick={() => handleSubmit(job.id)}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isAlreadyApplied ? 'Already Applied' : 'Apply'}
            </Button>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};
