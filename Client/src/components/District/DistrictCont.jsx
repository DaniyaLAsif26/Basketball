import './district.css'
import District from './District'

const districts = [
    { name: "HYDERABAD", secName: "Norman Issac", role: "The Secretary, Hyderabad District Basketball Association", email: "secretary@hdba.com", phone: "9444015256" },
    { name: "RANGA REDDY", secName: "Nayeem", role: "The Secretary, Ranga Reddy District Basketball Association", email: "secretary@hdba.com", phone: "9444015256" },
    { name: "MEDCHAL- MALKAJGIRI", secName: "Norman Issac", role: "The Secretary, Medchal Malkajgiri Basketball Association", email: "secretary@hdba.com", phone: "9444015256" },
    { name: "WARANGAL", secName: "Norman Issac", role: "The Secretary, Medchal Malkajgiri Basketball Association", email: "secretary@hdba.com", phone: "9444015256" },
    { name: "KHAMMAM", secName: "Norman Issac", role: "The Secretary, Medchal Malkajgiri Basketball Association", email: "secretary@hdba.com", phone: "9444015256" },
    { name: "MAHBUBNAGAR", secName: "Norman Issac", role: "The Secretary, Medchal Malkajgiri Basketball Association", email: "secretary@hdba.com", phone: "9444015256" },
]

export default function DistrictCont() {
    return (
        <div className="dist-cont">
            <div className="dist-cont-head news-head">
                <h1>DISTRICTS</h1>
            </div>
            <div className="dist-cont-grid">
                <District district={districts} />
            </div>
        </div>
    )
}