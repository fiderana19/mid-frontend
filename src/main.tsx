import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
