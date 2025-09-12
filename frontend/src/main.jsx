import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import Home from './pages/Home.jsx';


import { RouterProvider } from 'react-router-dom';
import Signup from './pages/user/Signup.jsx';
import Login from './pages/user/Login.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {path:"/", element:<Home />},
      {
        path:"/sign-up",
        element:<Signup />
      },
      {
        path:"/log-in",
        element:<Login/>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    
  </StrictMode>,
)
