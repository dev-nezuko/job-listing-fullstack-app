import { useRef, useState } from 'react';
import { Alert, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { JobType } from 'types/job';

import { applyToJob } from 'services/postService';

interface Props {
  job: JobType;
  updateJob: (id: string) => void;
}
export const Job = ({ job, updateJob }: Props): JSX.Element => {
  const userId = Cookies.get('userId');
  const applied = job.applications.includes(userId || '');
  const [isPending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const inFlight = useRef(false);
  const apply = async (): Promise<void> => {
    if (inFlight.current || applied) {
      return;
    }

    inFlight.current = true;
    setPending(true);
    setFailed(false);

    try {
      await applyToJob(job.id);
      updateJob(job.id);
    } catch {
      setFailed(true);
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <Card variant="outlined" sx={{ height: '100%', borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography component="h2" variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            {job.title}
          </Typography>
          <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1} sx={{ mb: 2 }}>
            <Chip size="small" label={job.experienceLevel} />
            <Chip size="small" variant="outlined" label={job.employmentType} />
          </Stack>
          <Typography sx={{ mb: 2, whiteSpace: 'pre-line' }}>{job.description}</Typography>
          <Typography variant="body2" color="text.secondary">
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </Typography>
          {failed && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Application was not saved. Please try again.
            </Alert>
          )}
          <Button disabled={applied || isPending} onClick={apply} variant="contained" sx={{ mt: 3 }}>
            {applied ? 'Applied' : isPending ? 'Applying…' : 'Apply to job'}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};
