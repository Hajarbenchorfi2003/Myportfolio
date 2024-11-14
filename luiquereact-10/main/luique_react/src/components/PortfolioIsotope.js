import Isotope from "isotope-layout";
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from "react";
import { client } from "../utils/prismicClient"

const PortfolioIsotope = ({ noViewMore }) => {
  // Data state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
	console.log("portfolio:",data);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await client.getByType("project");
          console.log("Prismic  project response:", response); // Check if the response is correct
       // Fetching projects from Prismic
          const items = response.results.map((doc) => ({
            id: doc.uid,
            category: doc.data.category,
            title: doc.data.title,
            description: doc.data.description[0]?.text || "",
            image: doc.data.images[0]?.image.url || "default-image.jpg", // Use default image if not available
            filterClass: doc.data.filterclass|| "all", // Default to 'all' if no filter class
          }));
          setData(items);
          
          setLoading(false);
         
         
        } catch (error) {
          console.error("Error fetching projects from Prismic:", error);
          setLoading(false);
          
        }
      };
      fetchData();
    }, []);

  // Isotope reference and state
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");

  //Initialize Isotope layout once data is loaded
  useEffect(() => {
    if (data.length > 0) {
      isotope.current = new Isotope(".works-items", {
        itemSelector: ".works-col",
        percentPosition: true,
        masonry: {
          columnWidth: ".works-col",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }
    return () => isotope.current?.destroy();
  }, [data]);

  // Handle filter changes
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);

  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };

  const activeBtn = (value) => (value === filterKey ? "active" : "");

  if (loading) return <div>Loading...</div>; // Show loading message while data is being fetched

  return (
    <Fragment>
      <div className="works-box">
        <div
          className="filter-links scrolla-element-anim-1 scroll-animate"
          data-animate="active"
        >
          <a
            className={`c-pointer lui-subtitle ${activeBtn("*")}`}
            onClick={handleFilterKeyChange("*")}
            data-href=".works-col"
          >
            All
          </a>
          <a
            className={`c-pointer lui-subtitle ${activeBtn("e-commerce")}`}
            onClick={handleFilterKeyChange("e-commerce")}
            data-href=".e-commerce"
          >
            E-commerce
          </a>
          <a
            className={`c-pointer lui-subtitle ${activeBtn("management")}`}
            onClick={handleFilterKeyChange("management")}
            data-href=".management"
          >
            Management
          </a>
          <a
            className={`c-pointer lui-subtitle ${activeBtn("reservation")}`}
            onClick={handleFilterKeyChange("reservation")}
            data-href=".reservation"
          >
            Reservation
          </a>
        </div>

        <div className="works-items works-masonry-items row">
          {data.map((item) => (
            <div
              key={item.id}
              className={`works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 ${item.filterClass}`}
            >
              <div
                className="works-item scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  <div className="img">
                    <Link legacyBehavior href={`/work-single/${item.id}`}>
                      <a>
                        <img
                          decoding="async"
                          src={item.image}
                          alt={item.title}
                        />
                        <span className="overlay" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="desc">
                  <span className="category">{item.category}</span>
                  <h5 className="name">
                    <Link legacyBehavior href="/work-single">
                      <a>{item.title}</a>
                    </Link>
                  </h5>
                  <div className="text">
                    <p>{item.description}</p>
                  </div>
                  <Link legacyBehavior href="/work-single">
                    <a className="lnk">See project</a>
                  </Link>
                </div>
                <div
                  className="bg-img"
                  style={{
                    backgroundImage: "url(assets/images/pat-2.png)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {!noViewMore && (
          <div className="load-more-link">
            <Link legacyBehavior href="/works">
              <a
                className="btn scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span>View More</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default PortfolioIsotope;
