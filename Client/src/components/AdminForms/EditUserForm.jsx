import './admin-user-form.css'
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const userSchema = z.object({
    email: z.string()
        .min(3, "Email Required")
        .max(100, "Email to big"),

    gender: z.string()
        .min(1, "Gender Required"),

    firstName: z.string()
        .min(3, "First Name to Small")
        .max(50, "First Name to big"),

    lastName: z.string()
        .min(2, "Last Name to Small")
        .max(50, "First Name to big"),

    profilePicture: z.instanceof(FileList)
        .optional()
        .refine(files => !files || files.length === 0 || files.length === 1, "Upload only 1 image")
        .refine(files => !files || files.length === 0 || files[0].size <= 5 * 1024 * 1024, "Image must be less than 5MB")
        .refine(files => !files || files.length === 0 || ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type), "Image must be less than 5MB"),

    phoneNumber: z.string()
        .min(10, "Number must have 10 digits")
        .max(10, "Number must have 10 digits")
        .regex(/^[6-9]\d{9}$/, "Enter Valid Phone Number"),

    homeTown: z.string()
        .min(5, "Home town to short"),

    dateOfBirth: z.string()
        .min(1, 'Date of Birth required'),

    height: z.string()
        .min(1, "Enter Valid Height"),

    weight: z.string()
        .min(1, "Enter Valid Weight"),

    wingspan: z.string()
        .min(1, "Enter Valid wingspan"),

    playerPosition: z.string()
        .min(1, "Player Position required"),

    verified: z.coerce.boolean().default(false),

    uniqueId: z.string().optional(),

    currentRanking: z.coerce.number().optional(),

    rankingPoints: z.coerce.number().optional(),

    tournamentsParticipated: z.string().optional()

})
    .refine(
        data => {
            const dob = new Date(data.dateOfBirth);
            const today = new Date();

            const minAgeDate = new Date(
                today.getFullYear() - 10,
                today.getMonth(),
                today.getDate()
            );

            return dob <= minAgeDate;
        },
        {
            message: "User must be at least 10 years old",
            path: ["dateOfBirth"],
        }
    )

