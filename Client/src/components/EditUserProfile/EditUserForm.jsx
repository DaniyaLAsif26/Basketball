import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { X, Plus, Trash2, Save, Upload, User, Phone, Mail, MapPin, Calendar, Ruler, Weight, Maximize2, Target } from 'lucide-react';
import { useLogin } from '../../context/LoginContext';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import './edit-user-profile.css';

const userSchema = z.object({
  email: z.string()
    .min(3, "Email Required")
    .max(100, "Email to big"),

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

const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function EditUserForm({ onClose }) {

  const navigate = useNavigate()

  const { isUserLoggedIn, checkCompleteUserProfile, setUserData, userData } = useLogin();
  const isComplete = checkCompleteUserProfile?.(userData);

  const [loading, setLoading] = useState(false)
  const [existingImage, setExistingImage] = useState(null)

  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Basic Info', 'Physical'].filter(Boolean);

  const getInitialValues = (user) => {

    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };

    return {
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phoneNumber: user?.phoneNumber || '',
      homeTown: user?.homeTown || '',
      dateOfBirth: formatDate(user?.dateOfBirth) || '',
      height: user?.height || '',
      weight: user?.weight || '',
      wingspan: user?.wingspan || '',
      playerPosition: user?.playerPosition || '',
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(userSchema),
  })

  const formData = watch();

  useEffect(() => {
    if (userData) {
      reset(getInitialValues(userData));
      if (userData.profilePicture) {
        setExistingImage(userData.profilePicture)
      }
    }
  }, [userData, reset]);

  const submitUserFormData = async (data) => {
    if (!isUserLoggedIn || loading) return;

    try {
      setLoading(true)

      const formValues = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'email') return;

        if (key === 'profilePicture') {
          if (value && value.length > 0) {
            formValues.append('profilePicture', value[0])
          }
        }
        else if (value !== undefined && value !== '') {
          formValues.append(key, value)
        }
      })

      const res = await fetch(`${BackEndRoute}/api/user/edit/${userData._id}`, {
        method: "PUT",
        credentials: 'include',
        body: formValues
      })

      const dataRes = await res.json()

      if (dataRes.success === false) {
        alert(dataRes.message)
        navigate('/')
        return
      }

      if (dataRes.success === true) {
        alert(dataRes.message)
        setUserData(dataRes.user)
        navigate('/my-account')
        return;
      }

    }
    catch (err) {
      console.log(err)
      alert(`Error : ${err.message}`)
    }
    finally {
      setLoading(false)
    }
  }

  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return <span className="error-message">{error.message}</span>;
  };

  return (

    <div className="form-backdrop">
      <div className="form-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="user-edit-header-content">
            <div className="header-icon"><User size={24} /></div>
            <div className="header-text">
              <h1>{isComplete ? 'Edit' : 'Complete'} Player Profile</h1>
              <p>{isComplete ? 'Update' : 'Add'} your basketball profile information</p>
            </div>
          </div>
          <button className="user-edit-btn-close" onClick={onClose}>
            <X size={26} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
              onClick={() => setActiveStep(index)}
            >
              <div className="step-btn-grp">
                <div className="step-number">{index + 1}</div>
                <div className="step-label">{step}</div>
              </div>
            </div>
          ))}
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}></div>
          </div>
        </div>

        <form className="user-edit-form-content" onSubmit={handleSubmit(submitUserFormData)}>
          {/* Step 0: Basic Info */}
          {activeStep === 0 && (
            <div className="form-step">
              <div className="profile-upload">
                <div className="upload-preview">
                  {existingImage && (
                    <img src={existingImage} alt="Profile" />
                  )}
                </div>
                <div className="upload-input-group">
                  <label>Profile Picture </label>
                  <input
                    type="file"
                    {...register('profilePicture')}
                    accept="image/png, image/jpeg, image/jpg"
                  />
                  <ErrorMessage error={errors.profilePicture} />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label><User size={16} /> First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    {...register('firstName')}
                    placeholder="Enter first name"
                  />
                  <ErrorMessage error={errors.firstName} />
                </div>
                <div className="input-group">
                  <label><User size={16} /> Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    {...register('lastName')}
                    laceholder="Enter last name"

                  />
                  <ErrorMessage error={errors.lastName} />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label><Mail size={16} /> Email Address</label>
                  <input
                    type="email"
                    name="email"
                    {...register('email')}
                    placeholder="player@example.com"
                    readOnly
                  />
                  <ErrorMessage error={errors.email} />
                </div>
                <div className="input-group">
                  <label><Phone size={16} /> Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    {...register('phoneNumber')}
                    placeholder="9988776655"
                  />
                  <ErrorMessage error={errors.phoneNumber} />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label><MapPin size={16} /> Home Town</label>
                  <input
                    type="text"
                    name="hometown"
                    {...register('homeTown')}
                    placeholder="City, State"
                  />
                  <ErrorMessage error={errors.homeTown} />
                </div>
                <div className="input-group">
                  <label><Calendar size={16} /> Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    {...register('dateOfBirth')}
                  />
                  <ErrorMessage error={errors.dateOfBirth} />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Physical Attributes */}
          {activeStep === 1 && (
            <div className="form-step">
              <div className="step-header">
                <h2>Physical Attributes</h2>
                <p>Enter your basketball measurements</p>
              </div>

              <div className="physical-grid">
                {[
                  { icon: Ruler, label: 'Height (Feet)', name: 'height', placeholder: '5-11' },
                  { icon: Weight, label: 'Weight (Kg)', name: 'weight', placeholder: '69 Kg' },
                  { icon: Maximize2, label: 'Wingspan (Feet)', name: 'wingspan', placeholder: '6-5' }
                ].map(({ icon: Icon, label, name, placeholder }) => (
                  <div key={name} className="user-edit-physical-card">
                    <div className="card-icon"><Icon size={24} /></div>
                    <label>{label}</label>
                    <input type="text"
                      name={name}
                      {...register(name)}
                      placeholder={placeholder}
                    />
                    <ErrorMessage error={errors?.[name]} />
                  </div>
                ))}

                <div className="user-edit-physical-card">
                  <div className="card-icon"><Target size={24} /></div>
                  <label>Position</label>
                  <select
                    name="position"
                    {...register('playerPosition')}
                  >
                    <option value="">Select</option>
                    {['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'].map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                  <ErrorMessage error={errors.playerPosition} />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="form-navigation">
            <button
              type="button"
              className="btn-nav btn-prev"
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
            >
              Previous
            </button>
            {activeStep < steps.length - 1 ? (
              <button
                type="button"
                className="btn-nav btn-next"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveStep(prev => Math.min(steps.length - 1, prev + 1))
                }
                }
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="btn-nav btn-submit"
              >
                <Save size={20} />
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}