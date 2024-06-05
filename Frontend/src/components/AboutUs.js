import React from "react";

export default function AboutUs() {
  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-header bg-dark text-white text-center py-4">
          <h1 className="h4" style={{ fontWeight: "bold" }}>ABOUT US</h1>
        </div>
        <div className="card-body text-center py-5">
          <p className="lead">
            We love Web Design & Technology.
          </p>
          <p className="lead">
            We are a small team, but we possess a highly skilled work force.
          </p>
          <p className="lead">
            Our goal is to produce great work with positive energy.
          </p>
          <p className="lead">
            Let’s enjoy creating together.
          </p>
        </div>
      </div>
    </div>
  );
}
