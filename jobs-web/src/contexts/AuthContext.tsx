import { createContext, PropsWithChildren, useState } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(Cookies.get('authtoken')));

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
