import './options-head.css'
import { useNavigate } from 'react-router-dom'

export default function OptionsHead({ head }) {

const navigate = useNavigate()

    return (
        <div className="options-head-cont">
            <div className="options-head">
                <h2>{head.heading}</h2>
            </div>
            <form className='options-form'>
                <input
                    type="text"
                    placeholder={head.placeholder}
                    onChange={(e) => head.search(e.target.value)}
                />
            </form>
            {head.rankedOptions &&
                <div
                    className="ranked-players"
                    onClick={() => head.rankedOptions.showRanked(prev => !prev)}
                >
                    {head.rankedOptions.ranked ? "All Players" : "Ranked Players"}
                </div>
            }
            <button onClick={()=> navigate(head.url)}>{head.btn}</button>
        </div>
    )
}