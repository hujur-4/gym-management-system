import { useState, useEffect } from "react";

// Plan mapping from MongoDB value to display
const planDetails = {
  standard: {
    name: "Basic",
    price: "₹999",
    duration: "1 Month",
    color: "#aaaaaa",
    features: [
      "Access to Gym",
      "Cardio Equipment",
      "Locker Room",
    ],
  },
  premium: {
    name: "Standard",
    price: "₹2499",
    duration: "3 Months",
    color: "#22C55E",
    popular: true,
    features: [
      "All Basic Features",
      "Group Classes",
      "Diet Consultation",
      "Fitness Assessment",
    ],
  },
  vip: {
    name: "Premium",
    price: "₹7999",
    duration: "1 Year",
    color: "#ffffff",
    features: [
      "All Standard Features",
      "Personal Trainer",
      "Nutrition Plan",
      "Unlimited Classes",
      "Priority Support",
    ],
  },
};

// Status badge color
const statusColor = {
  active: "success",
  pending: "warning",
  expired: "danger",
};

function Membership() {
  const [membership, setMembership] = useState(null);
  const [fetching, setFetching] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/membership", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setMembership(data);
        }
      } catch (error) {
        console.error("Fetch membership error:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchMembership();
  }, []);

  // Calculate days remaining
  const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return 0;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  // Renewal status based on days
  const getRenewalStatus = (days) => {
    if (days <= 0) return { text: "Expired", color: "danger" };
    if (days <= 7) return { text: "Renewal Soon!", color: "warning" };
    return { text: "Not Required", color: "success" };
  };

  // Format date nicely
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (fetching) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="spinner-border" style={{ color: "#22C55E" }} />
      </div>
    );
  }

  if (!membership) {
    return (
      <div className="text-center mt-5">
        <h5 className="text-muted">No membership found.</h5>
        <p className="text-muted">Please contact the admin to assign a plan.</p>
      </div>
    );
  }

  const currentPlan = planDetails[membership.membershipType.toLowerCase()] || {};
  const daysRemaining = getDaysRemaining(membership.membershipEndDate);
  const renewalStatus = getRenewalStatus(daysRemaining);

  return (
    <div className="container-fluid">

      {/* Page Heading */}
      <div className="mb-3">
        <h4 className="fw-bold">💳 My Membership</h4>
      </div>

      {/* Current Membership Info */}
      <div className="card border-0 shadow-sm p-4 mb-4"
        style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}
      >
        <div className="row align-items-center">

          {/* Current Plan */}
          <div className="col-md-3 text-center border-end border-secondary">
            <small style={{ color: "#aaaaaa" }}>Current Plan</small>
            <h3 className="fw-bold mt-1" style={{ color: "#22C55E" }}>
              {currentPlan.name || membership.membershipType}
            </h3>
            <span className={`badge bg-${statusColor[membership.status] || "secondary"} text-uppercase`}>
              {membership.status}
            </span>
          </div>

          {/* Start Date */}
          <div className="col-md-3 text-center border-end border-secondary">
            <small style={{ color: "#aaaaaa" }}>Start Date</small>
            <h5 className="fw-bold mt-1">
              {formatDate(membership.membershipStartDate)}
            </h5>
          </div>

          {/* Expiry Date */}
          <div className="col-md-3 text-center border-end border-secondary">
            <small style={{ color: "#aaaaaa" }}>Expiry Date</small>
            <h5 className="fw-bold mt-1">
              {formatDate(membership.membershipEndDate)}
            </h5>
          </div>

          {/* Days Remaining */}
          <div className="col-md-3 text-center">
            <small style={{ color: "#aaaaaa" }}>Days Remaining</small>
            <h3 className="fw-bold mt-1" style={{ color: "#22C55E" }}>
              {daysRemaining > 0 ? daysRemaining : 0}
            </h3>
            <span className={`badge bg-${renewalStatus.color}`}>
              {renewalStatus.text}
            </span>
          </div>

        </div>
      </div>

      {/* Available Plans */}
      <div className="mb-3">
        <h5 className="fw-bold">Available Plans</h5>
      </div>

      <div className="row">
        {Object.entries(planDetails).map(([key, plan]) => {
          const isCurrentPlan = membership.membershipType.toLowerCase() === key;

          return (
            <div className="col-md-4 mb-4" key={key}>
              <div
                className="card border-0 shadow-sm h-100 p-4"
                style={{
                  backgroundColor: "#1a1a1a",
                  color: "#ffffff",
                  border: isCurrentPlan
                    ? `2px solid #22C55E !important`
                    : "2px solid transparent",
                  outline: isCurrentPlan ? "2px solid #22C55E" : "none",
                }}
              >

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="text-center mb-2">
                    <span
                      className="badge px-3 py-2"
                      style={{ backgroundColor: "#22C55E", color: "#1a1a1a" }}
                    >
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrentPlan && (
                  <div className="text-center mb-2">
                    <span
                      className="badge px-3 py-2"
                      style={{ backgroundColor: "#28a745", color: "#fff" }}
                    >
                      ✅ Your Current Plan
                    </span>
                  </div>
                )}

                {/* Plan Name */}
                <h4 className="fw-bold">{plan.name}</h4>
                <small style={{ color: "#aaaaaa" }}>{plan.duration}</small>

                {/* Price */}
                <h2
                  className="fw-bold my-3"
                  style={{ color: "#22C55E" }}
                >
                  {plan.price}
                </h2>

                {/* Features */}
                <ul className="list-unstyled mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2">
                      <span style={{ color: "#22C55E" }}>✓ </span>
                      <span style={{ color: "#cccccc" }}>{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Membership;