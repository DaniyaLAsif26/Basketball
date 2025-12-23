import './view-event.css'

import event_1 from '../../assets/event-1.webp'

export default function ViewEvent() {
    return (
        <div className="view-event-cont">
            <div className="view-event-head">
                <div className="event-img">
                    <img src={event_1} alt="" />
                </div>
                <div className="view-event-details">
                    <div className="event-details-main">
                        <div className="event-name">
                            <h2>SANKETIKA SPORTS FEST</h2>
                        </div>
                        <div className="event-date">
                            20-10-2025 to 26-10-2025
                        </div>
                    </div>
                    <div className="event-details-others">
                        <div className="event-types">
                            <span className='event-type'>Type : </span>
                            <span>Un-Official</span>
                        </div>
                        <div className="event-types">
                            <span className='event-type'>Age-Group : </span>
                            <span>U-23</span>
                        </div>
                        <div className="event-types">
                            <span className='event-type'>Category : </span>
                            <span>MALE</span>
                        </div>
                        <div className="event-types">
                            <span className='event-type'>Level : </span>
                            <span>University</span>
                        </div>
                        <div className="event-types">
                            <span className='event-type'>Format : </span>
                            <span>5X5</span>
                        </div>
                        <div className="event-types">
                            <span className='event-type'>District : </span>
                            <span>Kumuram Bheem Asifabad</span>
                        </div>
                        <div className="event-types event-fee">
                            <span className='event-type'>Entry-Fee : </span>
                            <span>2600 per team</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="event-add-info">
                <div className="event-add-info-head">
                    <h2>Additional Info : </h2>
                </div>
                <div className="event-add-info-main">
                    <div className="add-event-col">
                        <div className="">
                            <span className='event-type'>Location : </span>
                            <span><a href="">Lords Institute of Engineering & Technology ,Appa Junction ,Himayatsagar , Hyderabad ,500026.</a></span>
                        </div>
                        <div className="">
                            <span className='event-type'>Instagram : </span>
                            <span><a href="">_daniyal_26</a></span>
                        </div>
                    </div>
                    <div className="add-event-col">

                        <div className="add-info-row">
                            <div className="">
                                <span className='event-type'>Conatct Name : </span>
                                <span>Daniyal Asif</span>
                            </div>
                            <div className="">
                                <span className='event-type'>Phone No 1 : </span>
                                <span>7382049545</span>
                            </div>
                        </div>
                        <div className="add-info-row">

                            <div className="">
                                <span className='event-type'>Phone No 2 : </span>
                                <span>7382049545</span>
                            </div>
                            <div className="">
                                <span className='event-type'>Email : </span>
                                <span>daniyalasif550@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="event-details-cont">
                <div className="event-add-info-head event-details-cont-head">
                    <h2>Details : </h2>
                </div>
                <div className="event-details-body">
                    
                </div>
            </div>
        </div>
    )
}