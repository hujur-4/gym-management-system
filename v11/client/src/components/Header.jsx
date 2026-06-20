import { Link } from "react-router-dom";
import logoicon from '../assets/fitness-icon.svg';
function Header() {
  return (
    <header className="d-flex align-items-center px-4">
      <div className="d-flex align-items-center">
        <img
          style={{ width: '60px', margin: '10px', height: '60px' }}
          src={logoicon}
          alt=""
        />
        <h2 className="logo-content fw-bold main-color">
          Fitness GYM
        </h2>
      </div>

      <div className="navbar-brand d-flex gap-3 align-items-center ms-auto px-5">
        <a className="main-nav-a text-white" href="/">Home</a>
        <a className="main-nav-a text-white" href="#about">About</a>
        <a className="main-nav-a text-white" href="#services">Services</a>
        <a className="main-nav-a text-white" href="#membership">Plans</a>
        <a className="main-nav-a text-white" href="#contact">Contact</a>

        <div className="d-flex gap-2 align-items-center auth-actions">
          <Link className="login-btn text-white" to="/login">
            Login
          </Link>
          <Link className="register-btn text-black" to="/register">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;