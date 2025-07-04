import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import {BrowserRouter} from "react-router-dom"
import { ChatProvider } from '../context/chatContext.jsx'
createRoot(document.getElementById('root')).render(
    
    <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
    <App />
    </ChatProvider>
    </AuthProvider>
    </BrowserRouter>
  )
