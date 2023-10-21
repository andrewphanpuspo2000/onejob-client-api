import nodemailer from "nodemailer";

export const sendCompanyVerify = async ({ email, name, link }) => {
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
            img{
              width:100%;
          
            }
            .header-logo{
              width:150px;
             
            }
            .click-button{
              width:100%,
              display:flex,
              justify-content:center,
            }
          
           .link-button button{
            padding:1rem;
            border-radius:1rem;
            background-color:blue;
            color:white;
           }
          </style>
        </head>
        <body>
        <div >
            <div class="header-logo">
            <img src="https://onejob-file.s3.ap-southeast-2.amazonaws.com/logo/One.png"/>
            </div>
            <p>Hi, ${name}</p>
            <p>Thank you for signing-up to One Job. it's time to find the best candidates. Please, verify your account below</p>
            <div class="click-button">  
              <h3>Click button below</h3>
              <a class="link-button" href="${link}"><button>Verify</button></a>
            </div>
          </div>
          <p>Kind regards,</p>
          <p>One Job team</p>
          </body>
        </html>
        `,
  });

  if (send.messageId) {
    return "success";
  }
};
