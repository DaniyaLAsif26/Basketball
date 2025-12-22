import './news-box.css'
import './news-small.css'

export default function NewsSmall({data}) {
    return (
        <div className="news-box">
            <div className="img-wrapper">
            <img src={data.img} alt="" />
            </div>
            <div className="news-txt">
                <div className="news-txt-head">
                    <h2>{data.headline} </h2>
                </div>
            </div>
        </div>
    )
}