import './slider.css';
import { useRef } from 'react';

import { GrFormNext } from "react-icons/gr";

import Slider_img from '../../assets/home-bg.jpg';
import slide_1 from '../../assets/slide-1.jpg';
import slide_2 from '../../assets/slide-2.jpg';
import slide_3 from '../../assets/slide-3.jpg';
import slide_4 from '../../assets/slide-4.jpg';

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

    return (
        <div className="slider-cont">
            <div className="gallery-slider">
                <div className="slider-img">
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
                    <img src={slide_1} alt="Slide 1" />
                    <img src={slide_2} alt="Slide 2" />
                    <img src={slide_3} alt="Slide 3" />
                    <img src={slide_4} alt="Slide 4" />
                    {/* Duplicate for seamless loop */}
                    <img src={slide_1} alt="Slide 1" />
                    <img src={slide_2} alt="Slide 2" />
                    <img src={slide_3} alt="Slide 3" />
                    <img src={slide_4} alt="Slide 4" />
                </div>
            </div>
        </div>
    );
}