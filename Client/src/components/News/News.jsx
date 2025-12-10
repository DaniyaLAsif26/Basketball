import './news.css'
import big_1 from '../../assets/big-1.jpg'
import big_2 from '../../assets/big-2.jpg'
import news_1 from '../../assets/news-1.jpg'
import news_2 from '../../assets/news-2.webp'
import news_3 from '../../assets/news-3.jpg'

export default function News() {
    return (
        <div className="news-cont">
            <div className="news-head">
                <h1>NEWS</h1>
            </div>
            <div className="news">
                <div className="news-box news-big">
                    <img src={big_1} alt="" />
                    <div className="news-txt">
                        <div className="news-txt-head">
                            <h2>Launch of the Official School Basketball League </h2>
                        </div>
                    </div>
                </div>
                <div className="news-box">
                    <img src={news_1} alt="" />
                    <div className="news-txt">
                        <div className="news-txt-head">
                            <h2>Launch of the Official School Basketball League </h2>
                        </div>
                    </div>
                </div>
                <div className="news-box">
                    <img src={news_2} alt="" />
                    <div className="news-txt">
                        <div className="news-txt-head">
                            <h2>Launch of the Official College Basketball League </h2>
                        </div>
                    </div>
                </div>
                <div className="news-box">
                    <img src={news_2} alt="" />
                    <div className="news-txt">
                        <div className="news-txt-head">
                            <h2>Launch of the Official College Basketball League </h2>
                        </div>
                    </div>
                </div>
                <div className="news-box">
                    <img src={news_2} alt="" />
                    <div className="news-txt">
                        <div className="news-txt-head">
                            <h2>Launch of the Official College Basketball League </h2>
                        </div>
                    </div>
                </div>
                <div className="news-box news-big">
                    <img src={big_2} alt="" />
                    <div className="news-txt">
                        <div className="news-txt-head">
                            <h2>Launch of the Official College Basketball League </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}