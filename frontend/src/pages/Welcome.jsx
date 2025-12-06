import React from "react";
// import "./Welcome.css";

 export default function Welcome() {
  const services = [
    {
      id: 1,
      name: "Savings Account",
      price: "4% Interest",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
      desc: "Secure savings account with high interest rates.",
    },
    {
      id: 2,
      name: "Credit Card",
      price: "0% Annual Fee",
      img: "https://cdn-icons-png.flaticon.com/512/2331/2331949.png",
      desc: "Get rewards, cashback, and secure transactions.",
    },
    {
      id: 3,
      name: "Loan Services",
      price: "Low EMIs",
      img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
      desc: "Instant personal, home, and car loans available.",
    },
    {
      id: 4,
      name: "Insurance",
      price: "Best Plans",
      img: "https://cdn-icons-png.flaticon.com/512/2913/2913465.png",
      desc: "Health, life, and vehicle insurance with full coverage.",
    },
    {
      id: 5,
      name: "Fixed Deposit",
      price: "7.5% Interest",
      img: "https://cdn-icons-png.flaticon.com/512/650/650199.png",
      desc: "Guaranteed returns with flexible tenure.",
    },
    {
      id: 6,
      name: "Net Banking",
      price: "Free Service",
      img: "https://cdn-icons-png.flaticon.com/512/2910/2910793.png",
      desc: "Send money, pay bills, and manage your account easily.",
    },
  ];

  return (
    <div className="welcome-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">MyBank</h2>
        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#services">Services</a>
          <a href="#features">Features</a>
          <a href="#footer">Contact</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1>Your Trusted Banking Partner</h1>
          <p>Secure. Fast. Reliable. Banking made simple.</p>
          <button className="shop-btn">Open Account</button>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="products">
        <h2>🏦 Our Banking Services</h2>
        <div className="product-grid">
          {services.map((s) => (
            <div key={s.id} className="product-card">
              <img src={s.img} alt={s.name} />
              <h3>{s.name}</h3>
              <p className="price">{s.price}</p>
              <p className="desc">{s.desc}</p>
              <button className="buy-btn">Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section id="features" className="features">
        <h2>⭐ Why Bank With Us?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Secure Transactions</h3>
            <p>All transfers protected with 256-bit encryption.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Customer Care</h3>
            <p>Always available to help you with your queries.</p>
          </div>
          <div className="feature-card">
            <h3>Low Interest Loans</h3>
            <p>Affordable EMIs with flexible repayment options.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="footer">
        <p>© 2025 MyBank. All Rights Reserved.</p>
      </footer>

    </div>
  );
}