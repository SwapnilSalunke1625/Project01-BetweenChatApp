import nodemailer from "nodemailer"

const sendMail = async (to) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"BetweenChat Application" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to BetweenChat 🎉",
    html: `
      <h2>Welcome to BetweenChat</h2>
      <p>Your account has been created successfully.</p>
      <p>Enjoy chatting 🚀</p>
    `,
  };

  await transport.sendMail(mailOptions);
};

export default sendMail;

