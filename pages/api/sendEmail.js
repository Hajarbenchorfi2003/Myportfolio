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

/* export async function POST(req) {
  const { name, email,subject, message } = await req.json();

  // Configure the transporter with Gmail SMTP settings
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // your Gmail address
    to: process.env.EMAIL_USER,   // where you want to receive emails
    subject:`${subject}`,
    text: message,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    });
  }
}
 */