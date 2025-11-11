import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/global-styles.jsx'
import App from './App.jsx'
import GlobalStyle from './components/global-styles.jsx'
import { BackToTop } from './components/scroll-styles.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle/>
    <BackToTop/>
    <App />
  </StrictMode>
)
