import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import CreateTweet from './pages/tweet/CreateTweet'
import GetUserTweet from './pages/tweet/GetUserTweet'

function App() {

  return (
    <>
     <Header />
     <Outlet />
     <Footer />
     <GetUserTweet/>
    </>
  )
}

export default App
