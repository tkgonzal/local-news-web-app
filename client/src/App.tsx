import { Route, Routes } from "react-router-dom"

import "./App.css"

function App() : JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>home page</h1>}/>
        <Route path="/news" element={<h1>news page</h1>}/>
      </Routes>
    </>
  )
}

export default App
