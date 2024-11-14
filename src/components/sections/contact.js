import React, { useEffect, useState } from 'react';
import { client } from "../../utils/prismicClient";
import emailjs from 'emailjs-com';

 const Contact= () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Paramètres de votre service EmailJS
    const serviceID = 'service_yvnkakz'; // Remplacez par votre service EmailJS
    const templateID = 'template_ouuc29t'; // Remplacez par votre modèle EmailJS

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    // Utilisation de EmailJS pour envoyer l'e-mail
    emailjs.send(serviceID, templateID, templateParams, 'g8I_zCqxxAJHmT73N')
      .then((response) => {
        console.log('Email successfully sent!', response);
        setStatus("Thanks, your message is sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" }); // Réinitialiser les champs
      }, (error) => {
        console.log('Failed to send email:', error);
        setStatus("There was an error sending your message. Please try again later.");
      });
  };

  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        // Fetch the 'contact' single type from Prismic
        const response = await client.getSingle('contact');
        console.log("Prismic response:", response); // Check if the response is correct
        setContactData(response.data); // Store the contact data
        console.log("Updated contact data:", contactData); // Display the updated contact data
        setLoading(false); // Stop loading

      } catch (error) {
        console.error("Error fetching contact data from Prismic:", error);
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can customize the loading UI
  }

  if (!contactData) {
    return <div>No contact information available.</div>;
  }
  




    return (
      
        <section className="lui-section lui-gradient-bottom" id="contact-section">
 {/* Heading */}
 <div className="lui-heading">
   <div className="container">
     <div className="m-titles align-center">
       <h2
         className="m-title splitting-text-anim-1 scroll-animate"
         data-splitting="words"
         data-animate="active"
       >
         <span> Contact Me </span>
       </h2>
       <div
         className="m-subtitle splitting-text-anim-1 scroll-animate"
         data-splitting="words"
         data-animate="active"
       >
         <span>
           {" "}
           Let’s <b>Talk About Ideas</b>
         </span>
       </div>
     </div>
   </div>
 </div>
 {/* Contact */}
 <div className="lui-contacts v-line v-line-left">
   <div className="container">
     <div className="row">
       <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
         <div className="numbers-items">
           <div
             className="numbers-item scrolla-element-anim-1 scroll-animate"
             data-animate="active"
           >
             <div className="icon">
               <i aria-hidden="true" className="far fa-map" />
             </div>
             <div className="title">
               <span> Address </span>
             </div>
             <div className="lui-text">
               <span> {contactData.address}</span>
             </div>
           </div>
           <div
             className="numbers-item scrolla-element-anim-1 scroll-animate"
             data-animate="active"
           >
             <div className="icon">
               <i aria-hidden="true" className="far fa-user" />
             </div>
             <div className="title">
               <span> Freelance </span>
             </div>
             <div className="lui-text">
               <span>{contactData.freelance}</span>
             </div>
           </div>
           <div
             className="numbers-item scrolla-element-anim-1 scroll-animate"
             data-animate="active"
           >
             <div className="icon">
               <i aria-hidden="true" className="far fa-envelope" />
             </div>
             <div className="title">
               <span> Email </span>
             </div>
             <div className="lui-text">
               <span> {contactData.email} </span>
             </div>
           </div>
           <div
             className="numbers-item scrolla-element-anim-1 scroll-animate"
             data-animate="active"
           >
             <div className="icon">
               <i aria-hidden="true" className="far fa-address-book" />
             </div>
             <div className="title">
               <span> Phone </span>
             </div>
             <div className="lui-text">
               <span>{contactData.phone} </span>
             </div>
           </div>
         </div>
       </div>
       <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
         <div
           className="contacts-form scrolla-element-anim-1 scroll-animate"
           data-animate="active"
         >
           <div
             className="bg-img"
             style={{
               backgroundImage: "url(assets/images/pat-1.png)",
             }}
           />
           <div className="contacts-form">
             <form onSubmit={handleSubmit}>
               <div className="row">
                 <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                   <div className="group">
                     <label>
                       Your Full Name <b>*</b>
                       <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                     </label>
                   </div>
                 </div>
                 <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                   <div className="group">
                     <label>
                       Your Email Address <b>*</b>
                       <input type="email" name="email"value={formData.email} onChange={handleChange} required />
                     </label>
                   </div>
                 </div>
                 <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                   <div className="group">
                     <label>
                       Your Subject <b>*</b>
                       <input type="text" name="subject"  value={formData.subject} onChange={handleChange} required />
                     </label>
                   </div>
                 </div>
                 <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                   <div className="group">
                     <label>
                       Your Message <b>*</b>
                       <textarea name="message" value={formData.message} onChange={handleChange} required/>
                     </label>
                   </div>
                 </div>
                 <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 align-right">
                   <div className="terms-label">
                     * Accept the terms and conditions.
                   </div>
                   
                   <button  className="btn" type="submit"><span>Envoyer le message</span></button>
                
                  
                   
                 </div>
               </div>
             </form>
             <div className="alert-success" style={{ display: "none" }}>
               <p>Thanks, your message is sent successfully.</p>
             </div>
           </div>
         </div>
       </div>
     </div>
       {/* Affichage du message de succès */}
       {status && (
        <div className="alert-success">
          <p>{status}</p>
        </div>
      )}
     <div className="lui-bgtitle">
       <span> Contact Me </span>
     </div>
   </div>
 </div>
</section>) }
export default Contact;