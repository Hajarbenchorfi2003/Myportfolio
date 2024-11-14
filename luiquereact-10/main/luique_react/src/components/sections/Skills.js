// Import necessary modules
import { useState,useEffect} from 'react';
import { client } from "../../utils/prismicClient";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all documents of type "skills"
        const skillsResponse = await client.getAllByType("skills");

        // Map and format the data to match your component's structure
        setSkills(
          skillsResponse.map((doc) => ({
            name: doc.data.name[0]?.text || "",
            description: doc.data.description[0]?.text || "",
            level: parseInt(doc.data.level[0]?.text || "0"),
          }))
        );
      } catch (error) {
        console.error("Error fetching skills data from Prismic:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="lui-section lui-gradient-center" id="skills-section">
    {/* Heading */}
    <div className="lui-heading">
      <div className="container">
        <div className="m-titles align-center">
          <h2
            className="m-title splitting-text-anim-1 scroll-animate"
            data-splitting="words"
            data-animate="active"
          >
            <span> Professional Skills </span>
          </h2>
          <div
            className="m-subtitle splitting-text-anim-1 scroll-animate"
            data-splitting="words"
            data-animate="active"
          >
            <span>
              {" "}
              my <b>Talent</b>{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
    {/* Skills */}
   
      <div className="v-line v-line-left">
        <div className="container">
          <div className="row">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="col-xs-12 col-sm-6 col-md-4 col-lg-4 skills-item scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <h6 className="name">
                  <span>{skill.name}</span>
                </h6>
                <div className="text">
                  <p>{skill.description}</p>
                </div>
                <div className="dots">
                  <div className="dot" style={{ width: `${skill.level}%` }}>
                    <span />
                  </div>
                </div>
                <div className="value">
                  <span className="num">
                    {skill.level} <span>%</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="lui-bgtitle">
            <span>Skills</span>
          </div>
        </div>
      </div>
      </section>
    
  );
};

export default Skills;
