import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles-components/global-styles.jsx'
import App from './App.jsx'
import GlobalStyle from './styles-components/global-styles.jsx'
import { BackToTop } from './styles-components/scroll-styles.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle/>
    <BackToTop/>
    <App />
  </StrictMode>
)
