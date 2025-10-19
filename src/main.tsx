import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'

  // 랜덤 배경색을 생성하여 CSS 변수에 주입합니다. 페이지 로드마다 다른 배경 조합이 적용됩니다.
  ; (function setRandomBackgroundVars() {
    function rand255() {
      return Math.floor(Math.random() * 156) + 80; // 80-235 범위로 너무 어둡거나 밝지 않게
    }

    const bg1 = `${rand255()}, ${rand255()}, ${rand255()}`
    const bg2 = `${rand255()}, ${rand255()}, ${rand255()}`
    document.documentElement.style.setProperty('--bg1', bg1)
    document.documentElement.style.setProperty('--bg2', bg2)
  })()

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
