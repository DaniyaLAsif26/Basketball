import Slider_img from '../../assets/home-bg.jpg';
import slide_1 from '../../assets/slide-1.jpg';
import slide_2 from '../../assets/slide-2.jpg';
import slide_3 from '../../assets/slide-3.jpg';
import slide_4 from '../../assets/slide-4.jpg';
import './slider.css'

export default function SliderCont() {
    return (
        <div className="slider-cont">
            <div className="slider-img">
            <img src={Slider_img} alt="" />
            </div>
            <div className="slider">
                <img src={slide_1} alt="" />
                <img src={slide_2} alt="" />
                <img src={slide_3} alt="" />
                <img src={slide_4} alt="" />
            </div>
        </div>
    )
}