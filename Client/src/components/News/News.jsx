import './news.css'
import { useState, useEffect } from 'react'
import NewsBig from './News-big.jsx'
import NewsSmall from './News-small.jsx'

const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function News() {

    const [news, setNews] = useState([])

    useEffect(() => {
        const getHomeNews = async () => {
            try {

                const res = await fetch(`${BackEndRoute}/api/news/all-news`)

                const dataRes = await res.json()

                if (dataRes.success === true) {
                    return setNews(dataRes.news)
                }

                alert(`Error: ${dataRes.message}`)
            }
            catch (err) {
                console.log(err)
                alert(`Something went wrong while fetching news`)
            }
        }
        getHomeNews()
    }, [])

    const row1 = news.slice(0, 3)
    const row2 = news.slice(3, 6)

    if (news.length < 6) {
        return <p>No news available</p>
    }

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
                        <NewsSmall data={row2[1]} />
                        <NewsSmall data={row2[2]} />
                        <NewsBig data={row2[0]} />
                    </div>
                </div>
            </div>
        </div>
    )
}