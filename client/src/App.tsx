import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import BreakingNews from "./pages/BreakingNews"
import NewsPage from "./pages/NewsPage"
import NewsSubPage from "./pages/NewsSubPage"
import StaffPage from "./pages/StaffPage"
import ArticlesTable from "./pages/BusinessPanel/ArticlesTable"
import ArticleForm from "./pages/BusinessPanel/ArticleForm"
import UsersTable from "./pages/BusinessPanel/UsersTable"
import UserForm from "./pages/BusinessPanel/UserForm"
import BusinessSettings from "./pages/BusinessPanel/BusinessSettings"
import SubscribePage from "./pages/SubscribePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ResetPassword from "./pages/ResetPasswordPage"
import ConfirmResetPassword from "./pages/ConfirmResetPasswordPage"
import Error from "./pages/Error"

import ArticleTestData from "./test/ArticleData"

import "./App.css"

function App() : JSX.Element {
  const location = useLocation()

  const navLinks = [
    { name: 'Login', url: '/login' },
    { name: 'Subscribe', url: '/subscribe' },
  ]

  // Side Effects
  // Changes the background colour of the body if the sites loads any of the
  // business panel pages
  useEffect(() => {
    if (location.pathname.includes("/business/") &&
        !document.body.classList.contains("business-panel--body")) {
      document.body.classList.add("business-panel--body")
    }

    if (!location.pathname.includes("/business/") && 
        document.body.classList.contains("business-panel--body")) {
      document.body.classList.remove("business-panel--body")
    }
  }, [location])

  // Side Effects
  // Changes the background colour of the body if the sites loads any of the
  // business panel pages
  useEffect(() => {
    if (location.pathname.includes("/business/") &&
        !document.body.classList.contains("business-panel--body")) {
      document.body.classList.add("business-panel--body")
    }

    if (!location.pathname.includes("/business/") && 
        document.body.classList.contains("business-panel--body")) {
      document.body.classList.remove("business-panel--body")
    }
  }, [location])

  const shouldRenderNavbar = !['/login', '/register'].includes(location.pathname)

  return (
    <>
      {shouldRenderNavbar && <Navbar links={navLinks}/>}

      <main className={shouldRenderNavbar ? "page-container": ""}>
        <Routes>
          <Route path="/" element={<BreakingNews articles={ArticleTestData}/>}/>
          <Route path="/news" element={<h1>news page</h1>}/>
          <Route path="/news" element={<NewsPage articles={ArticleTestData}/>}/>
          <Route path="/news/local" element={<NewsSubPage articles={ArticleTestData} category = {'LOCAL'}/>}/>
          <Route path="/news/crime" element={<NewsSubPage articles={ArticleTestData} category = {'CRIME'}/>}/>
          <Route path="/news/government" element={<NewsSubPage articles={ArticleTestData} category = {'GOVERNMENT'}/>}/>
          <Route path="/news/education" element={<NewsSubPage articles={ArticleTestData} category = {'EDUCATION'}/>}/>
          <Route path="/article/:articleId" element={<Error />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/reset-password" element={<ResetPassword />}/>
          <Route path="/confirm-reset-password" element={<ConfirmResetPassword />}/>
          <Route path="/staff" element={<StaffPage />}/>
          <Route path="/subscribe" element={<SubscribePage />}/>
          <Route path="/business/articles" element={<ArticlesTable />}/>
          <Route path="/business/articles/form/:articleId" element={<ArticleForm />}/>
          <Route path="/business/users" element={<UsersTable />}/>
          <Route path="/business/users/form/:userId" element={<UserForm />}/>
          <Route path="/business/settings" element={<BusinessSettings />}/>
          <Route path="*" element={<Error />}/>
        </Routes>
      </main>
    </>
  )
}

export default App
