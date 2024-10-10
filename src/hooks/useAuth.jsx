import { createContext, useContext, useEffect, useState } from 'react';
import { useMessageModal } from './useMessageModal';
import openAIAPI from '../../services/OpenAIAPI';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { setIsShow, setModalProps } = useMessageModal();
  const [authority, setAuthority] = useState({
    'userName': '菜歐歐'
  });
  const value = { authority };
  const navigate = useNavigate();

  useEffect(() => {
    // const fetchLoginUser = async () => {
    //   const lineId = localStorage.getItem('lineId')
    //   const token = localStorage.getItem('token')
      
    //   let response;
      
    //   if(authority == {}) {
    //     return;
    //   }

    //   if(!lineId) {
    //     response = await openAIAPI.getLineId();

    //     localStorage.setItem('lineId', response.lineId);
    //   } else if (!token){
    //     response = await openAIAPI.changeBackEndToken(lineId)

    //     localStorage.setItem('lineId', response.lineId);
    //     setAuthority(response.userId)
    //   } else {
    //     navigate("/");
    //   }
    // };

    // fetchLoginUser();
    
    navigate("/accessDeny");
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