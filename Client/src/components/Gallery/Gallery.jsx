import './gallery.css'
import { useState } from 'react'

import { IoCloseCircleSharp } from "react-icons/io5";
import { GiPreviousButton } from "react-icons/gi";
import { GiNextButton } from "react-icons/gi";

import big_1 from '../../assets/big-1.jpg'
import big_2 from '../../assets/big-2.jpg'
import news_1 from '../../assets/news-1.jpg'
import news_2 from '../../assets/news-2.webp'
import news_3 from '../../assets/news-3.jpg'

export default function Gallery() {

    const [images, setImages] = useState([big_1, news_1, news_2, news_3, big_2, big_1, news_1, news_2, news_3, big_2])
    const [index, setIndex] = useState(null)

    const openModal = (index) => setIndex(index)
    const closeModal = () => setIndex(null)
    const prev = () => setIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
    const next = () => setIndex(prev => prev === images.length ? 0 : prev + 1)

    return (
        <>
            <div className={`gallery-cont ${index !== null ? "blurred" : ""}`}>
                <div className="gallery-head news-head">
                    <h1>Gallery</h1>
                </div>
                <div className="gallery">
                    {images.map((img, index) => (
                        <img
                            src={img} alt=""
                            loading='lazy'
                            key={index}
                            onClick={() => openModal(index)}
                        />
                    ))}
                </div>

            </div>


            {index !== null && (
                <div className="modal">
                    <span onClick={closeModal} className='close-btn'><IoCloseCircleSharp /></span>
                    <button onClick={prev} className='gallery-btn prev-btn'><GiPreviousButton /></button>
                    <img
                        src={images[index]}
                        className='modal-img'
                        loading='lazy'
                    />
                    <button onClick={next} className='gallery-btn next-btn'><GiNextButton /></button>
                </div>
            )}
        </>
    )
}