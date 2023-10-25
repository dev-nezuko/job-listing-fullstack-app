import { AppBar, Container, Link, Toolbar, Typography } from '@mui/material';

import { routes } from 'constants/routes';

export const Header = (): JSX.Element => (
  <AppBar position="static" elevation={0} sx={{ background: '#162c35' }}>
    <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Typography
          component="a"
          href={routes.jobs}
          variant="h6"
          sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}
        >
          Open roles
        </Typography>
        <Link href={routes.jobs} color="inherit">
          Browse jobs
        </Link>
      </Toolbar>
    </Container>
  </AppBar>
);
