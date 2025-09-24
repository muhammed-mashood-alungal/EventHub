import {transporter} from "../configs";

const sendEmail = async (to: string | string[], subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: '', 
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error sending email');
  }
};


export const sendEventRegistrationEmail = async (
  email: string,
  eventName: string,
  qrCode: string,       
  uniqueCode: string
) => {
  const html = `
    <h1>Registration Successful ✅</h1>
    <p>Hi, you have successfully registered for <b>${eventName}</b>.</p>
    <p>Please find your ticket below:</p>
    <p><img src="${qrCode}" alt="QR Code" style="width:200px;height:200px;" /></p>
    <p>If you are unable to scan the QR code, use this unique code at the event:</p>
    <h2>${uniqueCode}</h2>
    <p>Keep this information safe and do not share it with anyone.</p>
    <p>--- Event Management Team</p>
  `;
  
  await sendEmail(email, `Your Ticket for ${eventName}`, html);
};
