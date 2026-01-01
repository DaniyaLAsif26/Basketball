import './news.css'
import big_1 from '../../assets/big-1.jpg'
import big_2 from '../../assets/big-2.jpg'
import news_1 from '../../assets/news-1.jpg'
import news_2 from '../../assets/news-2.webp'
import news_3 from '../../assets/news-3.jpg'

import NewsBig from './News-big.jsx'
import NewsSmall from './News-small.jsx'

const newsData = [
    { headline: "Launch of the Official School Basketball League ", img: big_1 },
    { headline: "Launch of the Official School Basketball League ", img: news_1 },
    { headline: "Launch of the Official School Basketball League ", img: news_2 },
    { headline: "Launch of the Official School Basketball League ", img: big_2 },
    { headline: "Launch of the Official School Basketball League ", img: news_3 },
    { headline: "Launch of the Official School Basketball League ", img: news_1 },
]

const row1 = newsData.slice(0, 3)
const row2 = newsData.slice(3, 6)

export default function News() {
    return (
        <div className="home-news">
            <div className="news-cont">
                <div className="news-head">
                    <h1>NEWS</h1>
                </div>
                <div className="news">
                    <div className="news-row">
                        <NewsBig data={row1[0]} />
                        <NewsSmall data={row1[1]} />
                        <NewsSmall data={row1[2]} />
                    </div>
                    <div className="news-row">
                        <NewsBig data={row2[0]} />
                        <NewsSmall data={row2[1]} />
                        <NewsSmall data={row2[2]} />
                    </div>
                </div>
            </div>
        </div>
    )
}