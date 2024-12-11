import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StoreContextProvider from './context/StoreContext.jsx'
import AuthContextProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StoreContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StoreContextProvider>
)
