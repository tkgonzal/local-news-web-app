import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import BreakingNews from "./pages/BreakingNews"
import ArticlesTable from "./pages/BusinessPanel/ArticlesTable"
import ArticleForm from "./pages/BusinessPanel/ArticleForm"
import UsersTable from "./pages/BusinessPanel/UsersTable"
import UserForm from "./pages/BusinessPanel/UserForm"
import BusinessSettings from "./pages/BusinessPanel/BusinessSettings"
import Error from "./pages/Error"

import ArticleTestData from "./test/ArticleData"

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ResetPassword from "./pages/ResetPasswordPage"
import ConfirmResetPassword from "./pages/ConfirmResetPasswordPage"

import "./App.css"

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
        <Route path="/article/:articleId" element={<Error />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/confirm-reset-password" element={<ConfirmResetPassword />}/>
        <Route path="/business/articles" element={<ArticlesTable />}/>
        <Route path="/business/articles/form/:articleId" element={<ArticleForm />}/>
        <Route path="/business/users" element={<UsersTable />}/>
        <Route path="/business/users/form/:userId" element={<UserForm />}/>
        <Route path="/business/settings" element={<BusinessSettings />}/>
        <Route path="*" element={<Error />}/>
      </Routes>
    </>
  )
}

export default App
