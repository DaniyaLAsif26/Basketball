import './options-head.css'

export default function OptionsHead({ head }) {
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
            <button>{head.btn}</button>
        </div>
    )
}