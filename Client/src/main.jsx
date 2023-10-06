import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BackendProvider } from './components/context/BackendContext'
import { ClientProvider } from './components/context/ClientContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BackendProvider>
    <ClientProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </ClientProvider>
  </BackendProvider>
)
