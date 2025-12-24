import './admin-options.css'

export default function AdminOption({ options, selectedOption, setOption }) {
    return (
        <div className="admin-options">
            {options.map((opt, index) => (
                <div
                    className={`admin-opt ${selectedOption === opt.option ? 'selectedOpt' : ''}`}
                    onClick={() => setOption(opt.option)}
                >
                    {opt.img} {opt.option}
                </div>
            ))}
        </div>
    )
}