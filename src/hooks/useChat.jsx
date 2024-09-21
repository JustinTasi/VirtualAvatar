import { createContext, useContext, useEffect, useState } from "react";
import openAIAPI from '../../services/OpenAIAPI'

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  const chat = async (message) => {
    setLoading(true);
    // @TODO 把註解弄回來
    // const data = await openAIAPI.sendMessageToOpenAi(message);
    // const resp = (await data.json()).response;
    const data = {
      "response": "嗨，你好！有什麼可以幫助你的嗎？",
      "role": "assistant"
    }
    const resp = data.response;
    setMessages((messages) => [...messages, ...resp]);
    setLoading(false);
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