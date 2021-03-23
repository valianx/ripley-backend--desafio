const nodemailer = require("nodemailer");
const { unlink } = require("fs-extra");

export const mailerPdf = async (titulo: string, mensaje: string, mail: string, pdf: string) => {
  try {
    const contentHTML = `
      <h2>${titulo}</h2>
      <p>${mensaje}</p>
      `;
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.mailgun.org",
      secure: true,
      auth: {
        user: "clientes@mg.saicoma.cl",
        pass: "1cf61e03ff5bcc2ba6e3e29eba722584-cb3791c4-8f100453",
      },

      debug: true,
    });

    await transporter.sendMail({
      from: "clientes@grillo.cl",
      to: mail,
      subject: "Banco Ripley",
      html: contentHTML,
      attachments: [
        {
          filename: "cotizacion.pdf",
          path: pdf,
          contentType: "application/pdf",
        },
      ],
    });
    try {
      await unlink(pdf);
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};
