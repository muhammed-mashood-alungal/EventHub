import { transporter } from "../configs";

const sendEmail = async (
  to: string | string[],
  subject: string,
  html: string
) => {
  try {
    await transporter.sendMail({
      from: "",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error sending email");
  }
};

export const sendEventRegistrationEmail = async (
  email: string,
  eventName: string,
  qrCodelink: string,
  uniqueCode: string
) => {
  const html = `
    <h1>Registration Successful 🎉</h1>
    <p>Hi, you have successfully registered for <b>${eventName}</b>.</p>

    <p>You can view and download your ticket (with QR code) directly from your dashboard:</p>
    <p>
      <a href="${qrCodelink}" target="_blank" style="display:inline-block;padding:10px 20px;background:#4F46E5;color:white;text-decoration:none;border-radius:6px;font-weight:bold;">
        View My Ticket
      </a>
    </p>

    <p>If needed, you can also use this unique code at the event:</p>
    <h2 style="color:#111827;font-family:monospace;">${uniqueCode}</h2>

    <p>Keep this information safe and do not share it with anyone.</p>
    <p style="margin-top:20px;">— Event Management Team</p>
  `;

  await sendEmail(email, `Your Ticket for ${eventName}`, html);
};
