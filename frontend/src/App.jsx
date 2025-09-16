import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import AllVideosLikeByUser from './pages/like/AllVideosLikeByUser'
import CreatePlaylist from './pages/playlist/CreatePlaylist'

function App() {

  return (
    <>
     <Header />
     <Outlet />
     <Footer />
     {/* <CreatePlaylist /> */}
    </>
  )
}

export default App
