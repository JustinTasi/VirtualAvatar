import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMessageModal } from './MessageModalContext';
import { ModalTypes } from '@/enumrate/ModalTypes';

interface AuthContextInterface {
  authority: string;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setIsShow, setModalProps } = useMessageModal();
  const router = useRouter();
  const pathname = router.pathname;
  const [authority, setAuthority] = useState<string>('');
  const value = '123';

  // useEffect(() => {
  //   const fetchLoginUser = async () => {
  //     const response = await accountAPI.getUserInfo();

  //     setAuthority(response.data!.authority);
  //   };

  //   if (!localStorage.getItem('token') && pathname != '/login' && pathname != '/signup/consent' && pathname != '/signup/create') {
  //     setModalProps({ 'type': ModalTypes.ERROR, 'message': '您尚未登入或登入逾時，請您重新登入' });
  //     setIsShow(true);
  //     router.push('/login');
  //   } else if (!localStorage.getItem('token') || pathname != '/login'){
  //     fetchLoginUser();
  //   }
  // }, [pathname, router, setIsShow, setModalProps]);

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