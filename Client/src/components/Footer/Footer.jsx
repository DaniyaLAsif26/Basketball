import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Linkedin,
    Trophy,
    ChevronRight
} from 'lucide-react';
import './footer.css';

import whiteLogo from '../../assets/white.png';

import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../context/LoginContext';

export default function Footer() {

    const navigate = useNavigate()

    const { isAdminLoggedIn } = useLogin()

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Tournaments', path: '/events' },
        { name: 'Rankings', path: '/rankings' },
        { name: 'News', path: '/news' }
    ];

    const resources = [
        { name: 'Player Registration', path: '/login' },
        { name: 'Host Event', path: '/add-event' },
        { name: 'Districts', path: '/districts' },
        { name: 'Working of Rankings', path: '/training' },
    ];

    const socialLinks = [
        { icon: Instagram, name: 'Instagram', url: 'https://www.instagram.com/telanganabasketball/?hl=en' },
        { icon: Youtube, name: 'Youtube', url: 'https://www.youtube.com/@TelanganaBasketballAssociation' },
        { icon: Facebook, name: 'Facebook', url: 'https://www.facebook.com/share/g/16fKBj8VhC/  ' },
        { icon: Twitter, name: 'Twitter', url: 'https://twitter.com' },
        { icon: Linkedin, name: 'LinkedIn', url: 'https://linkedin.com' }
    ];


    const navigateAdmin = async () => {
        if(isAdminLoggedIn){
            navigate('/admin')
        }
        else{
            navigate('/admin/login')
        }
    }

    return (
        <footer className="footer">

            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-grid">

                        {/* Brand Column */}
                        <div className="footer-column brand">
                            <div className="footer-logo">
                                <img src={whiteLogo} className="logo-icon" />
                                <span className="logo-text">Telangana Basketball Association</span>
                            </div>
                            <p className="brand-description">
                                Building the future of basketball in Telangana through excellence, integrity, and community.
                                Join thousands of players in the most competitive basketball platform.
                            </p>
                            <div className="social-links">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        className="social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                    >
                                        <social.icon className="social-icon" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Quick Links</h4>
                            <ul className="footer-links">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.path} className="footer-link">
                                            <ChevronRight className="link-icon" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Player Links</h4>
                            <ul className="footer-links">
                                {resources.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.path} className="footer-link">
                                            <ChevronRight className="link-icon" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <div className="footer-link" onClick={navigateAdmin}>
                                        <ChevronRight className="link-icon" />
                                        Admin
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Contact Us</h4>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <MapPin className="contact-icon" />
                                    <div className="contact-text">
                                        <p>Telangana Olympic Association</p>
                                        <p>Sports Authority of Telangana</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <Phone className="contact-icon" />
                                    <div className="contact-text">
                                        <a href="tel:+15551234567">+91 9966807432</a>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <Mail className="contact-icon" />
                                    <div className="contact-text">
                                        <a href="mailto:info@basketball.com">telanganabasketballassociation@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <div className="footer-bottom-content">
                        <div className="copyright">
                            <p>&copy; 2026 Telangana Basketball Association. All rights reserved.</p>
                        </div>
                        <div className="developer-links">
                            Developed by <a
                                href="https://www.linkedin.com/in/daniyal-a-693491185/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <b>Daniyal Asif</b>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
}