import AppRoutes from './routes/AppRoutes.jsx'

import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/Footer.jsx'
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  )
}

export default App
