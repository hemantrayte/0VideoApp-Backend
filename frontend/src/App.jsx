import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Token from './pages/user/Token'

function App() {

  return (
    <>
     <Header />
     <Outlet />
     <Footer />
     <Token />
    </>
  )
}

export default App
