import { createContext, useContext, useEffect, useState } from 'react';
import { useMessageModal } from './useMessageModal';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { setIsShow, setModalProps } = useMessageModal();
  const [authority, setAuthority] = useState('');
  const value = { authority };

  useEffect(() => {
    const fetchLoginUser = async () => {
      set
      return;
    };

    fetchLoginUser();
  }, []);

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