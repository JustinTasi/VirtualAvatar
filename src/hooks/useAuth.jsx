import { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const value = ''

  useEffect(() => {
    if (location !='/receiveToken' || location !='/accessDeny') {
      const userName = localStorage.getItem('userName');
      if(userName) {
        return;
      } else {
        navigate("/receiveToken")
      }
    }
    }, [location]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useNavBar must be used within NavBarProvider');
  }
  return context;
}