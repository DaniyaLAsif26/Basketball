import './district.css'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export default function District({ district }) {
    return (
        <>
        {district.map((dist, index) =>
            <div className="district">
                <div className="dist-name">{dist.name}</div>
                <div className="dist-sec-name">{dist.secName}</div>
                <div className="dist-role">{dist.role}</div>
                <div className="dist-email"> <MdEmail style={{ fontSize: "1.26rem" }} /> {dist.email}</div>
                <div className="dist-no"> <FaPhoneAlt style={{ fontSize: "1rem" }} /> {dist.phone}</div>
            </div>
            )}
        </>
    )
}