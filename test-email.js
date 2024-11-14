import nodemailer from 'nodemailer';
(async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "benchorfihajar@gmail.com",
      pass: "abcd@669103", // Replace with your actual app password
    },
  });

  const mailOptions = {
    from: "benchorfihajar@gmail.com",
    to: "benchorfihajar@gmail.com",
    subject: "Test Email",
    text: "This is a test email from Nodemailer.",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info);
  } catch (error) {
    console.error("Error sending test email:", error);
  }
})();