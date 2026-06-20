const Membership = () => {
    const plans = [
      {
        title: "Basic",
        duration: "1 Month",
        price: "₹999",
        features: ["Access to Gym", "Cardio Equipment", "Locker Room"],
        highlighted: false,
      },
      {
        title: "Standard",
        duration: "3 Months",
        price: "₹2499",
        features: ["All Basic Features", "Group Classes", "Diet Consultation", "Fitness Assessment"],
        highlighted: true,
      },
      {
        title: "Premium",
        duration: "1 Year",
        price: "₹7999",
        features: ["All Standard Features", "Personal Trainer", "Nutrition Plan", "Unlimited Classes", "Priority Support"],
        highlighted: false,
      },
    ]
  
    return (
      <section id="membership" className="membership-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-white">
              Membership <span className="main-color">Plans</span>
            </h2>
            <p className="text-secondary fs-5">
              Choose the plan that fits your goals and budget.
            </p>
          </div>
  
          <div className="row g-4 justify-content-center">
            {plans.map((plan, index) => (
              <div className="col-md-4" key={index}>
                <div className={`membership-card p-4 h-100 d-flex flex-column ${plan.highlighted ? 'membership-card-highlighted' : ''}`}>
                  
                  {plan.highlighted && (
                    <div className="popular-badge mb-3">⭐ Most Popular</div>
                  )}
  
                  <h4 className="text-white fw-bold">{plan.title}</h4>
                  <p className="text-secondary">{plan.duration}</p>
  
                  <div className="plan-price mb-3">
                    <span className="main-color fw-bold">{plan.price}</span>
                  </div>
  
                  <ul className="plan-features list-unstyled mb-4 flex-grow-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="text-secondary mb-2">
                        <span className="main-color me-2">✓</span>{feature}
                      </li>
                    ))}
                  </ul>
  
                  <button className={`btn fw-bold w-100 rounded-pill ${plan.highlighted ? 'btn-join' : 'btn-explore'}`}>
                    Join Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default Membership