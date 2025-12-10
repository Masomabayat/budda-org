import React, { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

const educationLevels = [
  { value: "high_school", label: "High School" },
  { value: "bachelor", label: "Bachelor's" },
  { value: "master", label: "Master's" },
  { value: "phd", label: "PhD" },
  { value: "other", label: "Other / None" }
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
  { value: "other", label: "Other" }
];

const scholarshipInterestOptions = [
  { value: "scholarship_guidance", label: "Scholarship guidance" },
  { value: "bootcamps", label: "Boot camps / workshops" },
  { value: "coaching_sop", label: "Coaching for SOP / motivation letters" },
  { value: "career_guidance", label: "Career guidance" }
];

const scholarshipTypes = [
  { value: "high_school", label: "High School" },
  { value: "bachelor", label: "Bachelor" },
  { value: "master", label: "Master" },
  { value: "phd", label: "PhD" }
];

const coachingTopicsOptions = [
  { value: "sop", label: "SOP writing" },
  { value: "motivation_letter", label: "Motivation letter" },
  { value: "cover_letter", label: "Cover letter" },
  { value: "recommendation_letter", label: "Recommendation letter" },
  { value: "essay", label: "Essay writing" },
  { value: "interview", label: "Interview preparation" }
];

const coachingModes = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline / in-person" },
  { value: "flexible", label: "Flexible" }
];

const softSkillsOptions = [
  { value: "leadership", label: "Leadership" },
  { value: "communication", label: "Communication" },
  { value: "critical_thinking", label: "Critical thinking" },
  { value: "time_management", label: "Time management" },
  { value: "teamwork", label: "Teamwork" },
  { value: "problem_solving", label: "Problem-solving" }
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "dari", label: "Dari" },
  { value: "pashto", label: "Pashto" },
  { value: "other", label: "Others" }
];

const hearAboutOptions = [
  { value: "social_media", label: "Social media" },
  { value: "friend_family", label: "Friend / family" },
  { value: "school", label: "School / University" },
  { value: "online_search", label: "Online search" },
  { value: "other", label: "Other" }
];

const timeSlotOptions = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "weekend", label: "Weekend" }
];

const createInitialFormState = () => ({
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  genderOther: "",
  countryCity: "",
  educationLevel: "",
  fieldOfStudy: "",
  institution: "",
  graduationYear: "",
  scholarshipInterests: [],
  scholarshipType: "",
  coachingTopics: [],
  coachingMode: "",
  timeSlot: "",
  softSkills: [],
  languages: [],
  languageOther: "",
  interestsAreas: "",
  hearAbout: "",
  cvFileData: "",
  cvFileName: "",
  motivationStatement: "",
  consentTerms: false,
  consentEmails: false
});

