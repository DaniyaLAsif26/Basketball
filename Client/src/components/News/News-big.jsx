import './news-small.css'

export default function NewsBig({data}) {

    return (
        <div className="news-box news-big">
            <img src={data.img} alt="" />
            <div className="news-txt">
                <div className="news-txt-head">
                    <h2>{data.headline} </h2>
                </div>
            </div>
        </div>
    )
}