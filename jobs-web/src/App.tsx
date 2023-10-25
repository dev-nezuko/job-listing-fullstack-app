import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';

import { AppRouter } from 'components/AppRoutes/AppRouter';

const App = (): JSX.Element => (
  <BrowserRouter>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
