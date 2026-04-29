import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { NewsProvider } from './context/NewsContext'
import { HelmetProvider } from 'react-helmet-async'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <NewsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NewsProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)

