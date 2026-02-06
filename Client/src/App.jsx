import AppRoutes from './routes/AppRoutes.jsx'

import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/Footer.jsx'
import ScrollToTop from './components/ScrollTop/ScrollToTop.jsx'
import './App.css'

import AdminNav from './components/Admin/AdminNav.jsx'

import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()

  const route = ['/login', '/admin', '/admin/add-news', '/admin/add-event']
  const adminRoutes = ['/admin', '/admin/add-news', '/admin/add-event']

  const checkRoute = route.includes(location.pathname)
  const checkAdminRoute = adminRoutes.includes(location.pathname)

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
