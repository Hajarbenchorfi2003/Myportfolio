// src/components/Services.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { servicesSliderProps } from "../../sliderProps";
import React, { useEffect, useState } from "react";
import { client } from "../../utils/prismicClient";
import { RichText } from "@prismicio/react"; // Import de RichText



 
const Services = () => {
  const [services, setServices] = useState([]);

  // Fonction pour récupérer les données de Prismic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getByType("service"); // Assurez-vous que le type est correct
        console.log("Prismic response:", response);
        const fetchedServices = response.results.map((doc) => ({
          id: doc.id|| [],
          name: doc.data.name|| [], // Accédez directement au nom du service
          description: doc.data.description|| [], // Champ Rich Text pour la description
          // Ajoutez la logique pour l'icône et l'image si nécessaire
         
        }));
        setServices(fetchedServices);
        console.log("Fetched services:", fetchedServices);
        
      } catch (error) {
        console.error("Erreur lors de la récupération des services depuis Prismic :", error);
      }
    };
    fetchData();
  }, []);

   
      
  return (
    <section className="lui-section lui-gradient-bottom" id="services-section">
      {/* Heading */}
      <div className="lui-heading">
        <div className="container">
          <div className="m-titles align-center">
            <h2
              className="m-title splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> What I Do </span>
            </h2>
            <div
              className="m-subtitle splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span>
                {" "}
                my <b>Services</b>{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Services */}
      <div className="v-line v-line-right">
        <div className="container">
          <Swiper
            {...servicesSliderProps}
            className="swiper-container js-services scrolla-element-anim-1 scroll-animate"
            data-animate="active"
          >
             {services.map((service) => (
            <SwiperSlide className="swiper-slide"  key={service.id}>
            <div className="services-item">
                  <div className="lui-subtitle">
                    <span> {service.name.length > 0 ? service.name.map((item, index) => (
            <span key={index}>{item.text}</span> // Affichage de chaque nom
          )) : "Unnamed Service"}</span>
                  </div>
                  <div className="icon"></div>
                  <h5 className="lui-title">
                    <span> {service.name.length > 0 ? service.name.map((item, index) => (
            <span key={index}>{item.text}</span> // Affichage de chaque nom
          )) : "Unnamed Service"}</span>
                  </h5>
                  <div className="lui-text">
                  <div>
          {service.description.length > 0 ? service.description.map((item, index) => (
            <span key={index}>{item.text}</span> // Affichage de chaque description
          )) : "No Description Available"}
        </div>
                  </div> 
                 
                  <div className="image" style={{ backgroundImage: "url(assets/images/pat-2.png)" }} />
                </div>
              </SwiperSlide>
            ))}
            {/* Repeat similar structure for other services */}
            <div className="swiper-pagination" />
          </Swiper>
          <div className="lui-bgtitle">
            <span> Services </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
