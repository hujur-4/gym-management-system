const Trainers = () => {
  const trainers = [
    {
      name: "John Doe",
      role: "Strength Coach",
      experience: "8 Years Experience",
      image: "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg"
    },
    {
      name: "Sarah Smith",
      role: "Yoga Instructor",
      experience: "5 Years Experience",
      image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg"
    },
    {
      name: "Mike Wilson",
      role: "Nutrition Expert",
      experience: "6 Years Experience",
      image: "https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg"
    },
  ]

  return (
    <section className="trainers-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-white">
            Our <span className="main-color">Trainers</span>
          </h2>
          <p className="text-secondary fs-5">
            Expert trainers dedicated to your fitness journey.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {trainers.map((trainer, index) => (
            <div className="col-md-4" key={index}>
              <div className="trainer-card">
                {/* Image with zoom */}
                <div className="trainer-img-wrapper">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="trainer-img"
                  />
                  {/* Overlay on hover */}
                  <div className="trainer-overlay">
                    <p className="text-white fw-bold mb-0">View Profile</p>
                  </div>
                </div>
                {/* Content */}
                <div className="trainer-content p-3 text-center">
                  <h5 className="text-white fw-bold mb-1">{trainer.name}</h5>
                  <p className="main-color mb-1 fw-semibold">{trainer.role}{"  ,  "}
                  <span className="text-secondary mb-0">{trainer.experience}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trainers