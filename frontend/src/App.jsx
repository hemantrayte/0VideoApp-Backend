import Home from './pages/Home'
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Signup from './pages/user/Signup'
import SingleVideo from './pages/video/SingleVideo'
import CurrentUser from './pages/user/CurrentUser'

function App() {

  return (
    <>
     <Header />
     <Outlet />
     <Footer />
     {/* <CurrentUser /> */}
    </>
  )
}

export default App
