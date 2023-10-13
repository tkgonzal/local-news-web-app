import { Route, Routes } from "react-router-dom"

import BreakingNews from "./pages/BreakingNews"
import Error from "./pages/Error"

import ArticleTestData from "./test/ArticleData"

import "./App.css"
import Navbar from "./components/Navbar/Navbar";
import SubscribePage from "./pages/SubscribePage"

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
        <Route path="/subscribe" element={<SubscribePage />}/>
      </Routes>
    </>
  )
}

export default App
