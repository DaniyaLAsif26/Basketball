import './add-event-form.css';
import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
    Calendar,
    Trophy,
    IndianRupee,
    Phone,
    Mail,
    MapPin,
    Instagram,
    Image,
    FileText,
    Award,
} from 'lucide-react';

const eventSchema = z.object({

    tournamentName: z.string()
        .min(3, "Tournament Name to small")
        .max(69, "Tournament Name to big"),

    tournamentImage: z.instanceof(FileList)
        .refine(files => files?.length === 1, "Image required")
        .refine(files => files?.[0]?.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
        .refine(files => ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type), "Image must be less than 5MB"),

    type: z.string().min(1, "Type required"),
    category: z.string().min(1, "Category required"),
    level: z.string().min(1, "Level required"),
    ageCategory: z.string().min(1, "Age required"),
    format: z.string().min(1, "Format required"),
    gender: z.string().min(1, "Gender required"),

    startDate: z.string().min(1, "Start Date required"),
    endDate: z.string().min(1, "End Date required"),
    registrationDeadline: z.string().min(1, "Deadline Date required"),

    venueName: z.string()
        .min(3, "Venue name to short")
        .max(50, "Venue name to big"),
    address: z.string()
        .min(5, "Addredd name to short"),
    district: z.string()
        .min(1, "District required"),
    city: z.string()
        .min(1, "City required"),
    zipCode: z.string()
        .regex(/^\d{6}$/, "Zip Code must be 6 digits"),

    entryFee: z
        .string()
        .min(1, "Entry Fee is required")
        .refine(
            val => !isNaN(Number(val)) && Number(val) >= 0,
            "Enter a non-negative number"
        ),
    firstPrize: z.string()
        .optional()
        .refine(val => !isNaN(Number(val)) && Number(val) >= 0, "Valid Number required"),
    secondPrize: z.string()
        .optional()
        .refine(val => !isNaN(Number(val)) && Number(val) >= 0, "Valid Number required"),
    thirdPrize: z.string()
        .optional()
        .refine(val => !isNaN(Number(val)) && Number(val) >= 0, "Valid Number required"),

    phone1: z.string()
        .regex(/^[6-9]\d{9}$/, "Enter Valid Phone Number"),
    phone2: z.string()
        .regex(/^[6-9]\d{9}$/, "Enter Valid Phone Number")
        .optional()
        .or(z.literal('')),
    email: z.string()
        .email('Invalid email address')
        .toLowerCase()
        .optional()
        .or(z.literal('')),
    instagram: z.string()
        .optional(),
    instagramLink: z.string()
        .url('Invalid Url')
        .optional()
        .or(z.literal('')),

    description: z.string()
        .min(5, "Description to Short")
        .max(200, "Description to Long"),
    highlights: z.string()
        .min(1, "Highlights required")
})
    .refine(
        data => new Date(data.endDate) >= new Date(data.startDate),
        {
            message: 'End Date Invalid',
            path: ['endDate']
        }
    ).refine(
        data => new Date(data.registrationDeadline) <= new Date(data.startDate),
        {
            message: 'Registration deadline Invalid',
            path: ['registrationDeadline']
        }
    )

