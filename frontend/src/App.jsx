import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import CreateTweet from './pages/tweet/CreateTweet'

function App() {

  return (
    <>
     <Header />
     <Outlet />
     <Footer />
     <CreateTweet />
    </>
  )
}

export default App
