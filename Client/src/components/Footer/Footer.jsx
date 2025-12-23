import './footer.css'
import logo from '../../assets/red.png'
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import { useNavigate } from 'react-router-dom';

export default function Footer() {


    
    return (
        <footer>
            <div className="footer">
                <div className="fot-basic-cont">
                    <div className="fot-basic">
                        <img src={logo} alt="" />
                        <div className="socials">
                            <FaInstagram style={{ fontWeight: 'bolder', fontSize: '2.2rem' }} />
                            <FaYoutube style={{ fontWeight: 'bolder', fontSize: '2.26rem' }} />
                            <FaFacebookSquare style={{ fontWeight: 'bolder', fontSize: '2rem' }} />
                            <FaSquareXTwitter style={{ fontWeight: 'bolder', fontSize: '2rem' }} />
                        </div>
                    </div>
                    <div className="copyright">
                        <p>© 2025 Telangana Basketball Association. </p>
                        <p>All rights reserved.</p>
                    </div>
                </div>
                <div className="fot-left">
                    <ul>
                        <li>EVENTS</li>
                        <li>NEWS</li>
                        <li>RANKING</li>
                        <li>DISTRICTS</li>
                    </ul>
                </div>
                <div className="fot-center">
                    <ul>
                        <li>ABOUT US</li>
                        <li>GALLERY</li>
                        <li>EMPLOYMENT</li>
                        <li>CONTACT US</li>
                    </ul>
                </div>
                <div className="fot-right">
                    <button>log In</button>
                  <ul>
                        <li><a href="/admin">ADMIN</a></li>   
                    </ul>
                </div>
            </div>
            <div className="develop">
                <p>Developed by <a href="">Daniyal Asif</a></p>
            </div>
        </footer>
    )
}