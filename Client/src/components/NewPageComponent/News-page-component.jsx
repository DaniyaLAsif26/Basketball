import './news-page-component.css'
import { useState, useEffect } from 'react'

const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function NewsPageComponent() {

    const [news, setNews] = useState([])
    const [loading, isLoading] = useState(false)

    useEffect(() => {
        const getHomeNews = async () => {
            try {
                isLoading(true)
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
            finally {
                isLoading(false)
            }
        }
        getHomeNews()
    }, [])


    return (

        <div className="news-page">
            <div className="news-page-head news-head">
                <h1>NEWS</h1>
            </div>
            {isLoading ?
                <div className="news-page-news-cont">
                    {news.map((item, index) => (
                        <div className="news-page-news" key={index}>
                            <div className="news-page-news-img">
                                <img src={item.newsImage} alt="" />
                            </div>
                            <div className="news-page-news-content">
                                <div className="news-date">{new Date(item.createdAt).toLocaleString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}</div>
                                <div className="news-headline">
                                    <h3>{item.newsHeadline}</h3>
                                </div>
                                <div className="news-content">{item.newsContent}</div>
                            </div>
                        </div>
                    ))}

                </div>
                :
                null
            }

        </div>
    )
}