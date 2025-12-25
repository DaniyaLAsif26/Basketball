import SliderCont from '../components/Slider/Slider-cont'
import News from '../components/News/News.jsx'
import Ranking from '../components/RankingHome/Ranking-home.jsx'
import Tournament from '../components/Tournament/Tournament.jsx'
import Intro from '../components/Into/Intro.jsx'

export default function HomePage() {
    return (
        <>
            <Intro />
            <News />
            <Ranking />
            <SliderCont />
            <Tournament />
        </>
    )
}