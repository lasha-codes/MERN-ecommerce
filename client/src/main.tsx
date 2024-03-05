import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios'
import './index.css'
import { Toaster } from 'react-hot-toast'
import UserContext from './components/UserContext.tsx'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext>
        <App />
      </UserContext>
      <Toaster position='top-right' />
    </BrowserRouter>
  </React.StrictMode>
)
