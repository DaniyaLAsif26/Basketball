import './add-event-form.css'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import { IoMdArrowRoundBack } from "react-icons/io";

export default function AddEventForm() {

    const location = useLocation()
    const admin = ['/admin/add-event']
    const checkAdmin = location.pathname.includes(admin)

    const [formData, setFormData] = useState({
        type: '',
        title: '',
        format: '',
        category: '',
        ageGroup: '',
        level: '',
        district: '',
        entryFee: '',
        location: '',
        locationLink: '',
        contactName: '',
        contactPhone1: '',
        contactPhone2: '',
        contactEmail: '',
        instagram: '',
        instagramLink: '',
        additionalDetails: ''
    });

    const telanganaDistricts = [
        "Hyderabad",
        "Ranga Reddy",
        "Medchal–Malkajgiri",
        "Adilabad",
        "Bhadradri Kothagudem",
        "Hanumakonda",
        "Jagtial",
        "Jangaon",
        "Jayashankar Bhupalpally",
        "Jogulamba Gadwal",
        "Kamareddy",
        "Karimnagar",
        "Khammam",
        "Kumuram Bheem Asifabad",
        "Mahabubabad",
        "Mahabubnagar",
        "Mancherial",
        "Medak",
        "Mulugu",
        "Nagarkurnool",
        "Nalgonda",
        "Narayanpet",
        "Nirmal",
        "Nizamabad",
        "Peddapalli",
        "Rajanna Sircilla",
        "Sangareddy",
        "Siddipet",
        "Suryapet",
        "Vikarabad",
        "Wanaparthy",
        "Warangal",
        "Yadadri Bhuvanagiri"
    ]

    const [isDraftLoaded, setIsDraftLoaded] = useState(false);

    useEffect(() => {
        const draft = sessionStorage.getItem('tournamentDraft');
        if (draft) {
            setFormData(JSON.parse(draft));
        }
        setIsDraftLoaded(true);
    }, []);

    useEffect(() => {
        if (isDraftLoaded) {
            sessionStorage.setItem(
                'tournamentDraft',
                JSON.stringify(formData)
            );
        }
    }, [formData, isDraftLoaded]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add timestamp and ID
        const tournament = {
            ...formData,
            id: Date.now(),
            createdAt: new Date().toISOString()
        };

        // Clear draft
        sessionStorage.removeItem('tournamentDraft');

        // Reset form
        setFormData({
            type: '',
            title: '',
            format: '',
            category: '',
            ageGroup: '',
            level: '',
            district: '',
            entryFee: '',
            location: '',
            locationLink: '',
            contactName: '',
            contactPhone1: '',
            contactPhone2: '',
            contactEmail: '',
            instagram: '',
            instagramLink: '',
            additionalDetails: ''
        });

        alert('Tournament registered successfully!');

        console.log(tournament)
    };

    const handleClearDraft = () => {
        sessionStorage.removeItem('tournamentDraft');
        setFormData({
            type: '',
            title: '',
            format: '',
            category: '',
            ageGroup: '',
            level: '',
            district: '',
            entryFee: '',
            location: '',
            locationLink: '',
            contactName: '',
            contactPhone1: '',
            contactPhone2: '',
            contactEmail: '',
            instagram: '',
            instagramLink: '',
            additionalDetails: ''
        });
    };

    return (
        <div className='form-container'>
            <div className="form-wrapper">
                <div className="form-header">
                    {checkAdmin ?
                        <a href="/admin"><IoMdArrowRoundBack /></a>
                        :
                        <a href="/events"><IoMdArrowRoundBack /></a>

                    }
                    <h1 className="form-title">Host a Basketball Tournament</h1>
                </div>

                <div className="form-content">
                    {checkAdmin &&
                        <div className="form-row">
                            <label className="form-label">Tournament type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="form-select"
                            >
                                <option value="">Select Type</option>
                                <option value="un-official">Un-Official</option>
                                <option value="official">Official</option>
                            </select>
                        </div>
                    }
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Tournament Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="Enter tournament name"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                name="image"
                                accept='image/png, image/jpeg, image/jpg'
                                required
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Format *</label>
                            <select
                                name="format"
                                value={formData.format}
                                onChange={handleChange}
                                required
                                className="form-select"
                            >
                                <option value="">Select format</option>
                                <option value="3X3">3X3</option>
                                <option value="5X5">5X5</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category *</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="form-select"
                            >
                                <option value="">Select category</option>
                                <option value="mens">Men's</option>
                                <option value="womens">Women's</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Age Group *</label>
                            <select
                                name="ageGroup"
                                value={formData.ageGroup}
                                onChange={handleChange}
                                required
                                className="form-select"
                            >
                                <option value="">Select age group</option>
                                <option value="open">Open</option>
                                <option value="u23">U23</option>
                                <option value="u21">U21</option>
                                <option value="u19">U19</option>
                                <option value="u17">U17</option>
                                <option value="u15">U15</option>
                                <option value="u13">U13</option>
                                <option value="u11">U11</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Level *</label>
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                required
                                className="form-select"
                            >
                                <option value="">Select level</option>
                                <option value="open">Open</option>
                                <option value="school">School</option>
                                <option value="college">College</option>
                                <option value="university">University</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">District *</label>
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                required
                                className="form-select"
                            >
                                <option value="">Select district</option>
                                {telanganaDistricts.map(district => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Entry Fee (₹) *</label>
                            <input
                                type="text"
                                name="entryFee"
                                value={formData.entryFee}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="Amount"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Tournament Location *</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="Venue address"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Location Link</label>
                            <input
                                type="text"
                                name="locationLink"
                                value={formData.locationLink}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="Maps Link"
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">Contact Information</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Contact Name *</label>
                                <input
                                    type="text"
                                    name="contactName"
                                    value={formData.contactName}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone Number 1     *</label>
                                <input
                                    type="tel"
                                    name="contactPhone1"
                                    value={formData.contactPhone1}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Contact number"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Phone Number 2</label>
                                <input
                                    type="tel"
                                    name="contactPhone2"
                                    value={formData.contactPhone2}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Contact number"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email </label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Email address"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Instagram Page</label>
                            <input
                                type="text"
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="@your_tournament_page"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Instagram Page Link</label>
                            <input
                                type="text"
                                name="instagramLink"
                                value={formData.instagramLink}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="@your_tournament_page"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Additional Details</label>
                        <textarea
                            name="additionalDetails"
                            value={formData.additionalDetails}
                            onChange={handleChange}
                            rows="4"
                            className="form-textarea"
                            placeholder="Any additional information..."
                        />
                    </div>

                    <div className="button-group">
                        <button onClick={handleSubmit} className="form-button primary">
                            Register Tournament
                        </button>
                        <button onClick={handleClearDraft} className="form-button secondary">
                            Clear Draft
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}