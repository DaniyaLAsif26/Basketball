import SliderCont from '../components/Slider/Slider-cont'
import News from '../components/News/News.jsx'
import Ranking from '../components/RankingHome/Ranking-home.jsx'
import Tournament from '../components/Tournament/Tournament.jsx'
import HeroSection from '../components/HeroSection/Hero.jsx'
import Counter from '../components/Statistics/Counter.jsx'

import '../components/HeroSection/hero.css'

export default function HomePage() {
    return (
        <>
            <HeroSection />
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