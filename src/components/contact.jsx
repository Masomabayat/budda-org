import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import React from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};
export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);
  const [emailStatus, setEmailStatus] = useState({
    type: "", // 'success' or 'error'
    message: ""
  });
  const form = useRef();

  // Auto-dismiss success message after 5 seconds
  useEffect(() => {
    if (emailStatus.type === 'success') {
      const timer = setTimeout(() => {
        setEmailStatus({ type: "", message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [emailStatus.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", { name, email, message });
    console.log("Form element:", form.current);
    
    // Clear any previous status messages
    setEmailStatus({ type: "", message: "" });
    
    // Validate form data before sending
    if (!name || !email || !message) {
      setEmailStatus({
        type: "error",
        message: "Please fill in all required fields."
      });
      return;
    }
    
    emailjs
      .sendForm("service_836p7z1", "template_724rydr", form.current, {
        publicKey: "m6E7PhPY3DgAIpm0F",
      })
      .then(
        (result) => {
          console.log("EmailJS Success:", result);
          setEmailStatus({
            type: "success",
            message: "Thank you! Your message has been sent successfully."
          });
          clearState();
        },
        (error) => {
          console.log("EmailJS Error Details:", error);
          console.log("Error status:", error.status);
          console.log("Error text:", error.text);
          
          let errorMessage = "Sorry, there was an error sending your message. Please try again.";
          
          // Provide more specific error messages based on status codes
          if (error.status === 400) {
            errorMessage = "Bad request. Please check your EmailJS configuration (Service ID, Template ID, or Public Key).";
          } else if (error.status === 401) {
            errorMessage = "Unauthorized. Please check your EmailJS public key.";
          } else if (error.status === 404) {
            errorMessage = "Service or template not found. Please check your EmailJS service and template IDs.";
          } else if (error.text && error.text.includes("Invalid template ID")) {
            errorMessage = "Template ID is not configured. Please set up your EmailJS template.";
          } else if (error.text && error.text.includes("Invalid service ID")) {
            errorMessage = "Service ID is invalid. Please check your EmailJS service configuration.";
          } else if (error.text && error.text.includes("Invalid public key")) {
            errorMessage = "Public key is invalid. Please check your EmailJS public key.";
          }
          
          setEmailStatus({
            type: "error",
            message: errorMessage
          });
        }
      );
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p style={{ color: "#fff" }}>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form ref={form} name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
                {emailStatus.message && (
                  <div className={`alert ${emailStatus.type === 'success' ? 'alert-success' : 'alert-danger'}`} style={{
                    marginTop: '20px',
                    padding: '15px 20px',
                    borderRadius: '5px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    {emailStatus.type === 'success' && (
                      <i className="fa fa-check-circle" style={{fontSize: '18px'}}></i>
                    )}
                    {emailStatus.type === 'error' && (
                      <i className="fa fa-exclamation-circle" style={{fontSize: '18px'}}></i>
                    )}
                    <span>{emailStatus.message}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
