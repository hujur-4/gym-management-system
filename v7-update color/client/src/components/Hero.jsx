

import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()

  const goRegister = () => {
    navigate('/register')
  }

  const goMembership = () => {
    if (window.location.pathname === '/') {
      const section = document.getElementById('membership')
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/#membership')
    }
  }

  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-heading fw-bold text-white">
            Transform Your Body, <br /> Transform Your Life
          </h1>
          <p className="text-secondary fs-5 mb-4">
            Join our fitness community and achieve your goals with expert
            trainers and modern equipment.
          </p>
          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-join rounded-pill px-4 py-2 fw-bold"
              onClick={goRegister}
            >
              Join Now
            </button>
            <button
              type="button"
              className="btn btn-explore rounded-pill px-4 py-2 fw-bold"
              onClick={goMembership}
            >
              Explore Plans
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero