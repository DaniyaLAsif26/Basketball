import './member.css'

export default function Member({ data }) {
    return (
        <div className="other-members-cont">
            <div className="other-members">
                <div className="other-members-head">
                    <h2>OFFICE BEARERS : </h2>
                </div>
                <div className="others-cont">
                    {data.map((member, index) => (
                        <div className="member" key={index}>
                            <h3>{member.name}</h3>
                            <div className="member-role">{member.role}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}