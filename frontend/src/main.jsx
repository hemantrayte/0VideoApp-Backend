import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import Home from './pages/Home.jsx';


import { RouterProvider } from 'react-router-dom';
import Signup from './pages/user/Signup.jsx';
import Login from './pages/user/Login.jsx'
import Logout from './pages/user/Logout.jsx'
import AllVideos from './pages/video/AllVideos.jsx'
import SingleVideo from './pages/video/SingleVideo.jsx';
const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {path:"/", element:<AllVideos />},
      {
        path:"signup",
        element:<Signup />
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"log-out",
        element:<Logout />
      },

      //video routes
      {
        path:"videos",
        element:<AllVideos />
      },
      {
        path:"videos/:id",
        element:<SingleVideo />
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    
  </StrictMode>,
)
