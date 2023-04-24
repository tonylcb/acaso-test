import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/global.scss'
import { UserProvider } from "./contexts/UserContext"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <UserProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UserProvider>
)
