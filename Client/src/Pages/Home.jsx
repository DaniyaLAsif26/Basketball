import SliderCont from '../components/Slider/Slider-cont'
import News from '../components/News/News.jsx'
import Ranking from '../components/RankingHome/Ranking-home.jsx'
import Tournament from '../components/Tournament/Tournament.jsx'
import Intro from '../components/Into/Intro.jsx'
import Counter from '../components/Statistics/Counter.jsx'

export default function HomePage() {
    return (
        <>
            <Intro />
            <div className="home-bg">
                <News />
                <Counter />
                <Ranking />
                <SliderCont />
                <Tournament />
            </div>
        </>
    )
}