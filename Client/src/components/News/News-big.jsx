import './news-box.css'
import './news-small.css'
import './home-news-loading.css'

export default function NewsBig({ data, newsLoading }) {

    if (newsLoading) {
        return (
            <div className="news-box news-big">
                <div className="img-wrapper-loading"></div>
                <div className="news-txt">
                    <div className="news-txt-head"></div>
                </div>
            </div>
        )
    }

    if (!data) return null; 

    return (
        <div className="news-box news-big">
            <div className="img-wrapper">
                <img src={data.newsImage} alt={data.newsHeadline} />
            </div>
            <div className="news-txt">
                <div className="news-txt-head">
                    <h2>{data.newsHeadline}</h2>
                </div>
            </div>
        </div>
    )
}
