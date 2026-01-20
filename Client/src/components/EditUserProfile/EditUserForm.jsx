import React, { useState } from 'react';
import { X, Plus, Trash2, Save, Upload, User, Phone, Mail, MapPin, Calendar, Ruler, Weight, Maximize2, Target } from 'lucide-react';
import { useLogin } from '../../context/LoginContext';
import './edit-user-profile.css';

export default function EditUserForm({ initialData, onClose, onSave, isAdmin }) {
  const { checkCompleteUserProfile, userData } = useLogin();
  const [formData, setFormData] = useState({
    profilePicture: initialData?.profilePicture || '',
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    hometown: initialData?.hometown || '',
    dob: initialData?.dob || '',
    height: initialData?.height || '',
    weight: initialData?.weight || '',
    wingspan: initialData?.wingspan || '',
    position: initialData?.position || '',
    tournaments: initialData?.tournaments || [{ year: 2024, list: [''] }],
    currentRanking: initialData?.currentRanking || '',
    rankingPoints: initialData?.rankingPoints || ''
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Basic Info', 'Physical', isAdmin ? 'Tournaments' : null, isAdmin ? 'Ranking' : null].filter(Boolean);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  const isComplete = checkCompleteUserProfile?.(userData);

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

        <form className="user-edit-form-content" onSubmit={handleSubmit}>
          {/* Step 0: Basic Info */}
          {activeStep === 0 && (
            <div className="form-step">
              <div className="profile-upload">
                <div className="upload-preview">
                  {formData.profilePicture ? (
                    <img src={formData.profilePicture} alt="Profile" />
                  ) : (
                    <div className="upload-placeholder">
                      <Upload size={32} />
                      <span>Upload Photo</span>
                    </div>
                  )}
                </div>
                <div className="upload-input-group">
                  <label>Profile Picture URL</label>
                  <input
                    type="file"
                    // {...register('tournamentImage')}
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label><User size={16} /> First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" required />
                </div>
                <div className="input-group">
                  <label><User size={16} /> Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" required />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label><Mail size={16} /> Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="player@example.com" required />
                </div>
                <div className="input-group">
                  <label><Phone size={16} /> Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" required />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label><MapPin size={16} /> Home Town</label>
                  <input type="text" name="hometown" value={formData.hometown} onChange={handleChange} placeholder="City, State" required />
                </div>
                <div className="input-group">
                  <label><Calendar size={16} /> Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
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
                  { icon: Ruler, label: 'Height', name: 'height', placeholder: '6\' 2"' },
                  { icon: Weight, label: 'Weight', name: 'weight', placeholder: '210 lbs' },
                  { icon: Maximize2, label: 'Wingspan', name: 'wingspan', placeholder: '6\' 5"' }
                ].map(({ icon: Icon, label, name, placeholder }) => (
                  <div key={name} className="user-edit-physical-card">
                    <div className="card-icon"><Icon size={24} /></div>
                    <label>{label}</label>
                    <input type="text" name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} required />
                  </div>
                ))}

                <div className="user-edit-physical-card">
                  <div className="card-icon"><Target size={24} /></div>
                  <label>Position</label>
                  <select name="position" value={formData.position} onChange={handleChange} required>
                    <option value="">Select</option>
                    {['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'].map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
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
                onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
              >
                Next Step
              </button>
            ) : (
              <button type="submit" className="btn-nav btn-submit">
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