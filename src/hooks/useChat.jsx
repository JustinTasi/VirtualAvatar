import { createContext, useContext, useEffect, useState } from "react";
import openAIAPI from '../../services/BackEndAPI'
import { useAuth } from "./useAuth";
import { useLocation } from "react-router-dom";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [isUserClick, setIsUserClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const { userName } = useAuth();
  const location = useLocation().pathname;

  const chat = async (message) => {
    setLoading(true);
    try {
      const response = await openAIAPI.chatWithOpenAi({
        'userName':userName,
        'charactor':location,
        'transcript': message,
      })
      console.log(message);
      setMessages(() => [response]);
      setLoading(false);
    } catch (e) {
      console.error(e.message)
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchHelloInfo = async () => {
      setLoading(true);
      try {
        const response = await openAIAPI.getHelloUserInfo({'userName': userName, 'charactor': location})
        
        setMessage(response);
      } catch (e) {
        console.error(e.message)
      }
      setLoading(false);
    }
    if (isUserClick) {
      fetchHelloInfo();
    }
  },[isUserClick, location])

  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);


  return (
    <ChatContext.Provider
      value={{
        isUserClick,
        setIsUserClick,
        setMessage,
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};