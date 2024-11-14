// Example for WorksSection.jsx
import React from "react";
// Make sure the path is correct
import dynamic from 'next/dynamic';
const PortfolioIsotope = dynamic(
  () => import("../PortfolioIsotope"),
  {
    ssr: false,
  }
);
const WorksSection = () => {
  return (
    <section className="lui-section lui-gradient-top" id="works-section">
      {/* Heading */}
      <div className="lui-heading">
        <div className="container">
          <div className="m-titles align-center">
            <h2
              className="m-title splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> Portfolio </span>
            </h2>
            <div
              className="m-subtitle splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> my <b>Cases</b> </span>
            </div>
          </div>
        </div>
      </div>
      {/* Works */}
      <div className="v-line v-line-right">
        <div className="container">
          <PortfolioIsotope />
          <div className="lui-bgtitle">
            <span> Portfolio </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
