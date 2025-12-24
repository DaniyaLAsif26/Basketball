import SliderCont from '../components/Slider/Slider-cont'
import News from '../components/News/News.jsx'
import Ranking from '../components/RankingHome/Ranking-home.jsx'
import Tournament from '../components/Tournament/Tournament.jsx'

export default function HomePage (){
    return(
        <>
              <SliderCont />
              <News />
              <Ranking />
              <Tournament />
        </>
    )
}