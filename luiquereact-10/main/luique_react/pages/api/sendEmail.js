import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    // Configurer Nodemailer pour Gmail ou un autre service SMTP
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Votre email
        pass: process.env.EMAIL_PASS, // Mot de passe d'application
      },
    });

    // Définir les options de l'e-mail
    const mailOptions = {
      from: email, // Expéditeur (adresse email du visiteur)
      to: process.env.EMAIL_USER, // Votre email
      subject: subject,
      text: `Message de: ${name}\nEmail: ${email}\n\n${message}`,
    };

    try {
      // Envoi de l'email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Email envoyé avec succès" });
    } catch (error) {
      console.error("Erreur d'envoi d'email:", error);
      res.status(500).json({ success: false, message: "Erreur lors de l'envoi de l'email" });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
