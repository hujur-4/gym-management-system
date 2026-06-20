const ServicesSection = () => {
  const services = [
    {
      icon: "🏋️",
      title: "Weight Training",
      desc: "Build strength and muscle with guided weight training programs.",
      image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
    },
    {
        icon: "🤸",
        title: "Yoga & Flexibility",
        desc: "Improve flexibility and mental wellness through yoga sessions.",
        image: "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg"
    },
            {
      icon: "🏃",
      title: "Cardio Training",
      desc: "Boost endurance and burn calories with intense cardio workouts.",
      image: "https://images.pexels.com/photos/936094/pexels-photo-936094.jpeg"
    },
    {
      icon: "🥗",
      title: "Diet Consultation",
      desc: "Get personalized diet plans from our certified nutritionists.",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
    },
    {
      icon: "💪",
      title: "Personal Training",
      desc: "One-on-one sessions with expert trainers for faster results.",
      image: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg"
    },
    {
      icon: "👥",
      title: "Group Classes",
      desc: "Fun and energetic group sessions to keep you motivated.",
      image: "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg"
    },
  ]

  return (
    <section id="services" className="services-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-white">
            Our <span className="main-color">Services</span>
          </h2>
          <p className="text-secondary fs-5">
            Everything you need to achieve your fitness goals.
          </p>
        </div>

        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-4" key={index}>
              <div className="service-card">
                {/* Image with zoom */}
                <div className="service-img-wrapper">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-img"
                  />
                </div>
                {/* Content */}
                <div className="service-content p-4">
                  <div className="service-icon mb-2">{service.icon}</div>
                  <h5 className="text-white fw-bold">{service.title}</h5>
                  <p className="text-secondary mb-0">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection