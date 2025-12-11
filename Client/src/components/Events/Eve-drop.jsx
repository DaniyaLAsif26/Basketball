import './events.css'
import { useState } from 'react'

export default function EveDrop({ drop }) {
    const [open, setOpen] = useState('')

    return (
        <>
            {drop.map((item, index) =>
                <div className={`evt-sort-wrapper ${item.class ?? ''}`} onClick={() => {
                    setOpen(prev => (prev === item.class ? '' : item.class))
                }}>
                    <div className="evt-sort">
                        <label htmlFor="sort" className="sort-label" >
                            {item.icon}
                            <div className="sort-label-txt">
                                <span className="sort-text-head">{item.head}</span>
                                <span className="sort-text-selected">{item.selected}</span>
                            </div>
                            <div className="drop-icon">
                                {item.dropIcon}
                            </div>
                        </label>

                        {open === item.class &&
                            <>
                                <div className="drop-list">
                                    <ul className='sort-select'>
                                        {item.list.map((li, index) =>
                                            <>
                                                <li onClick={()=> item.setSelected(li)}>{li}</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </>
                        }
                    </div>
                </div>
            )}
        </>
    )
}