import { createContext, useContext, useState } from 'react';
import MessageModal from '../popup/MessageModalPopup';

const MessageModalContext = createContext(null);

export const MessageModalProvider = ({ children }) => {
  const [isShow, setIsShow] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const value = {
    setIsShow,
    setModalProps
  };

  return (
    <MessageModalContext.Provider value={value}>
      <MessageModal modal={modalProps} isShow={isShow}/>
      {children}
    </MessageModalContext.Provider>
  );
};

export function useMessageModal() {
  const context = useContext(MessageModalContext);

  if (!context) {
    throw new Error('useLoading must be used within MessageModalProvider');
  }
  return context;
}