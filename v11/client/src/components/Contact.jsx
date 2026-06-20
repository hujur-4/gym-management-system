const Contact = () => {
    return (
      <section id="contact" className="contact-section">
        <div className="contact-overlay">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
  
              {/* Left Side - Text */}
              <div className="col-md-6">
                <h2 className="contact-left-heading fw-bold text-white">
                  Ready to Start <br />
                  <span className="main-color">Your Fitness Journey?</span>
                </h2>
                <p className="text-white fs-5 mt-3">
                  Come visit us and see what all the hype is about!
                </p>
  
                {/* Contact Info */}
                <div className="mt-4 d-flex flex-column gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <span className="contact-icon">📍</span>
                    <span className="text-white">123 Fitness Street, Hyderabad, India</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="contact-icon">📞</span>
                    <span className="text-white">+91 98765 43210</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="contact-icon">✉️</span>
                    <span className="text-white">info@fitnessgym.com</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="contact-icon">🕒</span>
                    <span className="text-white">Mon - Sat: 6:00 AM – 10:00 PM</span>
                  </div>
                </div>
              </div>
  
              {/* Right Side - Form */}
              <div className="col-md-6">
                <div className="contact-form p-4">
                  <h4 className="text-white fw-bold text-center mb-1">GET IN TOUCH</h4>
                  <p className="text-secondary text-center mb-4">We'll get back to you shortly</p>
  
                  <input
                    type="text"
                    className="contact-input mb-3"
                    placeholder="Your Name"
                  />
                  <input
                    type="text"
                    className="contact-input mb-3"
                    placeholder="Your Phone Number"
                  />
                  <input
                    type="email"
                    className="contact-input mb-3"
                    placeholder="Your Email"
                  />
                  <textarea
                    className="contact-input mb-4"
                    placeholder="How can we help?"
                    rows={4}
                  />
  
                <div className="d-flex gap-3">
                    <button className="btn btn-explore w-50 rounded-pill fw-bold py-2">
                        Request Callback
                    </button>
                    <button className="btn btn-join w-50 rounded-pill fw-bold py-2">
                        Send Message
                    </button>
                </div>
                </div>
              </div>
  
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default Contact