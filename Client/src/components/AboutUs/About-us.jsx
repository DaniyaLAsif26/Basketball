import {
    Award,
    Target,
    Users,
    Heart,
    TrendingUp,
    Shield,
    Quote
} from 'lucide-react';
import './about-us.css';
import { useNavigate } from 'react-router-dom'

import Member from './member'

import president from '../../assets/Sridhar.jpg'
import secratory from '../../assets/prudhvi.jpg'

const members = [
    { name: "Maqsood Bin Ahmed Zakir", role: "Chairman" },
    { name: "Mohd. Abdul Hafeez khan", role: "Vice President" },
    { name: "Vijaya Saradhi", role: "Vice President" },
    { name: "Dr. Veno Gopal Reddy", role: "Vice President" },
    { name: "U. Chandra Mohan Goud", role: "Vice President" },
    { name: "N. Chandrashekar", role: "Treasurer" },
    { name: "Mohammed Samiuddin", role: "Joint Secretary" },
    { name: "A. Vishnu Kumar Goud", role: "Joint Secretary" },
    { name: "Sukumar Francis", role: "Associate Secretary" },
    { name: "Hyder Mohammed", role: "Associate Secretary" },
    { name: "Prem Kumar Yadav", role: "Head, Technical committee" },
]

export default function AboutU() {

    const navigate = useNavigate()

    const values = [
        {
            icon: Award,
            title: "Excellence",
            description: "Committed to delivering the highest standards in basketball competition and development."
        },
        {
            icon: Heart,
            title: "Integrity",
            description: "Upholding fair play, transparency, and ethical conduct in all our operations."
        },
        {
            icon: Users,
            title: "Community",
            description: "Building strong connections among players, coaches, and basketball enthusiasts."
        },
        {
            icon: TrendingUp,
            title: "Growth",
            description: "Fostering continuous improvement and development at every level of the sport."
        }
    ];

    return (
        <div className="about-page">

            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80"
                        alt="About Us"
                        className="about-hero-image"
                    />
                    <div className="about-hero-overlay"></div>
                </div>

                <div className="about-hero-content">
                    <span className="about-badge">About Us</span>
                    <h1 className="about-hero-title">
                        Building the Future of
                        <span className="title-accent"> Basketball</span>
                    </h1>
                    <p className="about-hero-description">
                        A premier basketball organization dedicated to fostering talent,
                        promoting sportsmanship, and creating opportunities for players across the nation.
                    </p>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="intro-section">
                <div className="section-container">
                    <div className="intro-content">
                        <div className="intro-text">
                            <span className="section-tag">Our Story</span>
                            <h2 className="section-title">Who We Are</h2>
                            <p className="intro-paragraph">
                                Founded with a vision to revolutionize basketball in our region, we have grown
                                from a small local initiative to a comprehensive basketball ecosystem that serves
                                thousands of players, coaches, and fans across 48 districts.
                            </p>
                            <p className="intro-paragraph">
                                Our organization is built on the foundation of passion, dedication, and an
                                unwavering commitment to the sport. We believe basketball is more than just a
                                game—it's a platform for personal growth, teamwork, and community building.
                            </p>
                            <p className="intro-paragraph">
                                Through professionally organized tournaments, comprehensive training programs,
                                and a robust support system, we provide players of all levels with the opportunity
                                to showcase their skills, develop their talent, and pursue their basketball dreams.
                            </p>
                        </div>

                        <div className="intro-stats">
                            <div className="intro-stat-card">
                                <div className="stat-number">500+</div>
                                <div className="stat-label">Active Players</div>
                            </div>
                            <div className="intro-stat-card">
                                <div className="stat-number">50+</div>
                                <div className="stat-label">Tournaments</div>
                            </div>
                            <div className="intro-stat-card">
                                <div className="stat-number">33</div>
                                <div className="stat-label">Districts</div>
                            </div>
                            <div className="intro-stat-card">
                                <div className="stat-number">100+</div>
                                <div className="stat-label">Certified Referees</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="section-container">
                    <div className="values-header">
                        <span className="section-tag">Our Values</span>
                        <h2 className="section-title">What Drives Us</h2>
                        <p className="section-subtitle">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card">
                                <div className="value-icon">
                                    <value.icon className="icon" />
                                </div>
                                <h3 className="value-title">{value.title}</h3>
                                <p className="value-description">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* President's Message */}
            <section className="message-section president">
                <div className="section-container">
                    <div className="message-container">
                        <div className="message-image">
                            <div className="image-wrapper">
                                <img
                                    src={president}
                                    alt="President"
                                    className="profile-image"
                                />
                                <div className="image-badge">
                                    <Shield className="badge-icon" />
                                    <span>President</span>
                                </div>
                            </div>
                        </div>

                        <div className="message-content">
                            <Quote className="quote-icon" />
                            <h2 className="message-title">President's Message</h2>
                            <h3 className="message-author">Sridhar Reddy</h3>
                            <p className="message-role">President, Telangana Basketball Association</p>

                            <div className="message-text">
                                <p>
                                    It is with immense pride and enthusiasm that I welcome you to our basketball
                                    community. Over the years, we have witnessed remarkable growth—not just in
                                    numbers, but in the quality of talent, the spirit of competition, and the
                                    bonds formed through this beautiful sport.
                                </p>
                                <p>
                                    Our mission has always been clear: to create an environment where every player,
                                    regardless of their background or skill level, has the opportunity to excel.
                                    We are committed to maintaining the highest standards of professionalism,
                                    fairness, and integrity in all our endeavors.
                                </p>
                                <p>
                                    As we look to the future, I am excited about the new programs we are launching,
                                    the partnerships we are forging, and the endless possibilities that lie ahead.
                                    Together, we are not just building basketball players—we are shaping future
                                    leaders, champions, and role models.
                                </p>
                                <p>
                                    Thank you for being a part of this incredible journey. Let's continue to push
                                    boundaries, break records, and most importantly, inspire the next generation
                                    of basketball enthusiasts.
                                </p>
                            </div>

                            <div className="message-signature">
                                <div className="signature-line">Sridhar Reddy</div>
                                <div className="signature-title">President</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Secretary's Message */}
            <section className="message-section secretary">
                <div className="section-container">
                    <div className="message-container reverse">
                        <div className="message-image">
                            <div className="image-wrapper">
                                <img
                                    src={secratory}
                                    alt="Secretary"
                                    className="profile-image"
                                />
                                <div className="image-badge">
                                    <Target className="badge-icon" />
                                    <span>Secretary</span>
                                </div>
                            </div>
                        </div>

                        <div className="message-content">
                            <Quote className="quote-icon" />
                            <h2 className="message-title">Secretary's Message</h2>
                            <h3 className="message-author">Prudhvi Reddy</h3>
                            <p className="message-role">General Secretary, Telangana Basketball Association</p>

                            <div className="message-text">
                                <p>
                                    Welcome to our basketball family! As the General Secretary, I am honored to
                                    work alongside an incredible team of dedicated individuals who share a common
                                    passion for basketball and community development.
                                </p>
                                <p>
                                    Behind every successful tournament, every seamless registration process, and
                                    every well-organized event, there is a commitment to excellence that defines
                                    our organization. We take pride in our operational efficiency, transparent
                                    governance, and unwavering focus on participant satisfaction.
                                </p>
                                <p>
                                    Our administrative framework is designed to support players, coaches, and
                                    officials at every step. From tournament registration to certification programs,
                                    from dispute resolution to player welfare initiatives—we ensure that every
                                    aspect of our operations reflects our core values of integrity and service.
                                </p>
                                <p>
                                    I encourage all members to actively engage with our programs, provide feedback,
                                    and help us continue improving. Your voice matters, and together, we can build
                                    an organization that truly serves the basketball community's needs.
                                </p>
                            </div>

                            <div className="message-signature">
                                <div className="signature-line">Prudhvi Reddy</div>
                                <div className="signature-title">General Secretary</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="other-member-section">
                <div className="other-member-container">
                    <Member data={members} />
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <div className="section-container">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to Join Us?</h2>
                        <p className="cta-description">
                            Be part of a thriving basketball community and take your game to the next level
                        </p>
                        <div className="cta-buttons">
                            <button className="cta-btn primary" onClick={() => navigate('/login')}>
                                Register Now
                            </button>
                            <button className="cta-btn secondary">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}