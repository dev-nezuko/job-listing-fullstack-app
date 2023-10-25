import { PropsWithChildren } from 'react';
import MuiContainer from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const FormContainer = ({ children }: PropsWithChildren): JSX.Element => {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <MuiContainer component="main" maxWidth="xs">
        <CssBaseline />
        {children}
      </MuiContainer>
    </ThemeProvider>
  );
};
