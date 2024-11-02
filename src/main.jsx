// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/tailwind.css';
import './index.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <App />
  // </StrictMode>,
)
