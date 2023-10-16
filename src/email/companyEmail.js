import nodemailer from "nodemailer";

export const sendCompanyVerify = async ({ email, fName }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    secure: false,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const send = await transporter.sendMail({
    from: `onejobadmin <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Account Verification",
    html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            h1 {
              color: #FF5733;
            }
            p {
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <p>Hi, ${fName}</p>
          <p>Thank you for signing-up to One Job. it's time to find the best candidates. Please, verify your account below</p>
            <h3>Click button below</h3>
           <button>Verify</button>
          </body>
        </html>
        `,
  });

  if (send.messageId) {
    return "success";
  }
};
