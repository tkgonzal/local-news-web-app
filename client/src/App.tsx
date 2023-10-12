import { Route, Routes } from "react-router-dom"

import BreakingNews from "./pages/BreakingNews"
import Error from "./pages/Error"

import ArticleTestData from "./test/ArticleData"

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ResetPassword from "./pages/ResetPasswordPage"
import ConfirmResetPassword from "./pages/ConfirmResetPasswordPage"

import "./App.css"
import Navbar from "./components/Navbar/Navbar";

function App() : JSX.Element {

  const navLinks = [
    { name: 'Login', url: '/login' },
    { name: 'Subscribe', url: '/subscribe' },
  ];

  return (
    <>
      <Navbar links={navLinks}/>

      <Routes>
        <Route path="/" element={<BreakingNews articles={ArticleTestData}/>}/>
        <Route path="/news" element={<h1>news page</h1>}/>
        <Route path="/article/:id" element={<Error />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/confirm-reset-password" element={<ConfirmResetPassword />}/>
      </Routes>
    </>
  )
}

export default App
