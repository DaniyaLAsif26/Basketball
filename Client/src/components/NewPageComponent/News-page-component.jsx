import './news-page-component.css'

import big_1 from '../../assets/big-1.jpg'
import big_2 from '../../assets/big-2.jpg'
import news_1 from '../../assets/news-1.jpg'
import news_2 from '../../assets/news-2.webp'
import news_3 from '../../assets/news-3.jpg'

import NewsSmall from '../News/News-small'
import NewsBig from '../News/News-big'

const photos = [
    { headline: "Launch of the Official School Basketball League ", img: big_1 },
    { headline: "Launch of the Official School Basketball League ", img: news_1 },
    { headline: "Launch of the Official School Basketball League ", img: news_2 },
    { headline: "Launch of the Official School Basketball League ", img: big_2 },
    { headline: "Launch of the Official School Basketball League ", img: news_3 },
    { headline: "Launch of the Official School Basketball League ", img: news_1 },
    { headline: "Launch of the Official School Basketball League ", img: big_2 },
    { headline: "Launch of the Official School Basketball League ", img: news_3 },
    { headline: "Launch of the Official School Basketball League ", img: news_1 },
]

export default function Gallery() {
    const rows = []
    for (let i = 0; i < photos.length; i += 3) {
        rows.push(photos.slice(i, i + 3))
    }

    return (
        <div className="news-page">
            {rows.map((row, index) => (
                <div key={index} className="news-row">
                    {index % 2 === 0 ? (
                        <>
                            {row[0] && <NewsBig data={row[0]} />}
                            {row[1] && <NewsSmall data={row[1]} />}
                            {row[2] && <NewsSmall data={row[2]} />}
                        </>
                    ) : (
                        <>
                            {row[0] && <NewsSmall data={row[0]} />}
                            {row[1] && <NewsSmall data={row[1]} />}
                            {row[2] && <NewsBig data={row[2]} />}
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}