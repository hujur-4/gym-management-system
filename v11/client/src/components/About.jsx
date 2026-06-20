const AboutSection = () => {
  const features = [
  {
    icon: "🏅",
    title: "Certified Trainers",
    desc: "Our expert trainers are certified and experienced to guide you."
  },
  {
    icon: "🏋️",
    title: "Modern Equipment",
    desc: "State-of-the-art equipment to help you train effectively."
  },
  {
    icon: "📋",
    title: "Personalized Workout Plans",
    desc: "Customized plans designed specifically for your goals."
  },
  {
    icon: "🥗",
    title: "Nutrition Guidance",
    desc: "Expert dietary advice to complement your fitness journey."
  },
  {
    icon: "🤝",
    title: "Friendly Environment",
    desc: "A welcoming community that motivates and supports you."
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    desc: "Monitor your fitness journey with detailed progress reports and analytics."
  }
];

  return (
    <section id="about" className="about-section py-5">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="about-heading fw-bold text-white">
            Why Choose <span className="main-color">Us?</span>
          </h2>
          <p className="text-secondary fs-5">
            We provide everything you need to reach your fitness goals.
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="about-card p-4 h-100">
                <div className="about-icon mb-3">{feature.icon}</div>
                <h5 className="text-white fw-bold">{feature.title}</h5>
                <p className="text-secondary mb-0">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection