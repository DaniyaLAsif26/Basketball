import AppRoutes from './routes/AppRoutes.jsx'

import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/Footer.jsx'
import ScrollToTop from './components/ScrollTop/ScrollToTop.jsx'
import './App.css'

import AdminNav from './components/Admin/AdminNav.jsx'

import { useLocation } from 'react-router-dom'

import { useLogin } from './context/LoginContext.jsx'
import logo from '../src/assets/red.png'

function App() {
  const location = useLocation()

  const route = ['/login', '/admin', '/admin/add-news', '/admin/add-event']
  const adminRoutes = ['/admin', '/admin/add-news', '/admin/add-event']

  const checkRoute = route.includes(location.pathname)
  const checkAdminRoute = adminRoutes.includes(location.pathname)

  const {isUserLoading } = useLogin()

  if (isUserLoading) {
    return (
      <div className='loading-all' style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <img src={logo} alt="" />
      </div>
    )
  }

  return (
    <>
      <ScrollToTop />
      {!checkRoute && <Navbar />}
      {checkAdminRoute && <AdminNav />}
      <AppRoutes />
      <Footer />
    </>
  )
}

export default App
