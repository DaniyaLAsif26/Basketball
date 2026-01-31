import './counter.css'
import CounterElement from './CounterElement'

import { TbPlayBasketball } from "react-icons/tb";
import { GiWhistle } from "react-icons/gi";
import { FaTrophy } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect ,useState } from 'react';

export default function Counter() {

    const [sliderWidth, setSliderWidth] = useState(window.innerWidth < 560)

    useEffect(() => {
        const handleResize = () => {
            setSliderWidth(window.innerWidth < 999)
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])
    return (
        <div className="counter">
            <div className="counter-cont">
                <div className="counter-cont-head">
                    <h2> {sliderWidth ? 'Powering Telangana Basketball' : 'Powering the Growth of Basketball in Telangana'}</h2>
                </div>
                <div className="counter-elements-cont">
                    <CounterElement icon={<TbPlayBasketball />} label={'Players'} target={600} />
                    <CounterElement icon={<GiWhistle />} label={'Referees'} target={100} />
                    <CounterElement icon={<FaTrophy />} label={'Tournaments'} target={10} small={'small'} />
                    <CounterElement icon={<FaMapMarkerAlt />} label={'Districts'} target={32} small={'small'} />
                </div>
            </div>
        </div>
    )
}