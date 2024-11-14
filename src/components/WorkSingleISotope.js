import Isotope from "isotope-layout";
import { Fragment, useEffect, useRef } from "react";
const WorkSingleISotope = ({ images }) => {
  const isotope = useRef();
  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".m-gallery", {
        itemSelector: ".col-xs-12",
        //    layoutMode: "fitRows",
        percentPosition: true,
        masonry: {
          columnWidth: ".col-xs-12",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 1000);
  }, []);
  return (
    <Fragment>
      <div className="m-gallery">
        <div className="row">
        {images.map((image, index) => (
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="works-item">
              <div
                className="image scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="img">
                  <a
                    href="assets/images/work5.jpeg"
                    className="has-popup-image"
                  >
                    <img
                      decoding="async"
                      src={image.image.url}
                      alt={image.image.alt || `Image ${index + 1}`} 
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>
            </div>
          
          </div>
          ))};
         
        </div>
      </div>
    </Fragment>
  );
};
export default WorkSingleISotope;
