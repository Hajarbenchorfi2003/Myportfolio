// src/components/GettingStarted.jsx
import React, { useEffect, useState } from "react";
import { client } from "../../utils/prismicClient";
import { RichText } from "prismic-reactjs";

const GettingStarted = () => {
  const [profile, setProfile] = useState({
    firstname: [],
    lastname: [],
    description: [],
    job: [],
    profileImage: [],
    cvFile: "" 
  });

  // Fetch data from Prismic
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await client.getByType("profil");
        console.log("Prismic response:", response); // Check if the response is correct
       if (response.results.length > 0) {
        const profileData = response.results[0].data;

        // Setting the profile state based on response structure
        setProfile({
          firstname:  profileData.firstname || [],
          lastname: profileData.lastname|| [],
          description: profileData.description|| [],
          job: profileData.job || [],
          profileImage: profileData.profilimage.url || "default-profile-image.jpg",
          cvFile: profileData.cv_file.url || "", // Use default image if not available
        });

        console.log("Updated profile:", {
          firstname: profileData.firstname[0]?.text || "",
          lastname: profileData.lastname[0]?.text || "",
          description: profileData.description[0]?.text|| "",
          job: profileData.job[0]?.text || "",
          profileImage: profileData.profilimage.url,
          cvFile: profileData.cv_file.url || "",
        });
      }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="lui-section lui-section-hero lui-gradient-top" id="started-section">
      <div className="container">
        {/* Hero Started */}
        <div className="lui-started v-line v-line-left">
          <div className="section hero-started">
            <div className="content scrolla-element-anim-1 scroll-animate" data-animate="active">
              <div className="titles">
                <div className="lui-subtitle">
                  <span>
                    Hello, <b>my name is</b>
                  </span>
                </div>
                <h1 className="title splitting-text-anim-1 scroll-animate" data-splitting="chars" data-animate="active">
                <RichText render={profile.lastname} />
                  <span>
                    <b><RichText render={profile.firstname} /></b> 
                  </span>
                </h1>
                <div className="label lui-subtitle">
                  I am <strong><RichText render={profile.job} /></strong>
                </div>
              </div>
              <div className="description">
                <div>
                  <p><RichText render={profile.description} /></p>
                </div>
                <div className="social-links">
                  <a target="_blank" rel="nofollow" href="#">
                    <i aria-hidden="true" className="fab fa-twitter" />
                  </a>
                  <a target="_blank" rel="nofollow" href="#">
                    <i aria-hidden="true" className="fab fa-dribbble" />
                  </a>
                  <a target="_blank" rel="nofollow" href="#">
                    <i aria-hidden="true" className="fab fa-behance" />
                  </a>
                </div>
              </div>
              <div className="bts">
                <a target="_blank" href={profile.cvFile} className="btn">
                  <span>Download CV</span>
                </a>
                <a href="#skills-section" className="btn-lnk">
                  My Skills
                </a>
              </div>
            </div>
            <div className="slide scrolla-element-anim-1 scroll-animate" data-animate="active">
              <img decoding="async" src={profile.profileImage} alt="hajar benchorfi" />
              <span className="circle circle-1" />
              <span className="circle img-1" style={{ backgroundImage: "url(assets/images/pat-1.png)" }} />
              <span className="circle img-2" style={{ backgroundImage: "url(assets/images/pat-2.png)" }} />
              <span className="circle img-3" style={{ backgroundImage: "url(assets/images/pat-2.png)" }} />
              <div className="info-list">
                <ul>
                  <li>
                    <span className="num">3</span>
                    <span className="value">
                      Completed <strong>Projects</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lui-bgtitle">
            <span> Web Developer </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
