import { Route, Routes } from "react-router-dom"

import BreakingNews from "./pages/BreakingNews"
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
      </Routes>
    </>
  )
}

export default App
