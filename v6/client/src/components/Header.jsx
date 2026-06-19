import { Link } from "react-router-dom";
import logoicon from '../assets/fitness-icon.svg';
function Header() {
  return (
    <header className="d-flex align-items-center px-4">
      <div className="d-flex align-items-center">
        <img
          style={{ width: '70px', margin: '10px', height: '70px' }}
          src={logoicon}
          alt=""
        />
        <h2 className="logo-content fs-2 fw-bold main-color">
          Fitness GYM
        </h2>
      </div>

      <div className="navbar-brand d-flex gap-4 ms-auto px-5">
        <a className="main-nav-a fs-4 text-white" href="/">Home</a>
        <a className="main-nav-a fs-4 text-white" href="#about">About</a>
        <a className="main-nav-a fs-4 text-white" href="#services">Services</a>
        <a className="main-nav-a fs-4 text-white" href="#membership">Plans</a>
        <a className="main-nav-a fs-4 text-white" href="#contact">Contact</a>

        <button className="login-btn px-4 pt-1 pb-1 rounded-4">
          <Link className="text-decoration-none fs-4 text-white" to="/login">
            Login
          </Link>
          <span className="text-white mx-2 fs-3">/</span>
          <Link className="text-decoration-none fs-4 text-white" to="/register">
            Register
          </Link>
        </button>
      </div>
    </header>
  );
}

export default Header;