export default function UserForm() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [existingImage, setExistingImage] = useState(null)

    // Tournament states
    const [tournaments, setTournaments] = useState({});
    const [tournamentYear, setTournamentYear] = useState('');
    const [tournamentName, setTournamentName] = useState('');

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const initialFormValues = (data) => {
        if (!data) return;

        return {
            uniqueId: data?.uniqueId || '-',
            gender: data?.gender || '-',
            email: data?.email || '-',
            firstName: data?.firstName || '-',
            lastName: data?.lastName || '-',
            verified: Boolean(user?.verified),
            phoneNumber: data?.phoneNumber || '-',
            homeTown: data?.homeTown || '-',
            dateOfBirth: formatDate(data?.dateOfBirth) || '-',
            height: data?.height || '-',
            weight: data?.weight || '-',
            wingspan: data?.wingspan || '-',
            playerPosition: data?.playerPosition || '-',
            tournamentParticipated: data?.tournamentParticipated || '-',
            currentRanking: data?.ranking.currentRanking || '-',
            rankingPoints: data?.ranking.rankingPoints || '-',
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        reset,
        watch,
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            verified: false
        }
    })

    useEffect(() => {
        const getUser = async () => {
            try {

                const res = await fetch(`${BackEndRoute}/api/user/${id}`, {
                    method: "GET",
                    credentials: "include",
                })

                const dataRes = await res.json()

                if (dataRes.success === false) {
                    alert(dataRes.message)
                    setUser(null)
                    return
                }

                setUser(dataRes.user)
                return
            }
            catch (err) {
                setUser(null)
                console.log(err)
                alert(err.message)
            }

        }
        getUser()
    }, [id])

    const formValues = watch()

    useEffect(() => {

        if (!user) return;

        if (user.profilePicture) {
            setExistingImage(user.profilePicture)
        }

        reset({
            uniqueId: user.uniqueId ?? "",
            email: user.email ?? "",
            gender: user.gender ?? "",
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            phoneNumber: user.phoneNumber ?? "",
            homeTown: user.homeTown ?? "",
            dateOfBirth: formatDate(user.dateOfBirth),
            height: user.height ?? "",
            weight: user.weight ?? "",
            wingspan: user.wingspan ?? "",
            playerPosition: user.playerPosition ?? "",
            verified: Boolean(user.verified),
            currentRanking: user.ranking.currentRanking ?? "",
            rankingPoints: user.ranking.rankingPoints ?? "",
            tournamentParticipated: user.tournamentParticipated ?? "",
        });
    }, [user, reset])

    // Load tournaments from user data
    useEffect(() => {
        if (!user) return;

        if (user.tournamentsParticipated) {
            const tournamentsObj = {};

            if (typeof user.tournamentsParticipated === 'object') {
                Object.assign(tournamentsObj, user.tournamentsParticipated);
            }

            setTournaments(tournamentsObj);
        }
    }, [user]);

    // Add tournament handler
    const handleAddTournament = () => {
        if (!tournamentYear.trim() || !tournamentName.trim()) {
            alert('Please enter both year and tournament name');
            return;
        }

        if (!/^\d{4}$/.test(tournamentYear)) {
            alert('Please enter a valid 4-digit year');
            return;
        }

        setTournaments(prev => ({
            ...prev,
            [tournamentYear]: [...(prev[tournamentYear] || []), tournamentName]
        }));

        setTournamentYear('');
        setTournamentName('');
    };

    // Remove tournament handler
    const handleRemoveTournament = (year, index) => {
        setTournaments(prev => {
            const updated = { ...prev };
            updated[year] = updated[year].filter((_, i) => i !== index);

            if (updated[year].length === 0) {
                delete updated[year];
            }

            return updated;
        });
    };

    const editUser = async (data) => {
        try {
            const formData = new FormData()

            const EXCLUDED_FIELDS = ['email', 'uniqueId'];

            Object.entries(data).forEach(([key, value]) => {

                if (EXCLUDED_FIELDS.includes(key)) return;

                if (key === 'profilePicture') {
                    if (value && value.length > 0) {
                        formData.append('profilePicture', value[0])
                    }
                }
                else if (value !== undefined && value !== '') {
                    formData.append(key, value)
                }
            })

            // Add tournaments
            formData.append('tournamentsParticipated', JSON.stringify(tournaments));

            const res = await fetch(`${BackEndRoute}/api/user/edit/${id}`, {
                method: "PUT",
                credentials: "include",
                body: formData
            })

            const dataRes = await res.json()

            if (dataRes.success === false) {
                alert(dataRes.message)
                return
            }

            alert(dataRes.message)
            navigate('/admin')
        }
        catch (err) {
            console.log(err)
            alert(err.message)
        }
    }

    const ErrorMessage = ({ error }) => {
        if (!error) return null;
        return <span className="error-message">{error.message}</span>;
    };

    return (
        <div className="user-form-cont">
            <div className="user-form-wrapper">
                <div className="admin-user-from-head">
                    <h1 className="user-form-title">Admin EditUser User Form</h1>
                    <img src={existingImage} alt="" />
                </div>

                <form noValidate className="user-form-main" onSubmit={handleSubmit(editUser)}>
                    {/* Basic Details */}
                    <div className="user-form-section">
                        <h2 className="user-form-section-header">Basic Details</h2>
                        <div className="user-form-grid">
                            <div className="user-form-field">
                                <label className="user-form-label">Unique ID *</label>
                                <input
                                    type="text"
                                    name="uniqueId"
                                    className="user-form-input"
                                    {...register("uniqueId")}
                                    readOnly
                                />
                            </div>

                            <div className="user-form-field">
                                <label className="user-form-label">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="user-form-input"
                                    {...register("email")}
                                    readOnly
                                />
                            </div>

                            <div className="user-form-field">
                                <label className="user-form-label">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="user-form-input"
                                    {...register("firstName")}

                                />
                            </div>

                            <div className="user-form-field">
                                <label className="user-form-label">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="user-form-input"
                                    {...register("lastName")}
                                />
                            </div>

                            <div className="user-form-field">
                                <label className="user-form-label">Gender</label>
                                <select
                                    name="gender"
                                    className="user-form-select"
                                    {...register("gender")}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="user-form-field">
                                <label className="user-form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    className="user-form-input"
                                    {...register("phoneNumber")}
                                />
                            </div>

                            <div className="user-form-field">
                                <label className="user-form-label">Home Town</label>
                                <input
                                    type="text"
                                    name="homeTown"
                                    className="user-form-input"
                                    {...register("homeTown")}
                                />
                            </div>

                            <div className="user-form-field">
                                <label className="user-form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className="user-form-input"
                                    {...register("dateOfBirth")}
                                />
                            </div>

                            <div className="user-form-field user-form-field-full">
                                <label className="user-form-label">Profile Picture URL</label>
                                <input
                                    name="profilePicture"
                                    className="user-form-input"
                                    type="file"
                                    {...register('profilePicture')}
                                    accept="image/png, image/jpeg, image/jpg"
                                />
                            </div>

                            <div className="user-form-checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    name="verified"
                                    className="user-form-checkbox"
                                    {...register('verified')}
                                />
                                <label className="user-form-label">Verified</label>
                            </div>

                        </div>
                    </div>

                    {/* Physical Attributes */}
                    <div className="user-form-section">
                        <h2 className="user-form-section-header">Physical Attributes</h2>
                        <div className="user-form-grid">
                            <div className="user-form-field">
                                <label className="user-form-label">Height</label>
                                <input
                                    type="text"
                                    name="height"
                                    placeholder="e.g., 6'2&quot;"
                                    className="user-form-input"
                                    {...register('height')}
                                />
                            </div>

                            <div className="user-form-field">
                                <label className="user-form-label">Weight</label>
                                <input
                                    type="text"
                                    name="weight"
                                    placeholder="e.g., 180 lbs"
                                    className="user-form-input"
                                    {...register('weight')}
                                />
                            </div>

                            <div className="user-form-field">
                                <label className="user-form-label">Wingspan</label>
                                <input type="text" name="wingspan" placeholder="e.g., 6'8&quot;" className="user-form-input"
                                    {...register('wingspan')} />
                            </div>

                            <div className="user-form-field">
                                <label className="user-form-label">Position</label>
                                <select
                                    className="user-form-select"
                                    name="position"
                                    {...register('playerPosition')}
                                >
                                    <option value="">Select</option>
                                    {['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'].map(pos => (
                                        <option key={pos} value={pos}>{pos}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Tournaments Participated */}
                    <div className="user-form-section">
                        <h2 className="user-form-section-header">Tournaments Participated</h2>

                        <div className="user-form-tournament-controls">
                            <input
                                type="text"
                                placeholder="Year (e.g., 2025)"
                                className="user-form-input user-form-year-input"
                                value={tournamentYear}
                                onChange={(e) => setTournamentYear(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Tournament Name"
                                className="user-form-input user-form-tournament-input"
                                value={tournamentName}
                                onChange={(e) => setTournamentName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTournament())}
                            />
                            <button
                                type="button"
                                className="user-form-add-tournament-btn"
                                onClick={handleAddTournament}
                            >
                                Add
                            </button>
                        </div>

                        <div className="user-form-tournament-display">
                            {Object.keys(tournaments).length === 0 ? (
                                <p className="user-form-tournament-placeholder">Added tournaments will appear here</p>
                            ) : (
                                <div className="user-form-tournament-list">
                                    {Object.entries(tournaments)
                                        .sort(([yearA], [yearB]) => yearB - yearA)
                                        .map(([year, tournamentList]) => (
                                            <div key={year} className="user-form-tournament-year-group">
                                                <h3 className="user-form-tournament-year">{year}</h3>
                                                <ul className="user-form-tournament-items">
                                                    {tournamentList.map((tournament, index) => (
                                                        <li key={index} className="user-form-tournament-item">
                                                            <span>{tournament}</span>
                                                            <button
                                                                type="button"
                                                                className="user-form-remove-tournament-btn"
                                                                onClick={() => handleRemoveTournament(year, index)}
                                                            >
                                                                Remove
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ranking */}
                    <div className="user-form-section">
                        <h2 className="user-form-section-header">Ranking</h2>
                        <div className="user-form-grid">
                            <div className="user-form-field">
                                <label className="user-form-label">Current Ranking</label>
                                <input type="number" name="currentRanking" className="user-form-input"
                                    {...register('currentRanking')}
                                />
                                <ErrorMessage error={errors.currentRanking} />
                            </div>

                            <div className="user-form-field">
                                <label className="user-form-label">Ranking Points</label>
                                <input type="number" name="rankingPoints" className="user-form-input"
                                    {...register('rankingPoints')}
                                />
                                <ErrorMessage error={errors.rankingPoints} />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button disabled={!user || isSubmitting} type="submit" className="user-form-submit-btn">Edit User</button>
                </form>
            </div>
        </div>
    );
}
