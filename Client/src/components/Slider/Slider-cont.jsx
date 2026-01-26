import './slider.css';
import { useRef, useState, useEffect } from 'react';

import { GrFormNext } from "react-icons/gr";

import Slider_img from '../../assets/home-bg.jpg';

export default function SliderCont() {

    const SlideRef = useRef(null)

    const handleTouchStart = () => {
        if (SlideRef.current) {
            SlideRef.current.style.animationPlayState = 'paused';
        }
    };

    const handleTouchEnd = () => {
        if (SlideRef.current) {
            SlideRef.current.style.animationPlayState = 'running';
        }
    };

    const [images, setImages] = useState([])

    useEffect(() => {
        fetch("/home-gallery.json")
            .then(res => res.json())
            .then(data => setImages(data))
            .catch(err => console.error("Failed to load gallery:", err));
    }, []);

    return (
        <div className="slider-cont">
            <div className="gallery-slider">
                <div className="slider-bg-img">
                    <img src={Slider_img} alt="Background" />
                </div>
                <div className="slider-cont-head">
                    <h2>GALLERY</h2>
                    <div className="gallery-more"><a href="/gallery">See More </a><GrFormNext /></div>
                </div>
                <div className="slider"
                    ref={SlideRef}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {images.map((img, index) => (
                        <img src={img}
                            loading='lazy'
                            key={index}
                            className='slider-img' />

                    ))}
                    {images.map((img, index) => (
                        <img src={img}
                            loading='lazy'
                            key={index}
                            className='slider-img' />

                    ))}
                </div>
            </div>
        </div>
    );
}