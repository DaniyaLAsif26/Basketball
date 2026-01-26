import './gallery.css'
import { useState , useEffect } from 'react'

import { IoCloseCircleSharp } from "react-icons/io5";
import { GiPreviousButton } from "react-icons/gi";
import { GiNextButton } from "react-icons/gi";

export default function Gallery() {

    const [images, setImages] = useState([])
    const [index, setIndex] = useState(null)

     useEffect(() => {
        fetch("/gallery.json")
            .then(res => res.json())
            .then(data => setImages(data))
            .catch(err => console.error("Failed to load gallery:", err));
    }, []);

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