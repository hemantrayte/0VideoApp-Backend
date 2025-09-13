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
import UpdateAccount from './pages/user/UpdateAccount.jsx'
import CurrentUser from './pages/user/CurrentUser.jsx';
import UpdateAvatar from './pages/user/UpdateAvatar.jsx';
import UpdateCovertImage from './pages/user/UpdateCoverImage.jsx'
import ChangePassword from './pages/user/ChangePassword.jsx'


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
      {
            path:"user/update",
            element:<UpdateAccount />
      },
      {
        path:"user/update/avatar",
        element:<UpdateAvatar />
      },
      {
        path:"user/update/cover-image",
        element:<UpdateCovertImage />
      },
      {
        path:"user/update/password",
        element:<ChangePassword />
      },
      {
        path:"user/current-user",
        element:<CurrentUser />
      }
      ,
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
