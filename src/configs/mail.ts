const nodemailer = require("nodemailer");
const { unlink } = require("fs-extra");

export const mailerPdf = async (titulo: string, mensaje: string, email: string, pdf: string) => {
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
        user: "postmaster@sandbox6d604a64391f4288a930d141d4c56738.mailgun.org",
        pass: "f5f779b721b45b0adb0d19ed647a9b20-1553bd45-0bf155b0",
      },

      debug: true,
    });
    await transporter.sendMail({
      from: "banco@ripley.cl",
      to: email,
      subject: "Banco Ripley",
      html: contentHTML,
      attachments: [
        {
          filename: "notificacion.pdf",
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
