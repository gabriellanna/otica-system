import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { AuthService } from '../services/api/auth/AuthService';



interface IAuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>
}

const AuthContext = createContext({} as IAuthContextData);


const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';
interface IAuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  
  const [accessToken, setAccessToken ] = useState<string>();


  useEffect(() => {
    const accessTokenJSON = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (accessTokenJSON) {
      setAccessToken(JSON.parse(accessTokenJSON))
    } else {
      setAccessToken(undefined);
    }
  }, [])



  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.accessToken));
      setAccessToken(result.accessToken);
    }
  }, []);
  
  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);
  //     { !!accessToken } é a mesma coisa que:  { accessToken !== undefined }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
};

// Futuramente utilizar Cookies para trabalhar com autenticação JWT !!!


export const useAuthContext = () => useContext(AuthContext);