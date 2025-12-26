import './counter.css'
import CounterElement from './CounterElement'

import { TbPlayBasketball } from "react-icons/tb";
import { GiWhistle } from "react-icons/gi";
import { FaTrophy } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Counter() {
    return (
        <div className="counter">
            <div className="counter-cont">
                <div className="counter-cont-head">
                    <h2>Powering the Growth of Basketball in Telangana</h2>
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