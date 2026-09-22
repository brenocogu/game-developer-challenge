import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PirateBattleApp from './PirateBattleApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PirateBattleApp />
  </StrictMode>,
)
