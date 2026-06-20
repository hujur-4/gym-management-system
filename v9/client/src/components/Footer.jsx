import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer-section pt-5 pb-3">
      <div className="container">
        <div className="row g-4 mb-4">

          {/* Brand */}
          <div className="col-md-4">
            <h4 className="fw-bold text-white mb-3">
              💪 Fitness <span className="main-color">GYM</span>
            </h4>
            <p className="text-secondary">
              Transform your body and mind with our expert trainers and modern facilities. Your fitness journey starts here.
            </p>
          </div>

          {/* Quick Links - 2 columns */}
          <div className="col-md-4">
            <h5 className="text-white fw-bold mb-3">Quick Links</h5>
            <div className="row">
              <div className="col-6">
                <ul className="list-unstyled footer-links">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Services</a></li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled footer-links">
                  <li><a href="#">Membership</a></li>
                  <li><a href="#">Trainers</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h5 className="text-white fw-bold mb-3">Follow Us</h5>
            <div className="d-flex gap-2">
              <a href="#" className="social-icon-circle" style={{ backgroundColor: '#1877f2' }}>
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon-circle" style={{ backgroundColor: '#e1306c' }}>
                <FaInstagram />
              </a>
              <a href="#" className="social-icon-circle" style={{ backgroundColor: '#1da1f2' }}>
                <FaTwitter />
              </a>
              <a href="#" className="social-icon-circle" style={{ backgroundColor: '#ff0000' }}>
                <FaYoutube />
              </a>
            </div>
            <p className="text-secondary mt-3 mb-0">
              Follow us for daily fitness tips, <br /> workout videos and motivation!
            </p>
          </div>

        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-secondary mb-0">
            © 2025 Fitness GYM. All rights reserved. Made with ❤️ for fitness lovers.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer