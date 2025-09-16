import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import AllVideosLikeByUser from './pages/like/AllVideosLikeByUser'

function App() {

  return (
    <>
     <Header />
     <Outlet />
     <Footer />
     <AllVideosLikeByUser />
    </>
  )
}

export default App
