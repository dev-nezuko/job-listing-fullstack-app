import { createContext, PropsWithChildren, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(window.localStorage.getItem('isAuthenticated') || 'false')
  );

  useEffect(() => {
    window.localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
