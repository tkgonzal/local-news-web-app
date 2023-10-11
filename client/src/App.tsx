import { Route, Routes } from "react-router-dom"

import BreakingNews from "./pages/BreakingNews"
import ArticlesTable from "./pages/BusinessPanel/ArticlesTable"
import UsersTable from "./pages/BusinessPanel/UsersTable"
import Error from "./pages/Error"

import ArticleTestData from "./test/ArticleData"

import "./App.css"

function App() : JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<BreakingNews articles={ArticleTestData}/>}/>
        <Route path="/news" element={<h1>news page</h1>}/>
        <Route path="/article/:id" element={<Error />}/>
        <Route path="/business/articles" element={<ArticlesTable />}/>
        <Route path="/business/users" element={<UsersTable />}/>
        <Route path="*" element={<Error />}/>
      </Routes>
    </>
  )
}

export default App