export default function AddEventForm() {

    const location = useLocation()
    const isAdmin = ['/admin/add-event']
    const checkAdmin = location.pathname.includes(isAdmin)

    const districts = [
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

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue
    } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            type: 'UN-OFFICIAL',
            tournamentName: '',
            category: '',
            level: '',
            ageCategory: '',
            format: '',
            gender: '',
            startDate: '',
            endDate: '',
            registrationDeadline: '',
            venueName: '',
            address: '',
            city: '',
            district: '',
            zipCode: '',
            entryFee: '',
            firstPrize: '',
            secondPrize: '',
            thirdPrize: '',
            phone1: '',
            phone2: '',
            email: '',
            instagram: '',
            instagramLink: '',
            description: '',
            highlights: '',
        }
    });

    // Watch form values for draft saving
    const formValues = watch();

    useEffect(() => {
        const draft = sessionStorage.getItem('tournamentDraft')
        if (draft) {
            const parseDraft = JSON.parse(draft)
            Object.keys(parseDraft).forEach(key => {
                if (key !== "tournamentImage") {
                    setValue(key, parseDraft[key])
                }
            })
        }
    }, [setValue])



    useEffect(() => {
        const timeOutId = setTimeout(() => {
            const { tournamentImage, ...draftData } = formValues
            sessionStorage.setItem('tournamentDraft', JSON.stringify(draftData))
        }, 500)

        return () => clearTimeout(timeOutId)
    }, [formValues])

    const onSubmit = (data) => {
        // Prepare data for MongoDB
        const eventData = {
            ...data,
            tournamentImage: data.tournamentImage[0],
            highlightsList: data.highlights.split('\n').filter(h => h.trim()),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        console.log('Event Data to send to MongoDB:', eventData);

        alert('Form submitted! Check console for data structure.');
    };

    const handleClear = (e) => {
        e.preventDefault()

        sessionStorage.removeItem('tournamentDraft');
        reset()
    }

    const ErrorMessage = ({ error }) => {
        if (!error) return null;
        return <span className="error-message">{error.message}</span>;
    };

    return (
        <div className="form-wrapper">
            <div className="form-container">
                <div className="form-header">
                    <h1 className="form-title">Create Basketball Event</h1>
                    <p className="form-subtitle">Fill in the details to create a new tournament</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="event-form">
                    {/* Basic Information Section */}
                    <div className="form-section">
                        <div className="section-header">
                            <Trophy className="section-icon" />
                            <h2 className="section-heading">Basic Information</h2>
                        </div>

                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label className="form-label">Tournament Name *</label>
                                <input
                                    type="text"
                                    {...register('tournamentName')}
                                    className={`form-input ${errors.tournamentName ? 'error' : ''}`}
                                    placeholder="National Basketball Championship 2024"
                                />
                                <ErrorMessage error={errors.tournamentName} />
                            </div>

                            <div className="form-group full-width">
                                <label className="form-label">
                                    <Image className="label-icon" />
                                    Tournament Image *
                                </label>
                                <input
                                    type="file"
                                    {...register('tournamentImage')}
                                    accept="image/png, image/jpeg, image/jpg"
                                    className={`form-input ${errors.tournamentImage ? 'error' : ''}`}
                                />
                                <ErrorMessage error={errors.tournamentImage} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Type *</label>
                                <select
                                    {...register('type')}
                                    className={`form-select ${errors.type ? 'error' : ''}`}
                                >
                                    <option value="UN-OFFICIAL">UN-OFFICIAL</option>
                                    {checkAdmin && <option value="OFFICIAL">OFFICIAL</option>}
                                </select>
                                <ErrorMessage error={errors.type} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Category *</label>
                                <select
                                    {...register('category')}
                                    className={`form-select ${errors.category ? 'error' : ''}`}
                                >
                                    <option value="">Select Category</option>
                                    <option value="MEN">MEN</option>
                                    <option value="WOMEN">WOMEN</option>
                                </select>
                                <ErrorMessage error={errors.category} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Level *</label>
                                <select
                                    {...register('level')}
                                    className={`form-select ${errors.level ? 'error' : ''}`}
                                >
                                    <option value="">Select Level</option>
                                    <option value="OPEN">OPEN</option>
                                    <option value="UNIVERSITY">UNIVERSITY</option>
                                    <option value="CLUB">CLUB</option>
                                    <option value="COLLEGE">COLLEGE</option>
                                    <option value="SCHOOL">SCHOOL</option>
                                    <option value="CORPORATE">CORPORATE</option>
                                    <option value="DEPARTMENT">DEPARTMENT</option>
                                </select>
                                <ErrorMessage error={errors.level} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Age-Group *</label>
                                <select
                                    {...register('ageCategory')}
                                    className={`form-select ${errors.ageCategory ? 'error' : ''}`}
                                >
                                    <option value="">Select Age</option>
                                    <option value="OPEN">OPEN</option>
                                    <option value="U-23">U-23</option>
                                    <option value="U-21">U-21</option>
                                    <option value="U-19">U-19</option>
                                    <option value="U-18">U-18</option>
                                    <option value="U-17">U-17</option>
                                    <option value="U-16">U-16</option>
                                    <option value="U-15">U-15</option>
                                    <option value="U-14">U-14</option>
                                    <option value="U-13">U-13</option>
                                    <option value="U-12">U-12</option>
                                    <option value="U-11">U-11</option>
                                    <option value="U-10">U-10</option>
                                </select>
                                <ErrorMessage error={errors.ageCategory} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Format *</label>
                                <select
                                    {...register('format')}
                                    className={`form-select ${errors.format ? 'error' : ''}`}
                                >
                                    <option value="">Select Format</option>
                                    <option value="5X5">5X5</option>
                                    <option value="3X3">3X3</option>
                                </select>
                                <ErrorMessage error={errors.format} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Gender *</label>
                                <select
                                    {...register('gender')}
                                    className={`form-select ${errors.gender ? 'error' : ''}`}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="mens">MEN'S</option>
                                    <option value="womens">WOMEN'S</option>
                                    <option value="mixed">MIXED</option>
                                </select>
                                <ErrorMessage error={errors.gender} />
                            </div>
                        </div>
                    </div>

                    {/* Date and Time Section */}
                    <div className="form-section">
                        <div className="section-header">
                            <Calendar className="section-icon" />
                            <h2 className="section-heading">Date & Time</h2>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Start Date *</label>
                                <input
                                    type="date"
                                    {...register('startDate')}
                                    className={`form-input ${errors.startDate ? 'error' : ''}`}
                                />
                                <ErrorMessage error={errors.startDate} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">End Date *</label>
                                <input
                                    type="date"
                                    {...register('endDate')}
                                    className={`form-input ${errors.endDate ? 'error' : ''}`}
                                />
                                <ErrorMessage error={errors.endDate} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Registration Deadline *</label>
                                <input
                                    type="date"
                                    {...register('registrationDeadline')}
                                    className={`form-input ${errors.registrationDeadline ? 'error' : ''}`}
                                />
                                <ErrorMessage error={errors.registrationDeadline} />
                            </div>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className="form-section">
                        <div className="section-header">
                            <MapPin className="section-icon" />
                            <h2 className="section-heading">Location</h2>
                        </div>

                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label className="form-label">Venue Name *</label>
                                <input
                                    type="text"
                                    {...register('venueName')}
                                    className={`form-input ${errors.venueName ? 'error' : ''}`}
                                    placeholder="YMCA Secundrabad"
                                />
                                <ErrorMessage error={errors.venueName} />
                            </div>

                            <div className="form-group full-width">
                                <label className="form-label">Address *</label>
                                <input
                                    type="text"
                                    {...register('address')}
                                    className={`form-input ${errors.address ? 'error' : ''}`}
                                    placeholder="Sardar Patel Road"
                                />
                                <ErrorMessage error={errors.address} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">City *</label>
                                <input
                                    type="text"
                                    {...register('city')}
                                    className={`form-input ${errors.city ? 'error' : ''}`}
                                    placeholder="Warangal"
                                />
                                <ErrorMessage error={errors.city} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">District *</label>
                                <select
                                    {...register('district')}
                                    className={`form-select ${errors.district ? 'error' : ''}`}
                                >
                                    <option value="">Select District</option>
                                    {districts.map((district, key) => (
                                        <option key={key} value={district}>{district}</option>
                                    ))}
                                </select>
                                <ErrorMessage error={errors.district} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">ZIP/Postal Code *</label>
                                <input
                                    type="text"
                                    {...register('zipCode')}
                                    className={`form-input ${errors.zipCode ? 'error' : ''}`}
                                    placeholder="500002"
                                />
                                <ErrorMessage error={errors.zipCode} />
                            </div>
                        </div>
                    </div>

                    {/* Entry Fee and Prizes Section */}
                    <div className="form-section">
                        <div className="section-header">
                            <IndianRupee className="section-icon" />
                            <h2 className="section-heading">Entry Fee & Prizes</h2>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Entry Fee (per team)</label>
                                <input
                                    type="number"
                                    {...register('entryFee')}
                                    className={`form-input ${errors.entryFee ? 'error' : ''}`}
                                    placeholder="250"
                                />
                                <ErrorMessage error={errors.entryFee} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <Award className="label-icon" />
                                    1st Place Prize
                                </label>
                                <input
                                    type="number"
                                    {...register('firstPrize')}
                                    className={`form-input ${errors.firstPrize ? 'error' : ''}`}
                                    placeholder="5000"
                                />
                                <ErrorMessage error={errors.firstPrize} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">2nd Place Prize</label>
                                <input
                                    type="number"
                                    {...register('secondPrize')}
                                    className={`form-input ${errors.secondPrize ? 'error' : ''}`}
                                    placeholder="2500"
                                />
                                <ErrorMessage error={errors.secondPrize} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">3rd Place Prize</label>
                                <input
                                    type="number"
                                    {...register('thirdPrize')}
                                    className={`form-input ${errors.thirdPrize ? 'error' : ''}`}
                                    placeholder="1000"
                                />
                                <ErrorMessage error={errors.thirdPrize} />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="form-section">
                        <div className="section-header">
                            <Phone className="section-icon" />
                            <h2 className="section-heading">Contact Information</h2>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">
                                    <Phone className="label-icon" />
                                    Phone Number 1 *
                                </label>
                                <input
                                    type="tel"
                                    {...register('phone1')}
                                    className={`form-input ${errors.phone1 ? 'error' : ''}`}
                                    placeholder="9988776655"
                                />
                                <ErrorMessage error={errors.phone1} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <Phone className="label-icon" />
                                    Phone Number 2
                                </label>
                                <input
                                    type="tel"
                                    {...register('phone2')}
                                    className={`form-input ${errors.phone2 ? 'error' : ''}`}
                                    placeholder="9988776655"
                                />
                                <ErrorMessage error={errors.phone2} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <Mail className="label-icon" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    {...register('email')}
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    placeholder="abcd@gmail.com"
                                />
                                <ErrorMessage error={errors.email} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <Instagram className="label-icon" />
                                    Instagram Handle
                                </label>
                                <input
                                    type="text"
                                    {...register('instagram')}
                                    className={`form-input ${errors.instagram ? 'error' : ''}`}
                                    placeholder="@tournament2024"
                                />
                                <ErrorMessage error={errors.instagram} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <Instagram className="label-icon" />
                                    Instagram Handle Link
                                </label>
                                <input
                                    type="url"
                                    {...register('instagramLink')}
                                    className={`form-input ${errors.instagramLink ? 'error' : ''}`}
                                    placeholder="https://instagram.com/tournament2024"
                                />
                                <ErrorMessage error={errors.instagramLink} />
                            </div>
                        </div>
                    </div>

                    {/* Tournament Details Section */}
                    <div className="form-section">
                        <div className="section-header">
                            <FileText className="section-icon" />
                            <h2 className="section-heading">Tournament Details</h2>
                        </div>

                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label className="form-label">Description *</label>
                                <textarea
                                    {...register('description')}
                                    className={`form-textarea ${errors.description ? 'error' : ''}`}
                                    rows="4"
                                    placeholder="Enter a detailed description of the tournament..."
                                />
                                <ErrorMessage error={errors.description} />
                            </div>

                            <div className="form-group full-width">
                                <label className="form-label">
                                    Highlights *
                                    <span className="label-hint">(One per line)</span>
                                </label>
                                <textarea
                                    {...register('highlights')}
                                    className={`form-textarea ${errors.highlights ? 'error' : ''}`}
                                    rows="6"
                                    placeholder="Professional referees and scoring system
Live streaming of all matches
Prize money for top 3 teams"
                                />
                                <ErrorMessage error={errors.highlights} />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-actions">
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Tournament'}
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleClear}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}