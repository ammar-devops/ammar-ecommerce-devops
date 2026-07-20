function Features() {
  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Free & fast shipping across India with real-time tracking.",
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "100% secure checkout with trusted payment gateways.",
    },
    {
      icon: "🛡️",
      title: "Warranty",
      description: "All premium products include manufacturer warranty.",
    },
    {
      icon: "🎧",
      title: "24×7 Support",
      description: "Friendly customer support whenever you need help.",
    },
  ];

  return (
    <section className="features">
      {features.map((feature) => (
        <div className="feature-card" key={feature.title}>
          <div className="feature-icon">{feature.icon}</div>

          <h3>{feature.title}</h3>

          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
}

export default Features;
