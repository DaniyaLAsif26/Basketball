import './social-media.css'

import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function SocialMedia() {
    return (
        <div className="social-media-cont">
            <ul>
                <li class="like">
                    <a href="#">
                        <FaInstagram />
                        <span>INSTAGRAM</span>
                    </a>
                </li>
                <li class="comments">
                    <a href="#">
                        <FaYoutube/>
                        <span>YOUTUBE</span>
                    </a>
                </li>
                <li class="share">
                    <a href="#">
                       <FaFacebookSquare/>
                        <span>FACEBOOK</span>
                    </a>
                </li>
                <li class="subscribe">
                    <a href="#">
                        <FaSquareXTwitter/>
                        <span>X</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}