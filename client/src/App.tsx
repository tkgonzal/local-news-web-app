import { Route, Routes } from "react-router-dom"

import "./App.css"
import Navbar from "./components/Navbar/Navbar";

function App() : JSX.Element {

  const navLinks = [
    { name: 'Business panel', url: '/panel' },
    { name: 'Staff', url: '/staff' },
    { name: 'Login', url: '/login' },
    { name: 'Subscribe', url: '/subscribe' },
  ];

  return (
    <>
      <Navbar title="Local News App" links={navLinks}/>

      <Routes>
        <Route path="/" element={<h1>home page</h1>}/>
        <Route path="/panel" element={<h1>Business Panel</h1>}/>
        <Route path="/staff" element={<h1>Staff</h1>}/>
        <Route path="/login" element={<h1>Login</h1>}/>
        <Route path="/subscribe" element={<h1>Subscribe</h1>}/>
      </Routes>
    </>
  )
}

export default App
