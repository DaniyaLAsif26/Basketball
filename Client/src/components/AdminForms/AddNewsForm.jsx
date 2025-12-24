import './add-news-form.css'
import { useState, useEffect, useRef } from 'react'

export default function AddNewsForm() {

    const imageRef = useRef(null)

    const [loading, setLoading] = useState(false)

    const [newsTitle, setNewsTitle] = useState(() => {
        return sessionStorage.getItem('title') || ''
    })

    useEffect(() => {
        sessionStorage.setItem('title', newsTitle)
    }, [newsTitle])

    const createNews = (e) => {
        e.preventDefault()
        if (loading) return;

        const image = imageRef.current.files[0]

        if (!newsTitle || !image) {
            alert('Fill out all fields')
            return
        }

        const formData = new FormData()
        formData.append('newsTitle', newsTitle)
        formData.append('newsImage', image)
    }

    return (
        <div className="add-news">
            <div className="add-news-cont">
                <div className="add-news-head">
                    <h2>Add News</h2>
                </div>
                <div className="add-news-from-cont">
                    <form className='add-news-form'>
                        <div className="news-form-div">
                            <label htmlFor="title">News Title : </label>
                            <textarea
                                name='title'
                                id="title"
                                placeholder='Add News Title'
                                value={newsTitle}
                                onChange={(e) => setNewsTitle(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <div className="news-form-div">
                            <label htmlFor="image">News Image : </label>
                            <input
                                ref={imageRef}
                                id='image'
                                type="file"
                                name="image"
                                accept='image/png, image/jpeg, image/jpg'
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="add-news-btn">
                            <button onClick={createNews}>Create News</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}