<<<<<<< HEAD
import './news-box.css'
=======
import './news-small.css'
>>>>>>> 2f0969b2aab89dded7cc693c3d3b7afa7c202a90

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