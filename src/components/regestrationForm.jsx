import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const RegistrationForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalConditions: "",
    interests: "",
    experience: "",
    motivation: ""
  });

  const [formStatus, setFormStatus] = useState({
    type: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'age', 'gender'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      setFormStatus({
        type: "error",
        message: "Please fill in all required fields."
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Create a temporary form element for EmailJS
      const tempForm = document.createElement('form');
      tempForm.style.display = 'none';
      
      // Add form data as hidden inputs
      Object.keys(formData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = formData[key];
        tempForm.appendChild(input);
      });

      document.body.appendChild(tempForm);

      await emailjs.sendForm(
        "service_836p7z1", 
        "template_724rydr", 
        tempForm, 
        {
          publicKey: "m6E7PhPY3DgAIpm0F",
        }
      );

      document.body.removeChild(tempForm);

      setFormStatus({
        type: "success",
        message: "Registration submitted successfully! We'll contact you soon."
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        address: "",
        emergencyContact: "",
        emergencyPhone: "",
        medicalConditions: "",
        interests: "",
        experience: "",
        motivation: ""
      });

      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
        setFormStatus({ type: "", message: "" });
      }, 3000);

    } catch (error) {
      console.error("Registration error:", error);
      setFormStatus({
        type: "error",
        message: "Sorry, there was an error submitting your registration. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Registration Form</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <p className="form-description">
            Join our community! Please fill out the form below to register for our programs and activities.
          </p>

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Street address, city, state, zip code"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emergencyContact">Emergency Contact Name</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="emergencyPhone">Emergency Contact Phone</label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="medicalConditions">Medical Conditions/Allergies</label>
              <textarea
                id="medicalConditions"
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                rows="2"
                placeholder="Please list any medical conditions or allergies we should be aware of"
              />
            </div>

            <div className="form-group">
              <label htmlFor="interests">Areas of Interest</label>
              <textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                rows="2"
                placeholder="What activities or programs are you most interested in?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">Previous Experience</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="2"
                placeholder="Tell us about any relevant experience or background"
              />
            </div>

            <div className="form-group">
              <label htmlFor="motivation">Motivation</label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows="3"
                placeholder="What motivates you to join our community? What are your goals?"
              />
            </div>

            {formStatus.message && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.message}
              </div>
            )}

            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 8px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          border-bottom: 1px solid #eee;
          background: linear-gradient(135deg, #004138 0%, #359E88 100%);
          color: white;
          border-radius: 8px 8px 0 0;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 28px;
          color: white;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s;
        }

        .close-btn:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .modal-body {
          padding: 30px;
        }

        .form-description {
          margin-bottom: 25px;
          color: #666;
          font-size: 16px;
          line-height: 1.5;
        }

        .registration-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.2s;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #359E88;
          box-shadow: 0 0 0 3px rgba(53, 158, 136, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-status {
          padding: 12px 16px;
          border-radius: 6px;
          font-weight: 500;
          margin: 10px 0;
        }

        .form-status.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .form-status.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .form-actions {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 120px;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #004138 0%, #359E88 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(53, 158, 136, 0.3);
        }

        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }

        .btn-secondary:hover:not(:disabled) {
          background-color: #5a6268;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .modal-content {
            margin: 10px;
            max-height: 95vh;
          }

          .modal-header,
          .modal-body {
            padding: 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default RegistrationForm;
