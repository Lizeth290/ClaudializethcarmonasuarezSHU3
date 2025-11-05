import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Importamos nuestro componente principal
import './index.css'     // Importamos nuestros estilos (incluyendo Tailwind)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)