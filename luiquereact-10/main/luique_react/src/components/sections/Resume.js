import { useEffect,useState } from "react";
import { client } from "../../utils/prismicClient";

/* const educationData = [
  {
    id: 1,
    title: "Specialized Technician in Digital Development",
    academy: "Technician Diploma",
    dec: "Completed a specialized technician diploma in digital development with a focus on full-stack development.",
    startYear: "2022",
    endYear: "2024",
  },
  {
    id: 2,
    title: "Baccalaureate",
    academy: "High School",
    dec: "Obtained a baccalaureate diploma,physique science.",
    startYear: "2020",
    endYear: "2021",
  },
 
];

const experienceData = [
  {
    id: 1,
    title: "Project Developer - Internship",
    company: "OCP",
    dec: "Developed a project for managing interns during a 1.5-month internship.",
    startYear: "2024",
    endYear: "2024",
  },
  {
    id: 2,
    title: "Project Developer - Internship",
    company: "Development Agency",
    dec: "Currently working on Solvia, a maintenance management project.",
    startYear: "2024",
    endYear: false,
  },
]; */

const Resume = () => {
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [educationToggle, setEducationToggle] = useState(null);
  const [experienceToggle, setExperienceToggle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      

      try {
        const educationResponse = await client.getAllByType("education");
        const experienceResponse = await client.getAllByType("experience");
       
        setEducationData(
          educationResponse.map((doc) => ({
            id: doc.id,
            title: doc.data.title[0]?.text || "",
            academy: doc.data.academy[0]?.text || "",
            dec: doc.data.dec[0]?.text || "",
            startYear: doc.data.startyear[0]?.text || "",
            endYear: doc.data.endyear[0]?.text || "",
          }))
        );
       

        setExperienceData(
          experienceResponse.map((doc) => ({
            id: doc.id,
            title: doc.data.title[0]?.text || "",
            company: doc.data.company[0]?.text || "",
            dec: doc.data.dec[0]?.text || "",
            startYear: doc.data.startyear[0]?.text || "",
            endYear: doc.data.endyear[0]?.text || "",
          }))
        );
        
      } catch (error) {
        console.error("Error fetching data from Prismic:", error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <section className="lui-section lui-gradient-bottom" id="resume-section">
      {/* Heading */}
      <div className="lui-heading">
        <div className="container">
          <div className="m-titles align-center">
            <h2
              className="m-title splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> Resume </span>
            </h2>
            <div
              className="m-subtitle splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span>
                {" "}
                my <b>Story</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* History */}
      <div className="v-line v-line-left">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <h5
                className="history-title scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span> Education </span>
              </h5>
              <div className="history-items">
                {educationData.map((education, i) => (
                  <div
                    key={education.id}
                    className={`history-item lui-collapse-item scroll-animate ${
                      educationToggle === education.id ? "opened" : ""
                    }`}
                    data-animate="active"
                  >
                    <h6
                      className={`name lui-collapse-btn ${
                        educationToggle == education.id ? "active" : ""
                      }`}
                      onClick={() =>
                        setEducationToggle(
                          educationToggle == education.id ? null : education.id
                        )
                      }
                    >
                      <span> {education.academy} </span>
                    </h6>
                    <div className="history-content">
                      <div className="subname">
                        <span> {education.title} </span>
                      </div>
                      <div className="date lui-subtitle">
                        <span>
                          {" "}
                          {education.startYear} - {education.endYear}{" "}
                        </span>
                      </div>
                      <div className="text">
                        <div>
                          <p>{education.dec}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <h5
                className="history-title scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span> Experience </span>
              </h5>
              <div className="history-items">
                {experienceData.map((experience) => (
                  <div
                    className={`history-item lui-collapse-item scroll-animate ${
                      experience.id == experienceToggle ? "opened" : ""
                    }`}
                    data-animate="active"
                    key={experience.id}
                  >
                    <h6
                      className={`name lui-collapse-btn ${
                        experienceToggle == experience.id ? " active" : ""
                      }`}
                      onClick={() => setExperienceToggle(experience.id)}
                    >
                      <span> {experience.title} </span>
                    </h6>
                    <div className="history-content">
                      <div className="subname">
                        <span> {experience.company} </span>
                      </div>
                      <div className="date lui-subtitle">
                        <span>
                          {" "}
                          {experience.startYear} -{" "}
                          {experience.endYear ? (
                            experience.endYear
                          ) : (
                            <b>Present</b>
                          )}
                        </span>
                      </div>
                      <div className="text">
                        <div>
                          <p>{experience.dec}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lui-bgtitle">
            <span> History </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Resume;
