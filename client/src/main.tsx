import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { UserProvider } from './contexts/UserContext.tsx';
import { SnackbarProvider } from "./contexts/SnackbarContext.tsx"; 

import App from "./App.tsx"

import "./index.css"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider><UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider></SnackbarProvider>
  </React.StrictMode>,
)
