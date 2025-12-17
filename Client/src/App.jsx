import AppRoutes from './routes/AppRoutes.jsx'

import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/Footer.jsx'
import './App.css'

import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()

  const route = ['/login']
  const checkRoute = route.includes(location.pathname)

  return (
    <>
      {!checkRoute && <Navbar />}
      <AppRoutes />
      <Footer />
    </>
  )
}

export default App
