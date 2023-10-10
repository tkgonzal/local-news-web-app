import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/LoginPage'
import ResetPassword from './pages/ResetPasswordPage'
import ConfirmResetPassword from './pages/ConfirmResetPasswordPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ConfirmResetPassword />
    </>
  )
}

export default App
