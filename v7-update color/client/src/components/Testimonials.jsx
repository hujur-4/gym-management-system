import { useState, useEffect } from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      feedback: "Lost 10 kg in 4 months! The trainers here are amazing and very supportive throughout my journey.",
      rating: 5,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
    },
    {
        name: "Priya Patel",
        feedback: "Best trainers and facilities. I have never felt more motivated to work out every single day!",
        rating: 5,
        image: "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg"
    },
    {
      name: "Arjun Mehta",
      feedback: "The personalized workout plan changed my life. I feel stronger and healthier than ever before.",
      rating: 4,
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
    },
    {
        name: "Sneha Reddy",
        feedback: "Friendly environment and expert guidance. Best investment I made for my health and fitness.",
        rating: 5,
        image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg"
    },
  ]

  const [current, setCurrent] = useState(0)
  const [next, setNext] = useState(null)
  const [direction, setDirection] = useState('next')
  const [animating, setAnimating] = useState(false)

  const changeTo = (index, dir = 'next') => {
    if (animating) return
    setAnimating(true)
    setDirection(dir)
    setNext(index)

    setTimeout(() => {
      setCurrent(index)
      setNext(null)
      setAnimating(false)
    }, 500)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      changeTo((current + 1) % testimonials.length, 'next')
    }, 2500)
    return () => clearInterval(timer)
  }, [current, animating])

  const handlePrev = () => changeTo((current - 1 + testimonials.length) % testimonials.length, 'prev')
  const handleNext = () => changeTo((current + 1) % testimonials.length, 'next')

  const renderCard = (index, animClass) => {
    const t = testimonials[index]
    return (
      <div className={`testimonial-card p-5 text-center ${animClass}`} key={index}>
        <div className="testimonial-img-wrapper mx-auto mb-3">
          <img src={t.image} alt={t.name} className="testimonial-img" />
        </div>
        <div className="mb-2">
          {[...Array(t.rating)].map((_, i) => (
            <span key={i} className="main-color fs-5">★</span>
          ))}
        </div>
        <p className="text-secondary fst-italic mb-3 fs-5">"{t.feedback}"</p>
        <h6 className="text-white fw-bold mb-0">{t.name}</h6>
        <small className="main-color">Gym Member</small>
      </div>
    )
  }

  return (
    <section className="testimonials-section py-5">
      <div className="container-fluid px-0">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-white">
            What Our <span className="main-color">Members Say</span>
          </h2>
          <p className="text-secondary fs-5">Real results from real people.</p>
        </div>

        <div className="d-flex align-items-center justify-content-center gap-3">

          {/* Left Arrow */}
          <button className="testimonial-arrow" onClick={handlePrev}>&#8592;</button>

          {/* Slide wrapper */}
          <div className="testimonial-wrapper">
            {renderCard(current, animating ? (direction === 'next' ? 'slide-out-left' : 'slide-out-right') : '')}
            {next !== null && renderCard(next, direction === 'next' ? 'slide-in-right' : 'slide-in-left')}
          </div>

          {/* Right Arrow */}
          <button className="testimonial-arrow" onClick={handleNext}>&#8594;</button>

        </div>

        {/* Dots */}
        <div className="d-flex justify-content-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`testimonial-dot ${i === current ? 'active' : ''}`}
              onClick={() => changeTo(i, i > current ? 'next' : 'prev')}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Testimonials