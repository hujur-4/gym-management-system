import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-section pt-5 pb-3">
      <div className="container-fluid px-5">

        <div className="row g-4">

          {/* Brand */}
          <div className="col-lg-4 col-md-12">
            <h3 className="fw-bold text-white mb-4">
              💪 Fitness <span className="main-color">GYM</span>
            </h3>

            <p className="text-secondary footer-text">
              Transform your body and mind with our expert trainers and
              modern facilities. Your fitness journey starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6">
            <h4 className="text-white fw-bold mb-4">
              Quick Links
            </h4>

            <div className="row">
              <div className="col-6">
                <ul className="list-unstyled footer-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/services">Services</a></li>
                </ul>
              </div>

              <div className="col-6">
                <ul className="list-unstyled footer-links">
                  <li><a href="/membership">Membership</a></li>
                  <li><a href="/trainers">Trainers</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="col-lg-4 col-md-6">
            <h4 className="text-white fw-bold mb-4">
              Follow Us
            </h4>

            <div className="d-flex gap-3 mb-3">
              <a
                href="#"
                className="social-icon-circle"
                style={{ backgroundColor: "#1877f2" }}
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="social-icon-circle"
                style={{ backgroundColor: "#e1306c" }}
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="social-icon-circle"
                style={{ backgroundColor: "#1da1f2" }}
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="social-icon-circle"
                style={{ backgroundColor: "#ff0000" }}
              >
                <FaYoutube />
              </a>
            </div>

            <p className="text-secondary footer-text">
              Follow us for daily fitness tips, workout videos and
              motivation!
            </p>
          </div>

        </div>

        <hr className="footer-divider my-4" />

        <div className="text-center">
          <p className="text-secondary mb-0">
            © 2025 Fitness GYM. All rights reserved.
            Made with ❤️ for fitness lovers.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;