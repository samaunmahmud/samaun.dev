import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/urbanist'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import { NotFound } from './components/layout/NotFound'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotFound />
  </StrictMode>,
)