export default function RegistrationPage() {
  const [form, setForm] = useState(createInitialFormState);
  const [fileInputKey, setFileInputKey] = useState(0);

  const modeOptions = useMemo(() => coachingModes, []);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateArray(field, value, checked) {
    setForm((prev) => {
      const set = new Set(prev[field]);
      if (checked) {
        set.add(value);
      } else {
        set.delete(value);
      }
      return { ...prev, [field]: Array.from(set) };
    });
  }

  function handleFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      updateField("cvFileData", "");
      updateField("cvFileName", "");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert("Please upload a file smaller than 4MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        updateField("cvFileData", result);
        updateField("cvFileName", file.name);
      }
    };
    reader.readAsDataURL(file);
  }

  function getOptionLabel(value, options) {
    return options.find((opt) => opt.value === value)?.label || value;
  }

  function formatSelection(values, options, otherLabel) {
    if (!values.length) return "";
    return values
      .map((value) => {
        if (value === "other" && otherLabel) {
          return `${getOptionLabel(value, options)} (${otherLabel})`;
        }
        return getOptionLabel(value, options);
      })
      .filter(Boolean)
      .join(", ");
  }

  function makeSafeId(field, value, index) {
    return `${field}-${value}-${index}`.replace(/[^a-zA-Z0-9_-]/g, "-");
  }

  function renderCheckboxGrid(options, selectedValues, field, columnCount = 2) {
    if (!options.length) return null;
    
    // For single column, render a simple vertical list
    if (columnCount === 1) {
      return (
        <div style={{ marginLeft: 0, width: "100%" }}>
          {options.map((opt, optionIndex) => {
            const checked = selectedValues.includes(opt.value);
            const safeId = makeSafeId(field, opt.value, optionIndex);
            return (
              <div
                className="checkbox"
                key={opt.value}
                style={{ 
                  marginTop: 0, 
                  marginBottom: 10,
                  marginLeft: 0,
                  width: "100%",
                  display: "block"
                }}
              >
                <label
                  htmlFor={safeId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: 500,
                    marginBottom: 0,
                    color: "#000",
                    width: "100%"
                  }}
                >
                  <input
                    id={safeId}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => updateArray(field, opt.value, e.target.checked)}
                    style={{ margin: 0, flexShrink: 0 }}
                  />
                  <span style={{ marginLeft: 15 }}>{opt.label}</span>
                </label>
              </div>
            );
          })}
        </div>
      );
    }
    
    // For multiple columns, use the grid layout
    const columns = Math.min(columnCount, options.length);
    const itemsPerColumn = Math.ceil(options.length / columns);
    const chunks = [];
    for (let i = 0; i < options.length; i += itemsPerColumn) {
      chunks.push(options.slice(i, i + itemsPerColumn));
    }
    return (
      <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
        {chunks.map((chunk, idx) => (
          <div className="col-sm-6 col-xs-12" key={`${field}-col-${idx}`} style={{ paddingLeft: 0 }}>
            {chunk.map((opt, optionIndex) => {
              const checked = selectedValues.includes(opt.value);
              const safeId = makeSafeId(field, opt.value, optionIndex + idx * itemsPerColumn);
              return (
                <div
                  className="checkbox"
                  key={opt.value}
                  style={{ marginTop: 0, marginBottom: 10 }}
                >
                  <label
                    htmlFor={safeId}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      // gap: 8,
                      cursor: "pointer",
                      fontWeight: 500,
                      marginBottom: 0,
                      color: "#000"
                    }}
                  >
                    <input
                      id={safeId}
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => updateArray(field, opt.value, e.target.checked)}
                      style={{ margin: 0 }}
                    />
                    <span style={{ marginLeft: 15 }}>{opt.label}</span>
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (!form.email.trim()) {
      alert("Please enter your email address.");
      return;
    }
    if (!form.consentTerms) {
      alert("Please agree to the terms and conditions to continue.");
      return;
    }

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn("Missing EmailJS environment variables");
      alert("Submission error: Email service not configured. Please try again later.");
      return;
    }

    const templateParams = {
      to_email: "buddhabridge.24@gmail.com",
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      date_of_birth: form.dob,
      gender: (() => {
        if (!form.gender) return form.genderOther;
        const label = getOptionLabel(form.gender, genderOptions);
        if (form.gender === "other") {
          return form.genderOther ? `${label} (${form.genderOther})` : label;
        }
        return label;
      })(),
      country_city: form.countryCity,
      education_level: getOptionLabel(form.educationLevel, educationLevels),
      field_of_study: form.fieldOfStudy,
      institution: form.institution,
      graduation_year: form.graduationYear,
      scholarship_interests: formatSelection(form.scholarshipInterests, scholarshipInterestOptions),
      scholarship_type: getOptionLabel(form.scholarshipType, scholarshipTypes),
      coaching_topics: formatSelection(form.coachingTopics, coachingTopicsOptions),
      coaching_mode: getOptionLabel(form.coachingMode, coachingModes),
      time_slot: getOptionLabel(form.timeSlot, timeSlotOptions),
      soft_skills: formatSelection(form.softSkills, softSkillsOptions),
      languages: formatSelection(form.languages, languageOptions, form.languageOther),
      interests_areas: form.interestsAreas,
      hear_about: getOptionLabel(form.hearAbout, hearAboutOptions),
      motivation_statement: form.motivationStatement,
      consent_emails: form.consentEmails ? "Yes" : "No",
      consent_terms: form.consentTerms ? "Yes" : "No",
      cv_file_name: form.cvFileName,
      cv_file_data: form.cvFileData
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      alert("Thank you! Your registration has been submitted.");
      setForm(createInitialFormState());
      setFileInputKey((prev) => prev + 1);
    } catch (err) {
      console.error("EmailJS send failed", err);
      const errorMessage = err?.text || err?.message || "Unknown error";
      console.error("Error details:", {
        status: err?.status,
        text: err?.text,
        message: err?.message,
        fullError: err
      });
      alert(`Sorry, we couldn't send your submission. Error: ${errorMessage}. Please check the console for details.`);
    }
  }

  return (
    <div className="container" id="regestration" style={{ paddingTop: 120, paddingBottom: 40 }}>
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h2 style={{ marginBottom: 10, color: "#000" }}>Budda Bridge Registration & Coaching Interest Form</h2>
          <p style={{ marginBottom: 30 }}>
            Share a few details so we can match you with the right scholarships, coaching, and opportunities. Only the required fields marked with * need to be completed.
          </p>
        </div>
      </div>

      {/* Application Options Section */}
      <div className="row" style={{ marginBottom: 40 }}>
        <div className="col-md-8 col-md-offset-2">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title" style={{ color: "#000" }}>Application Options</h3>
            </div>
            <div className="panel-body" style={{ padding: "20px" }}>
              <div className="row">
                <div className="col-md-4 col-sm-12" style={{ marginBottom: 15 }}>
                  <a
                    href="#student-registration-form"
                    className="btn btn-primary"
                    style={{
                      background: "linear-gradient(to right, #004138 0%, #359E88 100%)",
                      border: "none",
                      padding: "15px 20px",
                      fontSize: "13px",
                      borderRadius: "6px",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: 500,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%",
                      minHeight: "67px",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      lineHeight: "1.4",
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("student-registration-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Student Registration Form
                  </a>
                </div>
                <div className="col-md-4 col-sm-12" style={{ marginBottom: 15 }}>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdWmuw12PpgdEi9XjStn8dnI0EL6vG3Zt6-XHLW0Jx3UenhjA/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{
                      background: "linear-gradient(to right, #004138 0%, #359E88 100%)",
                      border: "none",
                      padding: "15px 20px",
                      fontSize: "13px",
                      borderRadius: "6px",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: 500,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%",
                      minHeight: "60px",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      lineHeight: "1.4",
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    Scholarship Advisor / Mentor Application
                  </a>
                </div>
                <div className="col-md-4 col-sm-12" style={{ marginBottom: 15 }}>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfdC3-bxizY2XBcIPw6P-BwzjYNJAJv2whCPYiR8feiSDEbIQ/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{
                      background: "linear-gradient(to right, #004138 0%, #359E88 100%)",
                      border: "none",
                      padding: "15px 20px",
                      fontSize: "13px",
                      borderRadius: "6px",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: 500,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%",
                      minHeight: "60px",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      lineHeight: "1.4",
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    Program Coordinator Application
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="row" id="student-registration-form">
        <div className="col-md-8 col-md-offset-2">
          <div className="panel panel-default">
            <div className="panel-heading"><h3 className="panel-title" style={{ color: "#000" }}>Basic Personal Information</h3></div>
            <div className="panel-body">
              <div className="form-group">
                <label style={{ color: "#000" }}>Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label style={{ color: "#000" }}>Email Address *</label>
                <input
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label style={{ color: "#000" }}>Phone Number (Optional)</label>
                <input
                  type="tel"
                  className="form-control"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="Include country code if outside Afghanistan"
                />
              </div>
              <div className="form-group">
                <label style={{ color: "#000" }}>Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.dob}
                  onChange={(e) => updateField("dob", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label style={{ color: "#000" }}>Gender (Optional)</label>
                <select
                  className="form-control"
                  value={form.gender}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateField("gender", value);
                    if (value !== "other") {
                      updateField("genderOther", "");
                    }
                  }}
                >
                  <option value="">Select an option</option>
                  {genderOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              {form.gender === "other" && (
                <div className="form-group">
                  <label style={{ color: "#000" }}>Please specify</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add how you identify"
                    value={form.genderOther}
                    onChange={(e) => updateField("genderOther", e.target.value)}
                  />
                </div>
              )}
              <div className="form-group">
                <label style={{ color: "#000" }}>Country / City</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.countryCity}
                  onChange={(e) => updateField("countryCity", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading"><h3 className="panel-title" style={{ color: "#000" }}>Educational Background</h3></div>
            <div className="panel-body">
              <div className="form-group">
                <label style={{ color: "#000" }}>Current Education Level</label>
                <select
                  className="form-control"
                  value={form.educationLevel}
                  onChange={(e) => updateField("educationLevel", e.target.value)}
                >
                  <option value="">Select an option</option>
                  {educationLevels.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label style={{ color: "#000" }}>Field of Study / Major</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.fieldOfStudy}
                  onChange={(e) => updateField("fieldOfStudy", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label style={{ color: "#000" }}>Current Institution</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.institution}
                  onChange={(e) => updateField("institution", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label style={{ color: "#000" }}>Graduation Year / Expected Graduation Year</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., 2025"
                  value={form.graduationYear}
                  onChange={(e) => updateField("graduationYear", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading"><h3 className="panel-title" style={{ color: "#000" }}>Scholarship & Coaching Interests</h3></div>
            <div className="panel-body">
              <div className="form-group">
                <label style={{ color: "#000", fontWeight: 600, fontSize: 13 }}>Interested in</label>
              </div>
              <div className="form-group">
                {renderCheckboxGrid(
                  scholarshipInterestOptions,
                  form.scholarshipInterests,
                  "scholarshipInterests",
                  1
                )}
              </div>

              <div className="form-group">
                <label style={{ color: "#000", fontWeight: 600, fontSize: 13, marginTop: 10 }}>Type of Scholarship</label>
                <select
                  className="form-control"
                  value={form.scholarshipType}
                  onChange={(e) => updateField("scholarshipType", e.target.value)}
                >
                  <option value="">Select type</option>
                  {scholarshipTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label style={{ color: "#000", fontWeight: 600, fontSize: 13 }}>Preferred Coaching Topics</label>
              </div>
              <div className="form-group">
                {renderCheckboxGrid(
                  coachingTopicsOptions,
                  form.coachingTopics,
                  "coachingTopics",
                  1
                )}
              </div>

              <div className="form-group">
                <label style={{ color: "#000", fontWeight: 600, fontSize: 13, marginTop: 10 }}>Preferred Coaching Mode</label>
              </div>
              <div className="form-group">
                <div style={{ marginLeft: 0, width: "100%" }}>
                  {modeOptions.map((opt, index) => {
                    const id = makeSafeId("coachingMode", opt.value, index);
                    const isSelected = form.coachingMode === opt.value;
                    return (
                      <div
                        className="radio"
                        key={opt.value}
                        style={{ 
                          marginTop: 0, 
                          marginBottom: 10,
                          marginLeft: 0,
                          width: "100%",
                          display: "block"
                        }}
                      >
                        <label
                          htmlFor={id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            fontWeight: 500,
                            marginBottom: 0,
                            color: "#000",
                            width: "100%"
                          }}
                        >
                          <input
                            id={id}
                            type="radio"
                            name="coachingMode"
                            value={opt.value}
                            checked={isSelected}
                            onChange={(e) => updateField("coachingMode", e.target.value)}
                            style={{ margin: 0, flexShrink: 0 }}
                          />
                          <span style={{ marginLeft: 15 }}>{opt.label}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label style={{ color: "#000", fontWeight: 600, fontSize: 13, marginTop: 10 }}>Preferred Time Slot</label>
                <select
                  className="form-control"
                  value={form.timeSlot}
                  onChange={(e) => updateField("timeSlot", e.target.value)}
                >
                  <option value="">Select a time</option>
                  {timeSlotOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading"><h3 className="panel-title" style={{ color: "#000" }}>Skills & Interests</h3></div>
            <div className="panel-body">
              <div className="form-group">
                <label style={{ color: "#000", fontWeight: 600, fontSize: 13, marginTop: 10 }}>Soft Skills You Want to Improve</label>
              </div>
              <div className="form-group">
                {renderCheckboxGrid(softSkillsOptions, form.softSkills, "softSkills", 1)}
              </div>

              <div className="form-group">
                <label style={{ color: "#000", fontWeight: 600, fontSize: 13, marginTop: 10 }}>Languages Spoken</label>
              </div>
              <div className="form-group">
                {renderCheckboxGrid(languageOptions, form.languages, "languages", 1)}
              </div>
              {form.languages.includes("other") && (
                <div className="form-group">
                  <label style={{ color: "#000" }}>Please specify other languages</label>
                  <input
                    type="text"
                    className="form-control"
                    // marginRight={20}
                    value={form.languageOther}
                    onChange={(e) => updateField("languageOther", e.target.value)}
                  />
                </div>
              )}

              <div className="form-group">
                <label style={{ color: "#000", fontWeight: 600, fontSize: 13, marginTop: 10 }}>Areas of Interest / Career Goals</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="e.g., STEM, Business, Humanities, Social Work, Arts"
                  value={form.interestsAreas}
                  onChange={(e) => updateField("interestsAreas", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading"><h3 className="panel-title" style={{ color: "#000" }}>Additional Information & Submission</h3></div>
            <div className="panel-body">
              <div className="form-group">
                <label style={{ color: "#000", fontWeight: 600, fontSize: 13, marginTop: 10 }}>How did you hear about us?</label>
                <select
                  className="form-control"
                  value={form.hearAbout}
                  onChange={(e) => updateField("hearAbout", e.target.value)}
                >
                  <option value="">Select an option</option>
                  {hearAboutOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label style={{ color: "#000", fontWeight: 600, fontSize: 13, marginTop: 10 }}>Upload CV / Academic Documents (optional)</label>
                <input
                  key={fileInputKey}
                  type="file"
                  className="form-control"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={handleFileChange}
                />
                {form.cvFileName && (
                  <small className="text-muted">Selected file: {form.cvFileName}</small>
                )}
              </div>

              <div className="form-group">
                <label style={{ color: "#000", fontWeight: 600, fontSize: 13, marginTop: 10 }}>Motivation Statement</label>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Tell us why you want coaching or scholarships"
                  value={form.motivationStatement}
                  onChange={(e) => updateField("motivationStatement", e.target.value)}
                />
              </div>

              <div style={{ marginLeft: 0, width: "100%" }}>
                <div
                  className="checkbox"
                  style={{ 
                    marginTop: 0, 
                    marginBottom: 10,
                    marginLeft: 0,
                    width: "100%",
                    display: "block"
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      fontWeight: 500,
                      marginBottom: 0,
                      color: "#000",
                      width: "100%"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.consentTerms}
                      onChange={(e) => updateField("consentTerms", e.target.checked)}
                      required
                      style={{ margin: 0, flexShrink: 0 }}
                    />
                    <span style={{ marginLeft: 15 }}>I agree to the terms and conditions *</span>
                  </label>
                </div>
                <div
                  className="checkbox"
                  style={{ 
                    marginTop: 0, 
                    marginBottom: 10,
                    marginLeft: 0,
                    width: "100%",
                    display: "block"
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      fontWeight: 500,
                      marginBottom: 0,
                      color: "#000",
                      width: "100%"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.consentEmails}
                      onChange={(e) => updateField("consentEmails", e.target.checked)}
                      style={{ margin: 0, flexShrink: 0 }}
                    />
                    <span style={{ marginLeft: 15 }}>I agree to receive emails / newsletters</span>
                  </label>
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ 
                    background: "linear-gradient(to right, #004138 0%, #359E88 100%)",
                    border: "none",
                    padding: "10px 30px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: 500,
                    width: "100%"
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


