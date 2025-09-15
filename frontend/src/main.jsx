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
import UpdateVideo from './pages/video/UpdateVideo.jsx';
import DeleteVideo from './pages/video/DeleteVideo.jsx';
import PublishStatus from './pages/video/PublishStatus.jsx';
import UploadVideo from './pages/video/UploadVideo.jsx';
import CreatePost from './pages/tweet/CreateTweet.jsx';
import AllTweets from './pages/tweet/AllTweets.jsx';
import GetUserTweet from './pages/tweet/GetUserTweet.jsx';
import UpdateTweet from './pages/tweet/UpdateTweet.jsx';
import DeleteTweet from './pages/tweet/DeleteTweet.jsx';
import ChannelProfile from './pages/user/ChannelProfile.jsx';

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
        path:"videos/upload",
        element:<UploadVideo />
      },
      {
        path:"videos/:id",
        element:<SingleVideo />
      }, 
      {
        path:"videos/update/:id",
        element:<UpdateVideo />
      },
      {
        path:"videos/delete/:id",
        element:<DeleteVideo />
      },
      {
        path:"videos/status/:id",
        element:<PublishStatus />
      },

      //chenneal
      {
        path:"channel/profile/:username",
        element:<ChannelProfile />
      },


      //tweet post community post
      {
        path:"tweets",
        element:<AllTweets />
      },
      {
        path:"tweets/:id",
        element:<GetUserTweet />
      },
      {
         path:"tweets/update/:id",
         element:<UpdateTweet />
      },
      {
          path:"tweets/delete/:id",
          element:<DeleteTweet />
      },
      {
        path:"tweet/create",
        element:<CreatePost />
      },
      

    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    
  </StrictMode>,
)
