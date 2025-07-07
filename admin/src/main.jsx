import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AdminContext } from './context/AdminContext.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import { AppContext } from './context/AppContext.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContext>
      <DoctorContext>
        <AppContext>
          <App />
        </AppContext>
      </DoctorContext>
    </AdminContext>
  </BrowserRouter>,
)
