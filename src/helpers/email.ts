import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.dreamhost.com",
  port: 465,
  secure: true,
  auth: {
    user: "no-reply@bloodconnect.org",
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendMail = async (to: string, subject: string, message: string): Promise<boolean> => {
  try {
     const info = await transporter.sendMail({
      from: '"BloodConnect No-reply" <no-reply@bloodconnect.org>', // sender address
      to,
      subject,
      html: message,
    });
    console.log(info);
    return true
  } catch (e) {
    console.log(e);
    return false
  }
}