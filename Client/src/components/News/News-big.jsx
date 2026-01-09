import './news-box.css'
import './news-small.css'

export default function NewsBig({ data }) {

    return (
        <div className="news-box news-big">
            <div className="img-wrapper">
                <img src={data.newsImage} alt="" />
            </div>
            <div className="news-txt">
                <div className="news-txt-head">
                    <h2>{data.newsHeadline} </h2>
                </div>
            </div>
        </div>
    )
}