import Home from './pages/Home'
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
     {/* <Header />
     <Outlet />
     <Footer /> */}
     <Home />
    </>
  )
}

export default App
