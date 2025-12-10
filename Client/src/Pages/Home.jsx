import SliderCont from '../components/Slider/Slider-cont'
import News from '../components/News/News.jsx'
import Line from '../components/Line/line.jsx'
import Ranking from '../components/Ranking/Ranking.jsx'
import Tournament from '../components/Tournament/Tournament.jsx'

export default function HomePage (){
    return(
        <>
              <SliderCont />
              <News />
              <Line />
              <Ranking />
              <Tournament />
        </>
    )
}