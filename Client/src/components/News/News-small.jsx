import './news.css'

export default function NewsSmall({data}) {
    return (
        <div className="news-box">
            <img src={data.img} alt="" />
            <div className="news-txt">
                <div className="news-txt-head">
                    <h2>{data.headline} </h2>
                </div>
            </div>
        </div>
    )
}