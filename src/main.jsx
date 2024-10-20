import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react';
import './css/index.css'
import { ChatProvider } from './hooks/useChat'
import { AuthProvider } from './hooks/useAuth'
import { MessageModalProvider } from './hooks/useMessageModal'
import { BrowserRouter } from 'react-router-dom';



ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MessageModalProvider>
        <AuthProvider>
          <ChatProvider>
            <App/>
          </ChatProvider>
        </AuthProvider>
      </MessageModalProvider>
    </BrowserRouter>
  </StrictMode>
)