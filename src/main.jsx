import ReactDOM from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react';
import './css/index.css'
import { ChatProvider } from './hooks/useChat'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatProvider>
      <App/>
    </ChatProvider>
  </StrictMode>,
)