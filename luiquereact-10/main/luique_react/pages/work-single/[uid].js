// pages/work-single/[uid].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../src/layouts/Layout';
import { client } from '../../src/utils/prismicClient';
import dynamic from 'next/dynamic';
import { RichText } from "prismic-reactjs";

// Charger dynamiquement un composant pour afficher la galerie d'images du projet
const WorkSingleISotope = dynamic(() => import('../../src/components/WorkSingleISotope'), {
  ssr: false,  // Désactiver le rendu côté serveur pour ce composant
});

const WorkSingle = () => {
  const router = useRouter();
  const { uid } = router.query;  // Récupérer l'UID de l'URL

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
console.log(project);
  // Effet secondaire qui s'exécute lorsque l'UID change dans l'URL
  useEffect(() => {
    if (uid) {
      const fetchProject = async () => {
        try {
          // Requête à Prismic pour récupérer le projet par UID
          const response = await client.getByUID('project',uid);  // Assurez-vous que 'project' est un type dans Prismic
          setProject(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Erreur lors de la récupération du projet:', error);
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [uid]);  // Réexécuter lorsque l'UID change

  // Affichage pendant le chargement
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Si aucun projet n'est trouvé
  if (!project) {
    return <div>Projet introuvable</div>;
  }

  
    return (
      <Layout pageClassName={'portfolio-template'}>
   {/* Section Started Heading */}
   <section className="section section-inner started-heading">
        {/* Heading */}
        <div className="container">
          <div className="m-titles align-left">
            <h1
              className="m-title splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span>{project.title}</span>
            </h1>
            <div
              className="m-subtitle splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span>{project.filterclass}</span>
            </div>
          </div>
        </div>
          {/* Details */}
          <div className="v-line v-line-right v-line-top">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                <div className="m-details">
                  <div className="details-label">
                    <span>Year:</span>
                    <strong>
                      <span>{project.years}</span>
                    </strong>
                  </div>
                  <div className="details-label">
                    <span>Technology:</span>
                    <strong>
                      <span>{project.technology}</span>
                    </strong>
                  </div>
                  <div className="details-label">
                    <span>Categories:</span>
                    <strong>
                      <span>{project.category}</span>
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 align-right">
                <a
                  target="_blank"
                  href="https://bslthemes.com"
                  className="btn scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <span>Live Preview</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Image */}
      <div className="section section-inner">
        {/* Image */}
        <div className="m-image-large">
          <div className="image">
            <div
              className="img js-parallax"
              style={{
                backgroundImage: project.images && project.images[1] ? `url(${project.images[1].image.url})` : "url('default-image-url.jpg')", // Assurez-vous que project.images[1] existe
              }}
            />
          </div>
        </div>
      </div>
        {/* Section - Description */}
        <section className="section section-inner">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="post-content">
                <h4>Description</h4>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div className="post-content">
                <p>
              {project.description && RichText.render(project.description)} 
                
                </p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div className="post-content">
                <p>
                
                {project.details && RichText.render(project.details)} 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
       {/* Section - Gallery */}
       <div className="section section-inner">
        <div className="container">
          {/* Section Gallery */}
          <WorkSingleISotope images={project.images} />
        </div>
      </div>
       {/* Section - Description */}
       <section className="section section-inner">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="post-content">
                <h4>Conclusion</h4>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-12">
              <div className="post-content">
                <p>
               {project.conclusion && RichText.render(project.conclusion)}
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

     
    </Layout>
  );
    }
export default WorkSingle;
  