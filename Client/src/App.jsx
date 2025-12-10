import Navbar from './components/Navbar/navbar'
import SliderCont from './components/Slider/Slider-cont'
import News from './components/News/News.jsx'
import Line from './components/Line/line.jsx'
import Ranking from './components/Ranking/Ranking.jsx'
import Tournament from './components/Tournament/Tournament.jsx'
import Footer from './components/Footer/Footer.jsx'
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <SliderCont />
      <News />
      <Line />
      <Ranking />
      <Tournament />
      <Footer />
    </>
  )
}

export default App
